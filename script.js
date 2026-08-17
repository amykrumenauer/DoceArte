/* ==================================================
   EFEITO DE DIGITAÇÃO — JULIA BERTA
================================================== */

const typingElement = document.getElementById('typing');

if (typingElement) {

    const text = 'Julia Berta';

    let index = 0;

    function typeWriter() {

        if (index < text.length) {

            typingElement.textContent += text.charAt(index);

            index++;

            setTimeout(typeWriter, 120);

        }

    }

    typeWriter();
}


/* ==================================================
   MENU MOBILE
================================================== */

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {

    menuToggle.addEventListener('click', () => {

        const isOpen = navLinks.classList.toggle('active');

        menuToggle.setAttribute(
            'aria-expanded',
            isOpen
        );

        document.body.classList.toggle(
            'menu-open',
            isOpen
        );

    });


    navLinks.querySelectorAll('a').forEach(link => {

        link.addEventListener('click', () => {

            navLinks.classList.remove('active');

            menuToggle.setAttribute(
                'aria-expanded',
                'false'
            );

            document.body.classList.remove(
                'menu-open'
            );

        });

    });

}


/* ==================================================
   CARROSSEL
================================================== */

const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');

const prevButton = document.querySelector('.carousel-btn.prev');
const nextButton = document.querySelector('.carousel-btn.next');

const currentSlide = document.getElementById('current-slide');


if (
    track &&
    items.length &&
    prevButton &&
    nextButton
) {

    let currentIndex = 0;


    function getVisibleItems() {

        if (window.innerWidth <= 768) {
            return 1;
        }

        if (window.innerWidth <= 1000) {
            return 2;
        }

        return 3;

    }


    function updateCarousel() {

        const visibleItems = getVisibleItems();

        const gap = 20;

        const itemWidth =
            items[0].getBoundingClientRect().width + gap;

        track.style.transform =
            `translateX(-${currentIndex * itemWidth}px)`;


        if (currentSlide) {

            currentSlide.textContent =
                String(currentIndex + 1).padStart(2, '0');

        }


        prevButton.disabled =
            currentIndex === 0;


        const maxIndex =
            items.length - visibleItems;


        nextButton.disabled =
            currentIndex >= maxIndex;


        prevButton.style.opacity =
            currentIndex === 0 ? '.35' : '1';

        nextButton.style.opacity =
            currentIndex >= maxIndex ? '.35' : '1';

    }


    nextButton.addEventListener('click', () => {

        const visibleItems = getVisibleItems();

        const maxIndex =
            items.length - visibleItems;


        if (currentIndex < maxIndex) {

            currentIndex++;

            updateCarousel();

        }

    });


    prevButton.addEventListener('click', () => {

        if (currentIndex > 0) {

            currentIndex--;

            updateCarousel();

        }

    });


    window.addEventListener(
        'resize',
        updateCarousel
    );


    updateCarousel();

}


/* ==================================================
   REVEAL AO ROLAR
================================================== */

const revealElements =
    document.querySelectorAll('.reveal');


if (revealElements.length) {

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            'visible'
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    revealElements.forEach(element => {

        observer.observe(element);

    });

}