const form = document.querySelector('.contact-form');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const popupClose = document.getElementById('popup-close');

let formData = null;

function showPopup(message) {
  popupMessage.textContent = message;
  popup.style.display = 'flex';
}

popupClose.addEventListener('click', async () => {
  popup.style.display = 'none';

  if (formData) {
    const params = new URLSearchParams(formData);

    try {
      const response = await fetch(`YOUR_URL_HERE?${params.toString()}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Помилка відповіді від сервера');
      }

      console.log('GET-запит успішно відправлено');
      form.reset();
    } catch (error) {
      console.error('Помилка GET-запиту:', error);
      alert('Помилка при відправці запиту');
    }

    formData = null;
  }
});

form.addEventListener('submit', e => {
  e.preventDefault();

  const name = form.querySelector("input[name='name']").value.trim();
  const email = form.querySelector("input[name='email']").value.trim();
  const message = form.querySelector("textarea[name='message']").value.trim();

  if (!name || !email || !message) {
    showPopup('Будь ласка, заповніть усі поля!');
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    showPopup('Введіть коректний email!');
    return;
  }

  formData = { name, email, message };

  showPopup('Дякуємо за інтерес! Менеджер зв’яжеться з вами найближчим часом.');
});
