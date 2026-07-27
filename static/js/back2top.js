document.addEventListener('DOMContentLoaded', () => {

    const back2top = document.querySelector('.back2top');

    window.addEventListener('scroll', () => {

        back2top.classList.toggle(
            'visible',
            window.scrollY >= 500
        );

    }, { passive: true });

    back2top.addEventListener('click', () => {

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

    });

});
