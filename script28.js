

      const nav = document.getElementById("nav");
      const menuTrigger = document.getElementById("menuTrigger");
      const cancelBtn = document.getElementById("cancelBtn");

      // Open navigation
      menuTrigger.addEventListener("click", () => {
        nav.classList.add("active");
        menuTrigger.classList.add("hidden");
        document.body.style.overflow = "hidden"; // Prevent scrolling
      });

      // Close navigation
      function closeNav() {
        nav.classList.remove("active");
        menuTrigger.classList.remove("hidden");
        document.body.style.overflow = "auto"; // Restore scrolling
      }

      cancelBtn.addEventListener("click", closeNav);

      // Close on Escape key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && nav.classList.contains("active")) {
          closeNav();
        }
      });

      // Add click functionality to menu items
      const menuItems = document.querySelectorAll("#nav .menu-item");
      menuItems.forEach((item, index) => {
        item.addEventListener("click", () => {
          console.log(`Clicked on: ${item.textContent}`);
          // Add your navigation logic here
          closeNav();
        });
      });

      // Add keyboard navigation support
      document.addEventListener("keydown", (e) => {
        if (nav.classList.contains("active")) {
          const menuItems = document.querySelectorAll("#nav .menu-item");
          const currentFocus = document.activeElement;
          const currentIndex = Array.from(menuItems).indexOf(currentFocus);

          if (e.key === "ArrowDown") {
            e.preventDefault();
            const nextIndex =
              currentIndex < menuItems.length - 1 ? currentIndex + 1 : 0;
            menuItems[nextIndex].focus();
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            const prevIndex =
              currentIndex > 0 ? currentIndex - 1 : menuItems.length - 1;
            menuItems[prevIndex].focus();
          } else if (e.key === "Enter" && currentIndex !== -1) {
            e.preventDefault();
            menuItems[currentIndex].click();
          }
        }
      });

      // Make menu items focusable for keyboard navigation
      menuItems.forEach((item) => {
        item.setAttribute("tabindex", "0");
      });


      const lines = [
        "Welcome to My Website!",
        "Hope you are good...",
        "Let's explore together.",
      ];

      const typingElement = document.getElementById("typing");

      let currentLine = 0;
      let currentChar = 0;
      let isDeleting = false;

      function typeEffect() {
        const fullText = lines[currentLine];

        if (!isDeleting) {
          typingElement.innerHTML = fullText.substring(0, currentChar + 1);
          currentChar++;

          if (currentChar === fullText.length) {
            // Pause at the end of typing before deleting
            setTimeout(() => {
              isDeleting = true;
              typeEffect();
            }, 1500);
            return;
          }
        } else {
          typingElement.innerHTML = fullText.substring(0, currentChar - 1);
          currentChar--;

          if (currentChar === 0) {
            // Move to next line
            isDeleting = false;
            currentLine = (currentLine + 1) % lines.length;
            setTimeout(typeEffect, 500); // Delay before typing next line
            return;
          }
        }

        setTimeout(typeEffect, isDeleting ? 50 : 100); // Typing speed
      }

      typeEffect();

      // const images = [
      //   "media/i.jpg",
      //   "media/images.jpg",
      //   "media/mushroom-fungi-nature-wood-preview.jpg",
      // ];
      // let imgIndex = 0;
      // const slider = document.getElementById("sliderImage");

      // setInterval(() => {
      //   imgIndex = (imgIndex + 1) % images.length;
      //   slider.style.opacity = 0;
      //   setTimeout(() => {
      //     slider.src = images[imgIndex];
      //     slider.style.opacity = 1;
      //   }, 500);
      // }, 3000);

      gsap.registerPlugin(ScrollTrigger);

      gsap.to(".about-3d-box", {
        scrollTrigger: {
          trigger: ".about-3d-box",
          start: "top 80%",
          end: "bottom 60%",
          scrub: true,
        },
        rotateY: 0,
        rotateX: 0,
        ease: "power1.out",
      });


      gsap.registerPlugin(ScrollTrigger);

      const totalPanels = document.querySelectorAll(".panel").length;

      gsap.to(".horizontal-scroll", {
        xPercent: -(totalPanels - 1) * 100,
        ease: "none",
        scrollTrigger: {
          trigger: ".horizontal-wrapper",
          start: "top top",
          end: () => "+=" + window.innerHeight * (totalPanels - 1),
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });


        class SimpleAutoSlider {
            constructor() {
                this.slides = document.querySelectorAll('input[name="slide"]');
                this.currentSlide = 0;
                this.duration = 4000; // 4 seconds per slide
                this.autoInterval = null;
                this.progressInterval = null;
                this.progressBar = document.getElementById('progressBar');
                
                this.init();
            }
            
            init() {
                // Set initial checked slide
                this.updateCurrentSlide();
                
                // Start auto-play immediately
                this.startAutoPlay();
                
                // Manual slide change detection
                this.slides.forEach((slide, index) => {
                    slide.addEventListener('change', () => {
                        if (slide.checked) {
                            this.currentSlide = index;
                            this.resetProgress();
                        }
                    });
                });
                
                // Pause on hover, resume on leave
                const container = document.querySelector('.slider-container');
                container.addEventListener('mouseenter', () => this.pauseAutoPlay());
                container.addEventListener('mouseleave', () => this.resumeAutoPlay());
            }
            
            updateCurrentSlide() {
                this.slides.forEach((slide, index) => {
                    if (slide.checked) {
                        this.currentSlide = index;
                    }
                });
            }
            
            startAutoPlay() {
                this.autoInterval = setInterval(() => {
                    this.nextSlide();
                }, this.duration);
                
                this.startProgress();
            }
            
            pauseAutoPlay() {
                if (this.autoInterval) {
                    clearInterval(this.autoInterval);
                    this.autoInterval = null;
                }
                this.stopProgress();
            }
            
            resumeAutoPlay() {
                if (!this.autoInterval) {
                    this.startAutoPlay();
                }
            }
            
            nextSlide() {
                this.currentSlide = (this.currentSlide + 1) % this.slides.length;
                this.slides[this.currentSlide].checked = true;
                this.resetProgress();
            }
            
            startProgress() {
                this.resetProgress();
                let progress = 0;
                const increment = 100 / (this.duration / 50); // Update every 50ms
                
                this.progressInterval = setInterval(() => {
                    progress += increment;
                    if (progress >= 100) {
                        progress = 100;
                        clearInterval(this.progressInterval);
                    }
                    this.updateProgressBar(progress);
                }, 50);
            }
            
            stopProgress() {
                if (this.progressInterval) {
                    clearInterval(this.progressInterval);
                    this.progressInterval = null;
                }
            }
            
            resetProgress() {
                this.stopProgress();
                this.updateProgressBar(0);
                if (this.autoInterval) {
                    setTimeout(() => this.startProgress(), 100);
                }
            }
            
            updateProgressBar(progress) {
                this.progressBar.style.width = progress + '%';
            }
        }
        
        // Initialize the auto slider when the page loads
        document.addEventListener('DOMContentLoaded', () => {
            new SimpleAutoSlider();
        });