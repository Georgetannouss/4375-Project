let currentSlide = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.display = i === index ? 'block' : 'none';
        testimonial.classList.toggle('active', i === index);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });

    currentSlide = index;
}

document.getElementById('prev').addEventListener('click', () => {
    const newIndex = currentSlide === 0 ? testimonials.length - 1 : currentSlide - 1;
    showTestimonial(newIndex);
});

document.getElementById('next').addEventListener('click', () => {
    const newIndex = currentSlide === testimonials.length - 1 ? 0 : currentSlide + 1;
    showTestimonial(newIndex);
});



showTestimonial(0);


const floating_btn = document.querySelector('.floating-btn');
const close_btn = document.querySelector('.close-btn');
const social_panel_container = document.querySelector('.social-panel-container');

floating_btn.addEventListener('click', () => {
	social_panel_container.classList.toggle('visible')
});

close_btn.addEventListener('click', () => {
	social_panel_container.classList.remove('visible')
});
