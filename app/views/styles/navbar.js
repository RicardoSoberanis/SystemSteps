// Seleccionar la navbar
const navbar = document.querySelector('.navbar');

// Función para manejar el scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) { // Cambia el valor según tus necesidades
    navbar.classList.add('scrolled'); // Agrega la clase cuando hay scroll
  } else {
    navbar.classList.remove('scrolled'); // Quita la clase cuando no hay scroll
  }
});