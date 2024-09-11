document.addEventListener('DOMContentLoaded', function() {
    const burgerButton = document.querySelector('.burger-button');
    const burgerMenu = document.querySelector('.burger-menu');
  
    if (burgerButton && burgerMenu) {
      burgerButton.addEventListener('click', function() {
        burgerMenu.classList.toggle('menu-open');
        burgerButton.classList.toggle('menu-closer');
        
        if (burgerMenu.classList.contains('menu-open')) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      });
    }
  });