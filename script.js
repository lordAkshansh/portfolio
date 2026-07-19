// Custom Cursor
const cursor = document.querySelector("#cursor");
const cursorBlur = document.querySelector("#cursor-blur");

document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
    
    // Slight delay for the blur effect
    setTimeout(() => {
        cursorBlur.style.left = e.clientX + "px";
        cursorBlur.style.top = e.clientY + "px";
    }, 50);
});

// Cursor Hover Effects
const interactiveElements = document.querySelectorAll("a, button, .skill-tag, .metric-card, input, textarea");

interactiveElements.forEach(el => {
    el.addEventListener("mouseenter", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(2)";
        cursor.style.backgroundColor = "transparent";
        cursor.style.border = "1px solid var(--accent-color)";
    });
    
    el.addEventListener("mouseleave", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(1)";
        cursor.style.backgroundColor = "var(--accent-color)";
        cursor.style.border = "none";
    });
});

// Counter Animation for Metrics
const counters = document.querySelectorAll('.counter');
const speed = 200; // The lower the slower

const animateCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target;
            }
        };

        // Trigger animation when in viewport
        const rect = counter.getBoundingClientRect();
        if(rect.top < window.innerHeight && rect.bottom >= 0) {
            updateCount();
        }
    });
}

// Scroll Event Listeners
window.addEventListener('scroll', () => {
    animateCounters();
    
    // Parallax effect on scroll for blur
    const scrolled = window.scrollY;
    cursorBlur.style.opacity = Math.max(0.1, 0.5 - scrolled / 2000);
});

// Initial trigger
setTimeout(animateCounters, 500);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
