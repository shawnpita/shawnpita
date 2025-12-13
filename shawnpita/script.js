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
 MAGNETIC BUTTONS
------------------------------------------*/
document.querySelectorAll(".magnetic-btn").forEach(btn => {
    btn.addEventListener("mousemove", e => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate(0,0)";
    });
});

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
const dot = document.querySelector(".cursor-dot");
const ring = document.querySelector(".cursor-ring");

window.addEventListener("mousemove", e => {
    dot.style.left = ring.style.left = e.clientX + "px";
    dot.style.top = ring.style.top = e.clientY + "px";
});

/*-----------------------------------------
 TYPEWRITER + SCRAMBLE HYBRID
------------------------------------------*/
const typeElement = document.querySelector(".typewriter-text");
const text = "We Build Digital Dreams.";

let i = 0;
const typeSpeed = 60;

function typeWriter() {
    if (i < text.length) {
        typeElement.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, typeSpeed);
    }
}
typeWriter();

/*-----------------------------------------
 3D HOVER TILT (GALLERY)
------------------------------------------*/
document.querySelectorAll(".tilt").forEach(item => {
    item.addEventListener("mousemove", e => {
        const rect = item.getBoundingClientRect();
        let x = (e.clientX - rect.left) / rect.width - 0.5;
        let y = (e.clientY - rect.top) / rect.height - 0.5;
        item.style.transform = `perspective(600px) rotateX(${y * 12}deg) rotateY(${x * 12}deg)`;
    });

    item.addEventListener("mouseleave", () => {
        item.style.transform = "rotateX(0) rotateY(0)";
    });
});


let next = document.querySelector('.TSI-next');
let prev = document.querySelector('.TSI-prev');

next.addEventListener('click', function() {
    let items = document.querySelectorAll('.TSI-item');
    document.querySelector('.TSI-slide').appendChild(items[0]);
})

prev.addEventListener('click', function() {
    let items = document.querySelectorAll('.TSI-item');
    document.querySelector('.TSI-slide').prepend(items[items.length - 1]);
})




