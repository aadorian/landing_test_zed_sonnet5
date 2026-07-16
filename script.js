document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('adoption-form');
  const successMessage = document.getElementById('form-success');
  const submitBtn = form.querySelector('.btn-submit');
  const submitLabel = submitBtn.querySelector('.btn-label');

  // Field-level validators. Each returns an error string, or '' if valid.
  const validators = {
    fullName: (input) => {
      if (!input.value.trim()) return "Please enter your full name.";
      return '';
    },
    email: (input) => {
      if (!input.value.trim()) return "Please enter your email address.";
      if (!input.validity.valid) return "Enter a valid email, like jane@example.com.";
      return '';
    },
    phone: (input) => {
      const digits = input.value.replace(/\D/g, '');
      if (!input.value.trim()) return "Please enter your phone number.";
      if (digits.length < 7) return "Enter a valid phone number, including area code.";
      return '';
    },
    message: (input) => {
      if (!input.value.trim()) return "Tell us a bit about why you'd like to adopt.";
      return '';
    },
  };

  function showFieldError(fieldName, message) {
    const errorEl = document.getElementById(`${fieldName}-error`);
    const input = form.elements[fieldName];
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.hidden = !message;
    }
    if (input && input.classList) {
      input.classList.toggle('has-error', Boolean(message));
    }
  }

  function validateField(fieldName) {
    const input = form.elements[fieldName];
    const validator = validators[fieldName];
    if (!input || !validator) return '';
    const message = validator(input);
    showFieldError(fieldName, message);
    return message;
  }

  function validateHomeType() {
    const checked = form.querySelector('input[name="homeType"]:checked');
    const radioGroup = form.querySelector('.radio-group');
    const message = checked ? '' : 'Please select whether you live in a house or apartment.';
    showFieldError('homeType', message);
    if (radioGroup) radioGroup.classList.toggle('has-error', Boolean(message));
    return message;
  }

  // Validate on blur so errors appear at the right moment, not on first keystroke.
  ['fullName', 'email', 'phone', 'message'].forEach((fieldName) => {
    const input = form.elements[fieldName];
    if (input) {
      input.addEventListener('blur', () => validateField(fieldName));
    }
  });
  form.querySelectorAll('input[name="homeType"]').forEach((radio) => {
    radio.addEventListener('change', validateHomeType);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const fieldErrors = ['fullName', 'email', 'phone', 'message'].map(validateField);
    const homeTypeError = validateHomeType();
    const firstErrorField = [...fieldErrors, homeTypeError].some(Boolean);

    if (firstErrorField) {
      // Move focus to the first invalid field; preserve everything the user typed.
      const firstInvalid = form.querySelector('.has-error, .radio-group.has-error');
      if (firstInvalid) {
        (firstInvalid.querySelector('input, textarea') || firstInvalid).focus();
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());

    // Simulate an async submission with a visible loading state.
    submitBtn.disabled = true;
    submitBtn.classList.add('is-loading');
    submitLabel.textContent = 'Submitting…';

    setTimeout(() => {
      console.log('Adoption application submitted:', data);

      submitBtn.disabled = false;
      submitBtn.classList.remove('is-loading');
      submitLabel.textContent = 'Submit Application';

      successMessage.hidden = false;
      form.reset();
      form.querySelectorAll('.has-error').forEach((el) => el.classList.remove('has-error'));
      form.querySelectorAll('.field-error').forEach((el) => {
        el.hidden = true;
      });

      successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 900);
  });
});
