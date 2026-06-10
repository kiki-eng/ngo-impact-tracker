// Login Form Handler
class LoginForm {
  constructor() {
    this.form = document.getElementById('loginForm');
    if (!this.form) return; // Exit if not login page
    
    this.email = document.getElementById('email');
    this.password = document.getElementById('password');
    this.remember = document.getElementById('remember');
    this.submitBtn = this.form.querySelector('.btn-primary');
    this.btnText = this.submitBtn.querySelector('.btn-text');
    this.btnLoader = this.submitBtn.querySelector('.btn-loader');
    
    this.init();
  }

  init() {
    // Password toggle
    document.querySelector('.toggle-pass')?.addEventListener('click', (e) => {
      const input = e.target.previousElementSibling;
      const type = input.type === 'password' ? 'text' : 'password';
      input.type = type;
      e.target.classList.toggle('fa-eye');
      e.target.classList.toggle('fa-eye-slash');
    });

    // Google login
    document.querySelector('.btn-social')?.addEventListener('click', () => {
      alert('Redirecting to Google OAuth...\nConnect Supabase/Firebase here');
    });

    // Form submit
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    
    // Clear errors on input
    [this.email, this.password].forEach(input => {
      input.addEventListener('input', () => this.clearError(input));
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    if (!this.validate()) return;
    
    this.setLoading(true);

    try {
      const response = await fetch('https://api.outcomehub.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: this.email.value.trim().toLowerCase(),
          password: this.password.value,
          remember: this.remember.checked
        }),
        signal: AbortSignal.timeout(10000)
      });

      const data = await response.json();

      if (response.ok) {
        // Store token
        const storage = this.remember.checked ? localStorage : sessionStorage;
        storage.setItem('token', data.token);
        storage.setItem('user', JSON.stringify(data.user));
        
        // Redirect to dashboard
        window.location.href = '../dashboard/index.html';
      } else {
        this.showError(this.email, data.message || 'Invalid email or password');
      }
    } catch (error) {
      alert(error.name === 'TimeoutError' ? 'Request timed out' : 'Network error');
      console.error(error);
    } finally {
      this.setLoading(false);
    }
  }

  validate() {
    let valid = true;

    if (!this.email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email.value)) {
      this.showError(this.email, 'Enter a valid email address');
      valid = false;
    }

    if (!this.password.value) {
      this.showError(this.password, 'Password is required');
      valid = false;
    }

    return valid;
  }

  showError(input, message) {
    const group = input.closest('.form-group');
    group.classList.add('error');
    group.querySelector('.error-msg').textContent = message;
  }

  clearError(input) {
    const group = input.closest('.form-group');
    group.classList.remove('error');
  }

  setLoading(loading) {
    this.submitBtn.disabled = loading;
    this.btnText.classList.toggle('hidden', loading);
    this.btnLoader.classList.toggle('hidden', !loading);
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => new LoginForm());