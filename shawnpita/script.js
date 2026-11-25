/*------------------------------------------------
  CINEMATIC SHAWNPITA INTRO
------------------------------------------------*/
window.addEventListener("load", () => {

    const tl = gsap.timeline({ defaults: { ease: "power3.out" }});
    const icon = document.querySelector(".intro-icon");
    const letters = document.querySelectorAll(".intro-title span");
    const overlay = document.getElementById("intro-overlay");
    const wipe = document.getElementById("wipe-effect");

    // Icon pop-in
    tl.to(icon, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "back.out(1.7)"
    })

    // Each letter appears in sequence
    .to(letters, {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.8
    }, "-=0.6")

    // Light breathing effect
    .to(icon, {
        scale: 1.08,
        duration: 0.8,
        yoyo: true,
        repeat: 0
    }, "-=0.5")

    // Fade letters slightly before wipe
    .to(letters, {
        opacity: 1,
        duration: 1
    }, "-=0.4")

    // Liquid white wipe expanding
    .to(wipe, {
        opacity: 0,
        scale: 25,
        duration: 1.4,
        ease: "power4.inOut"
    }, "-=0.2")

    // Fade out intro overlay
    .to(overlay, {
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    }, "-=1")

    // Remove from DOM
    .add(() => {
        overlay.remove();
        wipe.remove();
    });
});





/*-----------------------------------------
 SCROLL REVEAL
------------------------------------------*/
const fadeSections = document.querySelectorAll(".fade-section");

const revealOnScroll = () => {
    fadeSections.forEach(sec => {
        const position = sec.getBoundingClientRect().top;
        if (position < window.innerHeight * 0.8) {
            sec.classList.add("visible");
        }
    });
};

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();


/*-----------------------------------------
 PARALLAX HERO
------------------------------------------*/
const heroImg = document.querySelector(".hero-image");

window.addEventListener("mousemove", e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    heroImg.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
});

/*-----------------------------------------
 CUSTOM CURSOR
------------------------------------------*/


 (function() {
      "use strict";

      // ------------------------------------------------------------
      // 1. TYPEWRITER (fills main h1 + copies simultaneously)
      // ------------------------------------------------------------
      const typeElement = document.getElementById('typewriterTarget');
      const copy1 = document.getElementById('copy1');
      const copy2 = document.getElementById('copy2');
      const copy3 = document.getElementById('copy3');
      const copy4 = document.getElementById('copy4');

      const text = "SHAWNPITA";
      let i = 0;
      const typeSpeed = 60;

      function typeWriter() {
        if (i < text.length) {
          const char = text.charAt(i);
          // update main h1
          typeElement.innerHTML += char;
          // update all copy spans simultaneously
          copy1.innerHTML += char;
          copy2.innerHTML += char;
          copy3.innerHTML += char;
          copy4.innerHTML += char;
          i++;
          setTimeout(typeWriter, typeSpeed);
        } else {
          // once typewriter finishes, apply initial transforms (so layers are set)
          applyInitialTransforms();
        }
      }

      // start typewriter
      typeWriter();

      // ------------------------------------------------------------
      // 2. WAVE / MOUSE TRACKING (slower, smoother version)
      // ------------------------------------------------------------
      function newV2(x, y) {
        return { x: x || 0, y: y || 0 };
      }

      const mouse = newV2();
      const center = newV2();
      const distanceFromCenter = newV2();
      const distanceLerped = newV2();
      let simulateMouseMovement = true;

      // REDUCED VALUES for slower, more subtle movement
      const perspective = 500;
      const translateZ = -12;
      const rotate = 0.8;      // was 3
      const skew = 0.8;        // was 3

      const container = document.getElementById('waveContainer');
      const copies = document.getElementsByClassName('copy');

      function updateCenter() {
        const rect = container.getBoundingClientRect();
        center.x = rect.left + rect.width / 2;
        center.y = rect.top + rect.height / 2;
      }

      function trackMousePosition(event) {
        simulateMouseMovement = false;
        mouse.x = event.clientX;
        mouse.y = event.clientY;
        distanceFromCenter.x = center.x - mouse.x;
        distanceFromCenter.y = center.y - mouse.y;
      }

      function fakeMousePosition(t) {
        // SLOWER auto-animation (larger divisor = slower)
        distanceFromCenter.x = Math.sin(t / 800) * window.innerWidth * 0.35;
        distanceFromCenter.y = Math.cos(t / 800) * window.innerWidth * 0.15;
      }

      function lerpV2(position, targetPosition) {
        // LOWER lerp factor = slower follow
        position.x += (targetPosition.x - position.x) * 0.06;  // was 0.2
        position.y += (targetPosition.y - position.y) * 0.06;  // was 0.2
      }

      function makeTransformString(y, z, rotateVal, skewVal) {
        return `perspective(${perspective}px) translate3d(0px, ${y}px, ${z}px) rotate(${rotateVal}deg) skew(${skewVal}deg)`;
      }

      function applyInitialTransforms() {
        for (let idx = 1; idx <= copies.length; idx++) {
          const copy = copies[idx - 1];
          const y = idx * distanceLerped.y * 0.03;
          const z = idx * translateZ;
          const rot = idx * rotate * (distanceLerped.x * 0.003);
          const sk = idx * skew * (distanceLerped.x * 0.003);
          copy.style.transform = makeTransformString(y, z, rot, sk);
        }
      }

      function updateTextPosition(t) {
        if (simulateMouseMovement) fakeMousePosition(t);

        lerpV2(distanceLerped, distanceFromCenter);

        for (let idx = 1; idx <= copies.length; idx++) {
          const copy = copies[idx - 1];
          const y = idx * distanceLerped.y * 0.03;
          const z = idx * translateZ;
          const rot = idx * rotate * (distanceLerped.x * 0.003);
          const sk = idx * skew * (distanceLerped.x * 0.003);
          copy.style.transform = makeTransformString(y, z, rot, sk);
        }

        requestAnimationFrame(updateTextPosition);
      }

      // init center
      updateCenter();

      // event listeners
      document.addEventListener('mousemove', trackMousePosition);
      window.addEventListener('resize', updateCenter);

      // start animation loop
      requestAnimationFrame(updateTextPosition);

      // fallback: apply transforms after typewriter finishes
      setTimeout(function() {
        applyInitialTransforms();
      }, text.length * typeSpeed + 100);

      // make sure containers don't clip transforms
      document.querySelector('.wave-container').style.overflow = 'visible';
      document.querySelector('.wave-header').style.overflow = 'visible';

      console.log('SHAWNPITA wave effect ready (slower version)');
    })();

    






/* =========================================
   AMBIENT MUSIC EXPERIENCE
========================================= */

const ambientMusic = document.getElementById("ambientMusic");
const ambientToggle = document.getElementById("ambientToggle");
const ambientAudio = document.getElementById("ambientAudio");
const ambientStatus = document.getElementById("ambientStatus");
const ambientIcon = document.getElementById("ambientIcon");

let isPlaying = false;
let fadeTimer;
let userHasInteracted = false;


/* =========================================
   INITIAL SETTINGS
========================================= */

ambientAudio.volume = 0;


/* =========================================
   FADE IN
========================================= */

function fadeInMusic() {

    clearInterval(fadeTimer);

    ambientAudio.volume = 0;

    fadeTimer = setInterval(() => {

        if (ambientAudio.volume < 0.18) {

            ambientAudio.volume += 0.008;

        } else {

            ambientAudio.volume = 0.18;
            clearInterval(fadeTimer);

        }

    }, 80);
}


/* =========================================
   FADE OUT
========================================= */

function fadeOutMusic() {

    clearInterval(fadeTimer);

    fadeTimer = setInterval(() => {

        if (ambientAudio.volume > 0.01) {

            ambientAudio.volume -= 0.01;

        } else {

            ambientAudio.volume = 0;
            ambientAudio.pause();

            clearInterval(fadeTimer);

        }

    }, 60);
}


/* =========================================
   START MUSIC
========================================= */

async function startAmbientMusic() {

    try {

        await ambientAudio.play();

        isPlaying = true;

        ambientMusic.classList.add("playing");

        ambientStatus.textContent = "Sound On";

        ambientToggle.setAttribute(
            "aria-pressed",
            "true"
        );

        ambientToggle.setAttribute(
            "aria-label",
            "Turn background music off"
        );

        fadeInMusic();

        return true;

    } catch (error) {

        console.log(
            "Autoplay blocked. Waiting for user interaction."
        );

        return false;

    }
}


/* =========================================
   STOP MUSIC
========================================= */

function stopAmbientMusic() {

    isPlaying = false;

    ambientMusic.classList.remove("playing");

    ambientStatus.textContent = "Sound Off";

    ambientToggle.setAttribute(
        "aria-pressed",
        "false"
    );

    ambientToggle.setAttribute(
        "aria-label",
        "Turn background music on"
    );

    fadeOutMusic();
}


/* =========================================
   BUTTON TOGGLE
========================================= */

ambientToggle.addEventListener("click", async () => {

    userHasInteracted = true;

    if (!isPlaying) {

        await startAmbientMusic();

    } else {

        stopAmbientMusic();

    }

});


/* =========================================
   TRY AUTOPLAY IMMEDIATELY
========================================= */

window.addEventListener("load", async () => {

    /*
       Give the browser a moment to load
       the audio resource.
    */

    setTimeout(async () => {

        await startAmbientMusic();

    }, 100);

});


/* =========================================
   FALLBACK FOR BROWSER AUTOPLAY BLOCK
========================================= */

const firstInteractionEvents = [
    "pointerdown",
    "touchstart",
    "keydown",
    "wheel"
];

async function firstInteraction() {

    if (userHasInteracted || isPlaying) {
        return;
    }

    userHasInteracted = true;

    await startAmbientMusic();

    firstInteractionEvents.forEach(event => {

        window.removeEventListener(
            event,
            firstInteraction,
            { passive: true }
        );

    });

}


/* =========================================
   LISTEN FOR FIRST USER INTERACTION
========================================= */

firstInteractionEvents.forEach(event => {

    window.addEventListener(
        event,
        firstInteraction,
        { passive: true }
    );

});


/* =========================================
   SCROLL TRANSPARENCY
========================================= */

let scrollTimer;

window.addEventListener(
    "scroll",
    () => {

        ambientMusic.classList.add("scrolling");

        clearTimeout(scrollTimer);

        scrollTimer = setTimeout(() => {

            ambientMusic.classList.remove("scrolling");

        }, 300);

    },
    { passive: true }
);







/* ===================================================
   PERFECT VIEWPORT TRIGGER
=================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".reveal-section");

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target); // animate once only
      }
    });
  }, {
    threshold: 0.22,
    rootMargin: "0px 0px -60px 0px"
  });

  sections.forEach(section => observer.observe(section));
});

   (function() {
      const items = document.querySelectorAll(".reveal");
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            setTimeout(() => {
              let obj = entry.target.querySelector(".book-float, .phone-float");
              if (obj) {
                obj.classList.add("start");
              }
            }, 1400);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });

      items.forEach(i => observer.observe(i));
    })();


     /* ── Carousel Navigation ── */

        let activeIndexMDDR = 0;
        const slidesMDDR = document.getElementsByTagName("article");

        const handleLeftClickMDDR = () => {
            const nextIndex = activeIndexMDDR - 1 >= 0 ? activeIndexMDDR - 1 : slidesMDDR.length - 1;
            const currentSlide = document.querySelector(`[data-index="${activeIndexMDDR}"]`);
            const nextSlide = document.querySelector(`[data-index="${nextIndex}"]`);

            currentSlide.dataset.status = "after";
            nextSlide.dataset.status = "becoming-active-from-before";

            setTimeout(() => {
                nextSlide.dataset.status = "active";
                activeIndexMDDR = nextIndex;
            }, 50);
        };

        const handleRightClickMDDR = () => {
            const nextIndex = activeIndexMDDR + 1 <= slidesMDDR.length - 1 ? activeIndexMDDR + 1 : 0;
            const currentSlide = document.querySelector(`[data-index="${activeIndexMDDR}"]`);
            const nextSlide = document.querySelector(`[data-index="${nextIndex}"]`);

            currentSlide.dataset.status = "before";
            nextSlide.dataset.status = "becoming-active-from-after";

            setTimeout(() => {
                nextSlide.dataset.status = "active";
                activeIndexMDDR = nextIndex;
            }, 50);
        };

        /* ── Mobile Nav Toggle ── */

        const navMDDR = document.querySelector("nav");

        const handleNavToggleMDDR = () => {
            navMDDR.dataset.transitionable = "true";
            navMDDR.dataset.toggled = navMDDR.dataset.toggled === "true" ? "false" : "true";
        };

        window.matchMedia("(max-width: 800px)").onchange = (e) => {
            navMDDR.dataset.transitionable = "false";
            navMDDR.dataset.toggled = "false";
        };

        /* ── Intersection Observer: smooth entrance ── */

        const wrapperMDDR = document.getElementById("carouselWrapper-MDDR");

        const observerMDDR = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        wrapperMDDR.classList.add("visible-MDDR");
                        observerMDDR.unobserve(wrapperMDDR);
                    }
                });
            }, {
                threshold: 0.15,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        if (wrapperMDDR.getBoundingClientRect().top < window.innerHeight * 0.85) {
            wrapperMDDR.classList.add("visible-MDDR");
        } else {
            observerMDDR.observe(wrapperMDDR);
        }

        let resizeTimerMDDR;
        window.addEventListener("resize", () => {
            clearTimeout(resizeTimerMDDR);
            resizeTimerMDDR = setTimeout(() => {
                if (!wrapperMDDR.classList.contains("visible-MDDR")) {
                    const rect = wrapperMDDR.getBoundingClientRect();
                    if (rect.top < window.innerHeight * 0.85) {
                        wrapperMDDR.classList.add("visible-MDDR");
                        observerMDDR.unobserve(wrapperMDDR);
                    }
                }
            }, 200);
        });

        /* ── Keyboard navigation ── */
        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowLeft") handleLeftClickMDDR();
            if (e.key === "ArrowRight") handleRightClickMDDR();
        });
