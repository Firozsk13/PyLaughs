document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const jokeText = document.getElementById('joke-text');
    const generateBtn = document.getElementById('generate-btn');
    const btnText = generateBtn.querySelector('.btn-text');
    const btnLoading = generateBtn.querySelector('.btn-loading');
    
    // State
    let isGenerating = false;
    
    // Event Listeners
    generateBtn.addEventListener('click', fetchJoke);
    
    // Functions
    async function fetchJoke() {
        if (isGenerating) return;
        
        try {
            // Update UI for loading state
            setLoadingState(true);
            
            // Show loading animation
            let dots = 0;
            const loadingInterval = setInterval(() => {
                dots = (dots % 3) + 1;
                btnLoading.textContent = 'Generating' + '.'.repeat(dots);
            }, 300);
            
            // Fetch joke from the server
            const response = await fetch('/get_joke');
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch joke');
            }
            
            // Clear loading interval and update UI
            clearInterval(loadingInterval);
            
            // Animate joke appearance
            jokeText.style.animation = 'fadeOut 0.3s forwards';
            
            setTimeout(() => {
                jokeText.textContent = data.joke;
                jokeText.style.animation = 'fadeIn 0.5s forwards';
                
                // Update button to success state
                generateBtn.classList.add('success');
                btnText.textContent = '🎉 One More!';
                
                // Reset button after delay
                setTimeout(() => {
                    generateBtn.classList.remove('success');
                    btnText.textContent = '🎭 Get Another Joke';
                    setLoadingState(false);
                }, 2000);
            }, 300);
            
        } catch (error) {
            console.error('Error fetching joke:', error);
            jokeText.textContent = 'Oops! Something went wrong. Please try again.';
            jokeText.style.color = '#e74c3c';
            setLoadingState(false);
        }
    }
    
    function setLoadingState(isLoading) {
        isGenerating = isLoading;
        generateBtn.disabled = isLoading;
        generateBtn.classList.toggle('loading', isLoading);
        
        if (!isLoading) {
            generateBtn.querySelector('.btn-loading').textContent = 'Generating...';
        }
    }
    
    // Add fadeIn animation for initial load
    setTimeout(() => {
        document.querySelector('.card').style.animation = 'fadeIn 0.5s ease forwards';
    }, 100);
});
