/**
 * Frontend JavaScript for the Testimonials block.
 * 
 * This script adds carousel functionality for testimonials with the 'carousel' layout.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Find all carousel testimonial blocks
    const carousels = document.querySelectorAll('.wp-block-triablocks-testimonials.tb-testimonials-layout-carousel .tb-testimonials-grid');
    
    carousels.forEach(carousel => {
        // Get all testimonial items in this carousel
        const items = carousel.querySelectorAll('.wp-block-triablocks-testimonial-item');
        if (items.length < 2) return; // No need for controls if there's just one item
        
        // Create navigation buttons
        const nav = document.createElement('div');
        nav.className = 'tb-testimonial-carousel-nav';
        nav.innerHTML = `
            <button class="tb-carousel-prev tb-bg-primary-700 tb-text-white tb-rounded-full tb-w-10 tb-h-10 tb-flex tb-items-center tb-justify-center tb-shadow-md" aria-label="Previous">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="tb-w-5 tb-h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
            </button>
            <button class="tb-carousel-next tb-bg-primary-700 tb-text-white tb-rounded-full tb-w-10 tb-h-10 tb-flex tb-items-center tb-justify-center tb-shadow-md" aria-label="Next">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="tb-w-5 tb-h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </button>
        `;
        
        // Insert navigation after the carousel
        carousel.parentNode.insertBefore(nav, carousel.nextSibling);
        
        // Add event listeners to the buttons
        const prevButton = nav.querySelector('.tb-carousel-prev');
        const nextButton = nav.querySelector('.tb-carousel-next');
        
        prevButton.addEventListener('click', () => {
            carousel.scrollBy({ left: -carousel.offsetWidth * 0.8, behavior: 'smooth' });
        });
        
        nextButton.addEventListener('click', () => {
            carousel.scrollBy({ left: carousel.offsetWidth * 0.8, behavior: 'smooth' });
        });
    });
});