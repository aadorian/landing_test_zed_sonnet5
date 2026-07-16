document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('adoption-form');
  const successMessage = document.getElementById('form-success');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    console.log('Adoption application submitted:', data);

    successMessage.hidden = false;
    form.reset();

    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
});
