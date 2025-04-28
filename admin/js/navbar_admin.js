document.addEventListener("DOMContentLoaded", () => {
    const offCanvas = document.querySelector('.offcanvas');
    const toggleButton = document.getElementById('toggleButton');
    const row_parent = document.getElementById('row_parent');
    const offcanvas_div = document.getElementById('offcanvas_div');
    
    // 
    
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    function handleScreenChange(e) {
      if (e.matches) {
        offCanvas.classList.remove('show');
        offCanvas.classList.remove('offcanvas-start');
        offCanvas.classList.add('offcanvas-top');
        toggleButton.classList.remove('d-none');
        offcanvas_div.remove()
        // offcanvas-top
    
      } else {
        // Screen is wider than 768px
        row_parent.appendChild(offcanvas_div);
        offCanvas.classList.add('show'); 
        offCanvas.classList.remove('offcanvas-top');
        offCanvas.classList.add('offcanvas-start');
        toggleButton.classList.add('d-none'); 
    
      }
    
    }
    
    mediaQuery.addEventListener('change', handleScreenChange);
    
    });