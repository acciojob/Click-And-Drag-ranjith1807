const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  
  // Use e.pageX to strictly match the Cypress test
  startX = e.pageX;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  
  const currentX = e.pageX;
  const walk = currentX - startX; 
  
  // Moving mouse left (negative walk) increases scrollLeft (scrolls right)
  slider.scrollLeft = scrollLeft - walk;
});