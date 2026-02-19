document.addEventListener('DOMContentLoaded', () => {

    // --- Toast Notification Logic ---
    const iosButton = document.getElementById('iosButton');
    const toast = document.getElementById('toast');
    let toastTimeout;

    if (iosButton) {
        iosButton.addEventListener('click', (e) => {
            e.preventDefault();
            toast.classList.remove('hidden');

            if (toastTimeout) clearTimeout(toastTimeout);

            toastTimeout = setTimeout(() => {
                toast.classList.add('hidden');
            }, 3000);
        });
    }

    // --- Scroll Animations (Intersection Observer) ---
    const animatedElements = document.querySelectorAll('.fade-in-up');

    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Offset slightly so it triggers before bottom
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // --- Staggered Animation for Grid Items ---
    // Specifically target feature cards to stagger their entry
    const featureCards = document.querySelectorAll('.feature-card');
    const featuresSection = document.querySelector('.features-section');

    if (featuresSection) {
        const gridObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                featureCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '0';
                        card.style.animation = `fadeInUpCard 0.6s ease forwards ${index * 0.1}s`;
                    }, 100);
                });
                gridObserver.unobserve(featuresSection);
            }
        }, { threshold: 0.1 });

        gridObserver.observe(featuresSection);
    }
});

// Add dynamic keyframes for cards if not in CSS
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes fadeInUpCard {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
.feature-card {
    opacity: 0; /* Hidden initially for JS animation */
}
`;
document.head.appendChild(styleSheet);
