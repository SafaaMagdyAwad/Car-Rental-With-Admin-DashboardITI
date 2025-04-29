document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    let currentIndex = 0;
    let autoSlideInterval;
    let isTransitioning = false;
  
    function updateSlider() {
      isTransitioning = true;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
      
      track.addEventListener('transitionend', () => {
        isTransitioning = false;
      }, { once: true });
    }
  
    function nextSlide() {
      if (isTransitioning) return;
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlider();
    }
  
    function prevSlide() {
      if (isTransitioning) return;
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlider();
    }
  
    function goToSlide(index) {
      if (isTransitioning || index === currentIndex) return;
      currentIndex = index;
      updateSlider();
    }
  
    function startAutoSlide() {
      autoSlideInterval = setInterval(nextSlide, 4500);
    }
  
    // Event listeners
    nextBtn.addEventListener('click', () => {
      clearInterval(autoSlideInterval);
      nextSlide();
      startAutoSlide();
    });
  
    prevBtn.addEventListener('click', () => {
      clearInterval(autoSlideInterval);
      prevSlide();
      startAutoSlide();
    });
  
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => goToSlide(index));
    });
  
    // Initialize
    startAutoSlide();
  
    // Pause on hover
    const slider = document.querySelector('.slider');
    slider.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    slider.addEventListener('mouseleave', startAutoSlide);
  });