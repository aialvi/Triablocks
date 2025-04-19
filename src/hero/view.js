/**
 * Front-end JavaScript for the Hero block
 * 
 * Adds smooth transitions and interactions to the hero block on the front-end.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Get all Hero blocks on the page
    const heroBlocks = document.querySelectorAll('.wp-block-triablocks-hero');
    
    // Initialize each Hero block
    heroBlocks.forEach(initializeHeroBlock);
    
    // Add scroll effects
    window.addEventListener('scroll', () => {
        heroBlocks.forEach(applyScrollEffects);
    });
});

/**
 * Initialize a single hero block with animations and effects
 * 
 * @param {HTMLElement} heroBlock The hero block element
 */
function initializeHeroBlock(heroBlock) {
    // Add initial entrance animation
    const background = heroBlock.querySelector('.tb-hero-background');
    const contentWrapper = heroBlock.querySelector('.tb-hero-content');
    
    if (background) {
        // Fade in animation
        background.style.opacity = '0';
        setTimeout(() => {
            background.style.transition = 'opacity 1s ease-in-out, transform 0.5s ease-in-out';
            background.style.opacity = '1';
        }, 100);

        // Add subtle hover effect for the background
        heroBlock.addEventListener('mouseenter', () => {
            background.style.transform = 'scale(1.05)';
        });
        
        heroBlock.addEventListener('mouseleave', () => {
            background.style.transform = 'scale(1)';
        });
    }
    
    if (contentWrapper) {
        // Add staggered entrance for content
        contentWrapper.style.opacity = '0';
        contentWrapper.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            contentWrapper.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            contentWrapper.style.opacity = '1';
            contentWrapper.style.transform = 'translateY(0)';
        }, 300);
    }

    // Make any buttons interactive
    const buttons = heroBlock.querySelectorAll('.tb-hero-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            button.style.transform = 'translateY(-3px)';
            button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = 'none';
        });
    });
}

/**
 * Apply scroll-based effects to hero blocks
 * 
 * @param {HTMLElement} heroBlock The hero block element
 */
function applyScrollEffects(heroBlock) {
    const rect = heroBlock.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Only apply effects when block is in viewport
    if (rect.top < windowHeight && rect.bottom > 0) {
        const scrollProgress = 1 - (rect.top / windowHeight);
        
        // Parallax effect on background
        const background = heroBlock.querySelector('.tb-hero-background');
        if (background) {
            background.style.transform = `translateY(${scrollProgress * 30}px)`;
        }
    }
}
