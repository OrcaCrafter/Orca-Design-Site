

const buttons = document.querySelectorAll("[data-carousel-button]");

buttons.forEach(button => {
    button.addEventListener("click", () => {

        const offset = parseInt(button.dataset.carouselButton);

        const slides = button.closest("[data-carousel]").querySelector("[data-slides]");
        
        const activeSlide = slides.querySelector("[data-active]");

        let newIndex = [...slides.children].indexOf(activeSlide) + offset;

        let maxIndex = slides.children.length - 1;

        if (newIndex < 0) {
            newIndex = maxIndex;
        }

        if (newIndex >= maxIndex + 1) {
            newIndex = 0;
        }

        slides.children[newIndex].dataset.active = true;
        delete activeSlide.dataset.active;
    });
});

window.onload = function () {

    const carousels = document.querySelectorAll("[data-carousel]");

    carousels.forEach(carousel => {

        var slides = carousel.querySelectorAll(".slide");
        var height = 0;
        
        for (var i = 0; i < slides.length; i++) {
            var checkHeight = slides[i].scrollHeight;

            if (checkHeight > height) {
                height = checkHeight;
            }
        }

        carousel.style.height = `${height}px`;
    });

}