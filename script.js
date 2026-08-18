/* ==================================================
   DOCE ARTE — SCRIPT.JS
   Julia Berta
================================================== */


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
            String(isOpen)
        );

        menuToggle.setAttribute(
            'aria-label',
            isOpen ? 'Fechar menu' : 'Abrir menu'
        );

        document.body.classList.toggle(
            'menu-open',
            isOpen
        );

        /*
            Troca o ícone do botão:
            ☰ = fechado
            ×  = aberto
        */

        menuToggle.textContent = isOpen
            ? '×'
            : '☰';

    });


    /*
        Fecha o menu quando
        clicar em algum link
    */

    navLinks.querySelectorAll('a').forEach(link => {

        link.addEventListener('click', () => {

            navLinks.classList.remove('active');

            menuToggle.setAttribute(
                'aria-expanded',
                'false'
            );

            menuToggle.setAttribute(
                'aria-label',
                'Abrir menu'
            );

            document.body.classList.remove(
                'menu-open'
            );

            menuToggle.textContent = '☰';

        });

    });


    /*
        Fecha o menu ao apertar ESC
    */

    document.addEventListener('keydown', event => {

        if (
            event.key === 'Escape' &&
            navLinks.classList.contains('active')
        ) {

            navLinks.classList.remove('active');

            menuToggle.setAttribute(
                'aria-expanded',
                'false'
            );

            menuToggle.setAttribute(
                'aria-label',
                'Abrir menu'
            );

            document.body.classList.remove(
                'menu-open'
            );

            menuToggle.textContent = '☰';

        }

    });

}


/* ==================================================
   CARROSSEL — MINHAS CRIAÇÕES
================================================== */

const track =
    document.querySelector('.carousel-track');

const items =
    document.querySelectorAll('.carousel-item');

const prevButton =
    document.querySelector('.carousel-btn.prev');

const nextButton =
    document.querySelector('.carousel-btn.next');

const currentSlide =
    document.getElementById('current-slide');


if (
    track &&
    items.length > 0 &&
    prevButton &&
    nextButton
) {

    let currentIndex = 0;


    /*
        Quantidade de imagens
        visíveis por tela
    */

    function getVisibleItems() {

        if (window.innerWidth <= 768) {

            return 1;

        }

        if (window.innerWidth <= 1000) {

            return 2;

        }

        return 3;

    }


    /*
        Atualiza o carrossel
    */

    function updateCarousel() {

        const visibleItems =
            getVisibleItems();


        /*
            Espaçamento entre imagens
        */

        const gap = 20;


        /*
            Largura real da imagem
        */

        const itemWidth =
            items[0].getBoundingClientRect().width;


        /*
            Movimento total
        */

        const moveAmount =
            itemWidth + gap;


        track.style.transform =
            `translateX(-${currentIndex * moveAmount}px)`;


        /*
            Atualiza contador
        */

        if (currentSlide) {

            currentSlide.textContent =
                String(currentIndex + 1)
                    .padStart(2, '0');

        }


        /*
            Limite máximo
        */

        const maxIndex =
            Math.max(
                0,
                items.length - visibleItems
            );


        /*
            Botão anterior
        */

        prevButton.disabled =
            currentIndex <= 0;


        /*
            Botão próximo
        */

        nextButton.disabled =
            currentIndex >= maxIndex;


        /*
            Aparência dos botões
        */

        prevButton.style.opacity =
            currentIndex <= 0
                ? '.35'
                : '1';


        nextButton.style.opacity =
            currentIndex >= maxIndex
                ? '.35'
                : '1';

    }


    /* ==================================================
       PRÓXIMA IMAGEM
    ================================================== */

    nextButton.addEventListener('click', () => {

        const visibleItems =
            getVisibleItems();


        const maxIndex =
            Math.max(
                0,
                items.length - visibleItems
            );


        if (currentIndex < maxIndex) {

            currentIndex++;

            updateCarousel();

        }

    });


    /* ==================================================
       IMAGEM ANTERIOR
    ================================================== */

    prevButton.addEventListener('click', () => {

        if (currentIndex > 0) {

            currentIndex--;

            updateCarousel();

        }

    });


    /* ==================================================
       REDIMENSIONAMENTO
    ================================================== */

    window.addEventListener(
        'resize',
        () => {

            const visibleItems =
                getVisibleItems();


            const maxIndex =
                Math.max(
                    0,
                    items.length - visibleItems
                );


            /*
                Evita ficar em uma posição
                que não existe ao mudar
                de desktop para celular
            */

            if (currentIndex > maxIndex) {

                currentIndex = maxIndex;

            }


            updateCarousel();

        }
    );


    /*
        Inicializa o carrossel
    */

    updateCarousel();

}


/* ==================================================
   REVEAL — ANIMAÇÕES AO ROLAR
================================================== */

const revealElements =
    document.querySelectorAll('.reveal');


if (revealElements.length > 0) {

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


/* ==================================================
   FECHAR MENU AO REDIMENSIONAR
================================================== */

window.addEventListener('resize', () => {

    /*
        Se voltar para desktop,
        garante que o menu mobile
        não fique preso aberto.
    */

    if (
        window.innerWidth > 768 &&
        navLinks &&
        menuToggle
    ) {

        navLinks.classList.remove('active');

        menuToggle.setAttribute(
            'aria-expanded',
            'false'
        );

        menuToggle.setAttribute(
            'aria-label',
            'Abrir menu'
        );

        menuToggle.textContent = '☰';

        document.body.classList.remove(
            'menu-open'
        );

    }

});


/* ==================================================
   FIM
================================================== */