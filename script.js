
// Offset scroll position
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        window.scrollTo({
            top: targetElement.offsetTop - document.querySelector('header').offsetHeight+60,
            behavior: 'smooth'
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const menu = document.querySelector(".menu");
    const menuToggle = document.querySelector(".menu-toggle");

    // Toggle menu when clicking the button
    menuToggle.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevent the click from bubbling up
        menu.classList.toggle("show");
    });

    // Close menu when clicking anywhere outside of it
    document.addEventListener("click", function (event) {
        if (!menu.contains(event.target) && event.target !== menuToggle) {
            menu.classList.remove("show");
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const infoButton = document.querySelector(".resume-bar-button");
    const toggleMenu = document.querySelector(".resume-bar-toggle");

    infoButton.addEventListener("click", function (event) {
        toggleMenu.classList.toggle("show");
    });

    // Close menu when clicking anywhere outside of it
    document.addEventListener("click", function (event) {
        if (!toggleMenu.contains(event.target) && event.target !== infoButton) {
            toggleMenu.classList.remove("show");
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Restore scroll position
    const savedScroll = sessionStorage.getItem('scrollPosition');
    if (savedScroll) {
      window.scrollTo(0, parseInt(savedScroll));
      sessionStorage.removeItem('scrollPosition');
    }
  
    // Handle scroll-preserving navigation
    document.querySelectorAll('.preserve-scroll-link').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        sessionStorage.setItem('scrollPosition', window.scrollY.toString());
        window.location.href = this.dataset.href;
      });
    });
  });

var canvas = document.querySelector('canvas');
var homeSection = document.getElementById('home');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

function resizeCanvas() {

    canvas.width = homeSection.clientWidth;
    canvas.height = homeSection.clientHeight;

    init();
};

resizeCanvas(); // Call it initially
window.addEventListener('resize',resizeCanvas());

var nPoints = 40;
var d = canvas.width/(nPoints-1);

var temp1 = 0;
var temp2 = 0;

function Peaks(ground,y,dy,dv,color) {

    this.ground = ground;
    this.y = y;
    this.dy = dy;
    this.dv = dv;
    this.yFixed = [];
    this.xPoints = [];
    this.yPoints = [];
    this.condition = Array(nPoints).fill(0);
    this.color = color;
    this.allTrue = 0;

    temp1 = 0;
    temp2 = 0;
    for (var i=0; i<nPoints; i++) {
        temp1 = temp1 + 2*Math.round(Math.random())-1;
        temp2 = temp2 + 2*Math.round(Math.random())-1;
        this.yFixed.push(this.ground - this.dy*temp1 - this.y);
        this.xPoints.push(i*d);
        this.yPoints.push(this.ground - this.dy*temp2 - this.y);
        // this.yPoints.push(this.ground-2*(Math.random()-0.5)*this.dy - this.y);
    }

    this.draw = function() {
        c.beginPath();
        c.moveTo(0,this.ground);
        for (var i=0; i<nPoints; i++) {
            c.lineTo(this.xPoints[i],this.yPoints[i]);
        }
        c.lineTo(this.xPoints[this.xPoints.length-1],this.ground);
        c.closePath();
        c.fillStyle = color;
        c.fill();
    }

    this.update = function() {
        for (var i=0; i<nPoints; i++) {

            if (this.allTrue == nPoints) {
                temp1 = 0;
                this.yFixed = [];
                for (var i=0; i<nPoints; i++) {
                    temp1 = temp1 + 2*Math.round(Math.random())-1;
                    this.yFixed.push(this.ground - this.dy*temp1 - this.y);
                }
                this.allTrue = 0;
                this.condition.fill(0);
            }

            if (Math.abs(this.yPoints[i]-this.yFixed[i])<Math.abs(2*dv) ) {
                if (this.condition[i] == 0) {
                    this.condition[i] = 1;
                    this.allTrue += 1;
                }
                
            } else {
                if (this.yFixed[i] - this.yPoints[i] > 0) {
                    this.yPoints[i] += dv;
                } else {
                    this.yPoints[i] -= dv;
                }
            }
        }

        this.draw();
    }

}


var peak1;
var peak2;
var peak3;
var peak4;

var dy = 10;
var mm = 9;
var topGround = 800;
var dv = 0.14;

function init() {

    d = canvas.width/(nPoints-1);
    peak4 = new Peaks(1000,topGround,dy,dv,'#F8F8F8');
    peak3 = new Peaks(1000,topGround-mm*dy,dy,dv,'#F0F0F0');
    peak2 = new Peaks(1000,topGround-2*mm*dy,dy,dv,'#E2E2E2');
    peak1 = new Peaks(1000,topGround-3*mm*dy,dy,dv,'#D5D5D5');

}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    peak4.update();
    peak3.update();
    peak2.update();
    peak1.update();
}

init();
animate();

//  DETAILS TOGGLE MENU
document.addEventListener("DOMContentLoaded", function () {
    const projects = document.querySelectorAll(".project");
    const detailsSection = document.getElementById("project-details");
    const portfolioSection = document.getElementById("portfolio");

    projects.forEach(project => {
        project.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default link behavior

            const templateId = this.getAttribute("data-template");
            const template = document.getElementById(templateId);

            if (template) {
                detailsSection.innerHTML = template.innerHTML;
                detailsSection.style.display = "block";

                // CLOSE BUTTON
                const yOffset = -55; // Adjust this value (negative to stop higher, positive to go lower)
                const y = detailsSection.getBoundingClientRect().top + window.scrollY + yOffset;

                window.scrollTo({ top: y, behavior: "smooth" });

                // Add event listener to the close button inside the loaded content
                const closeButton = detailsSection.querySelector(".close-btn");
                if (closeButton) {
                    closeButton.addEventListener("click", function () {
                        detailsSection.classList.remove("fade-in");  // Remove fade-in effect
                        detailsSection.classList.add("fade-out");    // Start fade-out effect

                        // Wait for the animation to complete before hiding
                        setTimeout(() => {
                            detailsSection.style.display = "none";
                            detailsSection.classList.remove("fade-out"); // Reset for next time
                        }, 500); // This should match the animation duration

                        portfolioSection.scrollIntoView({ behavior: "smooth", block: "start" });
                    });
                }


                // Add event listener to the close button inside the loaded content
                const detailsButton = detailsSection.querySelector(".details-button");
                const detailsToggle = detailsSection.querySelector(".details-toggle");
                if (detailsButton) {
                    detailsButton.addEventListener("click", function () {

                        if (!detailsToggle.classList.contains("show")) {
                            // Rotate animation
                            let rotation = 0;
                            for (let i = 0; i < 11; i++) {
                                setTimeout(() => {
                                    // detailsButton.style.transform = "rotate("+ 90 - i*8.9 +"deg)";
                                    rotation = i*9;
                                    detailsButton.style.transform = "rotate("+ rotation +"deg)";
                                }, i * 10); // 1000ms (1 second) delay between iterations
                            }
                            detailsButton.style.transform = "rotate(90deg)";
                        } else {
                            // Rotate animation inverse
                            let rotation = 0;
                            for (let i = 0; i < 11; i++) {
                                setTimeout(() => {
                                    // detailsButton.style.transform = "rotate("+ 90 - i*8.9 +"deg)";
                                    rotation = 90-i*9;
                                    detailsButton.style.transform = "rotate("+ rotation +"deg)";
                                }, i * 10); // 1000ms (1 second) delay between iterations
                            }
                            detailsButton.style.transform = "rotate(0deg)";
                        }

                        detailsToggle.classList.toggle("show");
                    });
                }

                document.addEventListener("click", function (event) {
                    if (!detailsToggle.contains(event.target) && event.target !== detailsButton) {
                        
                        if (detailsToggle.classList.contains("show")) {
                            // Rotate animation inverse
                            let rotation = 0;
                            for (let i = 0; i < 11; i++) {
                                setTimeout(() => {
                                    // detailsButton.style.transform = "rotate("+ 90 - i*8.9 +"deg)";
                                    rotation = 90-i*9;
                                    detailsButton.style.transform = "rotate("+ rotation +"deg)";
                                }, i * 10); // 1000ms (1 second) delay between iterations
                            }
                            detailsButton.style.transform = "rotate(0deg)";
                        }
                        

                        detailsToggle.classList.remove("show");
                    }
                });

                window.addEventListener('scroll', function () {
                    const scrollThreshold = detailsSection.getBoundingClientRect().top + window.scrollY - 10;

                    if (detailsToggle.classList.contains("show")) {
                        // Rotate animation inverse
                        let rotation = 0;
                        for (let i = 0; i < 11; i++) {
                            setTimeout(() => {
                                // detailsButton.style.transform = "rotate("+ 90 - i*8.9 +"deg)";
                                rotation = 90-i*9;
                                detailsButton.style.transform = "rotate("+ rotation +"deg)";
                            }, i * 10); // 1000ms (1 second) delay between iterations
                        }
                        detailsButton.style.transform = "rotate(0deg)";
                    }

                    detailsToggle.classList.remove('show'); // Close menu on scroll

                    if (window.scrollY > scrollThreshold) {
                        detailsButton.classList.add('scrolled');
                    } else {
                        detailsButton.classList.remove('scrolled');
                    }
                });
            }
        });
    });
});