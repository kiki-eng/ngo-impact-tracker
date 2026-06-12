const form = document.getElementById('signupForm');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const submitBtn = form.querySelector('.btn-submit');

// Password visibility toggle
document.querySelectorAll('.toggle').forEach(icon => {
  icon.addEventListener('click', () => {
    const input = icon.previousElementSibling;
    const type = input.type === 'password' ? 'text' : 'password';
    input.type = type;
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
  });
});

// Social login handlers
document.querySelectorAll('.social-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const provider = btn.dataset.provider;
    alert(`Redirecting to ${provider} signup...\nConnect Firebase/Supabase OAuth here`);
  });
});

// Form validation
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  let valid = true;

  // Email
  if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    setError(email, 'Enter a valid email address');
    valid = false;
  } else {
    clearError(email);
  }

  // Password
  if (password.value.length < 8) {
    setError(password, 'Password must be at least 8 characters');
    valid = false;
  } else {
    clearError(password);
  }

  // Confirm password
  if (confirmPassword.value !== password.value) {
    setError(confirmPassword, 'Passwords do not match');
    valid = false;
  } else {
    clearError(confirmPassword);
  }

  if (valid) {
    await submitSignup();
  }
});

async function submitSignup() {
  submitBtn.disabled = true;
  submitBtn.textContent = 'Creating account...';

  try {
    const res = await fetch('https://api.outcomehub.com/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value.trim().toLowerCase(),
        password: password.value
      })
    });

    const data = await res.json();

    if (res.ok) {
      form.innerHTML = `
        <div class="success-message">
          <i class="fas fa-check-circle success-icon"></i>
          <h3>Account created!</h3>
          <p class="success-text">Check ${email.value} for a verification link, then sign in to continue.</p>
          <a href="forgetpassword.html" class="btn-submit success-btn">Go to Sign In</a>
        </div>
      `;
      return;
    }

    setError(email, data.message || 'Signup failed');
  } catch (err) {
    alert('Network error. Please try again.');
    console.error(err);
  } finally {
    if (submitBtn.isConnected) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Sign up';
    }
  }
}

function setError(input, message) {
  const field = input.closest('.field');
  field.classList.add('error');
  field.querySelector('.error').textContent = message;
}

function clearError(input) {
  const field = input.closest('.field');
  field.classList.remove('error');
}

// Clear error on typing
[email, password, confirmPassword].forEach(input => {
  input.addEventListener('input', () => clearError(input));
});