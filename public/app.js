let items = document.querySelectorAll('.slider .item');
let active = 3;
let intervalId; // Variable to store the interval ID

// Function to show slides
function loadShow() {
    items.forEach((item, index) => {
        if (index === active) {
            item.style.transform = `none`;
            item.style.zIndex = 1;
            item.style.filter = 'none';
            item.style.opacity = 1;
            const textContent = item.querySelector('.text-content');
            textContent.style.visibility = 'visible';
        } else {
            const stt = Math.abs(index - active);
            const translateXValue = index < active ? -120 * stt : 120 * stt; // Adjust the translateX value based on slide position
            item.style.transform = `translateX(${translateXValue}px) scale(${1 - 0.2 * stt}) perspective(100px) rotateY(${index < active ? -1 : 1}deg)`;
            item.style.zIndex = -stt;
            item.style.opacity = stt > 2 ? 0 : 0.6;
            const textContent = item.querySelector('.text-content');
            textContent.style.visibility = 'hidden';
        }
    });
}

// Function to transition to the next slide
function nextSlide() {
    active = active + 1 < items.length ? active + 1 : 0; // Loop back to the first slide if necessary
    loadShow();
}

// Start auto-sliding
function startAutoSlide() {
    intervalId = setInterval(nextSlide, 2000); // 2-second delay
}

// Stop auto-sliding
function stopAutoSlide() {
    clearInterval(intervalId);
}

// Load the initial show
loadShow();

// Set up event listeners for next and previous buttons
let next = document.getElementById('next');
let prev = document.getElementById('prev');

next.onclick = function() {
    stopAutoSlide(); // Stop auto-sliding when user interacts with the slider
    nextSlide();
};

prev.onclick = function() {
    stopAutoSlide(); // Stop auto-sliding when user interacts with the slider
    active = active - 1 >= 0 ? active - 1 : items.length - 1; // Loop back to the last slide if necessary
    loadShow();
};

// Start auto-sliding when the page loads
startAutoSlide();
