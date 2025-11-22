const form = document.querySelector('.contact-form');

form.addEventListener('submit', e => {
  e.preventDefault();

  const name = form.querySelector("input[name='name']").value.trim();
  const email = form.querySelector("input[name='email']").value.trim();
  const message = form.querySelector("textarea[name='message']").value.trim();

  if (!name || !email || !message) {
    alert('Будь ласка, заповніть усі поля!');
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert('Введіть коректний email!');
    return;
  }

  console.log('Дані для відправки:', { name, email, message });
  alert('Дякуємо за інтерес! Менеджер зв’яжеться з вами найближчим часом.');

  form.reset();
});
