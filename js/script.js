document.addEventListener("DOMContentLoaded", function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        // Use a lower threshold so sections reveal earlier on small screens
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px"
    });

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Ensure first section is visible on load in case observer doesn't trigger immediately
    const firstSection = document.querySelector('.section');
    if (firstSection) firstSection.classList.add('visible');
});

/*==================== QUALIFICATION TABS ====================*/
document.addEventListener("DOMContentLoaded", function() {
    // Use more specific selectors to avoid conflicts
    const qualificationButtons = document.querySelectorAll('.qualification__button[data-target]');
    const qualificationContents = document.querySelectorAll('.qualification__content[data-content]');
    
    console.log('Found qualification buttons:', qualificationButtons.length);
    console.log('Found qualification contents:', qualificationContents.length);

    qualificationButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Prevent event bubbling
            
            console.log('Qualification button clicked:', button.dataset.target);
            
            const targetId = button.dataset.target;
            const target = document.querySelector(targetId);
            console.log('Target found:', !!target, targetId);

            if (target) {
                // Remove active from all qualification contents
                qualificationContents.forEach(function(content) {
                    content.classList.remove('qualification__active');
                    console.log('Removed active from:', content.id);
                });
                
                // Add active to target content
                target.classList.add('qualification__active');
                console.log('Added active to:', target.id);

                // Update button states
                qualificationButtons.forEach(function(btn) {
                    btn.classList.remove('qualification__active');
                });
                button.classList.add('qualification__active');
                console.log('Button states updated');
                
                // Force display check and lock it
                setTimeout(function() {
                    const computedStyle = window.getComputedStyle(target);
                    console.log('Final display style:', computedStyle.display);
                    console.log('Final classes:', target.className);
                    
                    // Force lock the display
                    if (target.id === 'work') {
                        target.style.display = 'block';
                        target.style.visibility = 'visible';
                        console.log('Force locked work display');
                    }
                }, 50);
                
                // Additional check after longer delay
                setTimeout(function() {
                    if (target.id === 'work') {
                        target.style.display = 'block';
                        target.style.visibility = 'visible';
                        console.log('Double-checked work display at 200ms');
                    }
                }, 200);
            }
        });
    });
});

/*==================== LIFE ====================*/
document.addEventListener("DOMContentLoaded", function() {
  const artBalls = document.querySelectorAll('.art-ball');
  const skiingBalls = document.querySelectorAll('.skiing-ball');

  artBalls.forEach(ball => {
    // Randomize movement for art balls
    const deltaX = Math.random() * 200 - 100;
    const deltaY = Math.random() * 200 - 100;
    const scale = 0.8 + Math.random() * 0.4;

    ball.style.animation = `moveBubble 10s linear infinite`;
    ball.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scale})`;
  });

  skiingBalls.forEach(ball => {
    // Randomize movement for skiing balls with different pattern
    const deltaX = Math.random() * 150 - 75;
    const deltaY = Math.random() * 150 - 75;
    const scale = 0.9 + Math.random() * 0.3;

    ball.style.animation = `moveSkiingBubble 12s linear infinite`;
    ball.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scale})`;
  });
});

/*==================== SCROLL INDICATOR ====================*/
document.addEventListener("DOMContentLoaded", function() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const nextSection = document.querySelector('#qualification');
    
    if (scrollIndicator && nextSection) {
        scrollIndicator.addEventListener('click', function() {
            nextSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
});

/*==================== PROJECT FILTERING ====================*/
document.addEventListener("DOMContentLoaded", function() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    console.log('Project filter - buttons found:', categoryBtns.length);
    console.log('Project filter - cards found:', projectCards.length);

    // Ensure all cards are visible initially
    projectCards.forEach(card => {
        card.style.display = 'block';
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
    });

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetCategory = this.getAttribute('data-category');
            console.log('Project category clicked:', targetCategory);
            
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                console.log('Checking card:', cardCategory, 'against target:', targetCategory);
                
                if (targetCategory === 'all' || cardCategory === targetCategory) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                    console.log('Showing card:', cardCategory);
                } else {
                    card.style.display = 'none';
                    console.log('Hiding card:', cardCategory);
                }
            });
        });
    });
});
