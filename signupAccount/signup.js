class SignupForm {
  constructor() {
    this.form = document.getElementById('signupForm');
    this.email = document.getElementById('email');
    this.password = document.getElementById('password');
    this.confirmPassword = document.getElementById('confirmPassword');
    this.submitBtn = this.form.querySelector('.btn-primary');
    this.btnText = this.submitBtn.querySelector('.btn-text');
    this.btnLoader = this.submitBtn.querySelector('.btn-loader');
    
    this.init();
  }

  init() {
    this.setupPasswordToggles();
    this.setupSocialLogin();
    this.setupFormValidation();
  }

  setupPasswordToggles() {
    document.querySelectorAll('.toggle-password').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = btn.previousElementSibling;
        const icon = btn.querySelector('i');
        const isHidden = input.type === 'password';
        
        input.type = isHidden ? 'text' : 'password';
        icon.className = isHidden ? 'fas fa-eye' : 'fas fa-eye-slash';
        btn.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
      });
    });
  }

  setupSocialLogin() {
    document.querySelectorAll('.social-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const provider = btn.dataset.provider;
        this.handleSocialLogin(provider);
      });
    });
  }

  handleSocialLogin(provider) {
    console.log(`Initiating ${provider} OAuth`);
    alert(`Redirecting to ${provider} signup...\nReplace with Firebase/Supabase OAuth`);
    // Example: supabase.auth.signInWithOAuth({ provider })
  }

  setupFormValidation() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    
    // Real-time validation
    [this.email, this.password, this.confirmPassword].forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => {
        if (input.closest('.form-field').classList.contains('error')) {
          this.clearError(input);
        }
      });
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    const isValid = this.validateAll();
    if (!isValid) return;
    
    await this.submitForm();
  }

  validateAll() {
    return [
      this.validateEmail(),
      this.validatePassword(),
      this.validateConfirmPassword()
    ].every(Boolean);
  }

  validateField(input) {
    switch(input.id) {
      case 'email': return this.validateEmail();
      case 'password': return this.validatePassword();
      case 'confirmPassword': return this.validateConfirmPassword();
    }
  }

  validateEmail() {
    const value = this.email.value.trim();
    if (!value) {
      this.showError(this.email, 'Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      this.showError(this.email, 'Enter a valid email address');
      return false;
    }
    this.clearError(this.email);
    return true;
  }

  validatePassword() {
    const value = this.password.value;
    if (value.length < 8) {
      this.showError(this.password, 'Password must be at least 8 characters');
      return false;
    }
    if (!/[A-Z]/.test(value)) {
      this.showError(this.password, 'Include at least 1 uppercase letter');
      return false;
    }
    if (!/[0-9]/.test(value)) {
      this.showError(this.password, 'Include at least 1 number');
      return false;
    }
    this.clearError(this.password);
    return true;
  }

  validateConfirmPassword() {
    if (this.confirmPassword.value !== this.password.value) {
      this.showError(this.confirmPassword, 'Passwords do not match');
      return false;
    }
    this.clearError(this.confirmPassword);
    return true;
  }

  async submitForm() {
    this.setLoading(true);
    
    const userData = {
      email: this.email.value.trim().toLowerCase(),
      password: this.password.value
    };

    try {
      const response = await fetch('https://api.outcomehub.com/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
        signal: AbortSignal.timeout(10000)
      });

      const data = await response.json();

      if (response.ok) {
        this.showSuccess(userData.email);
      } else {
        this.handleApiError(data);
      }
    } catch (error) {
      alert(error.name === 'TimeoutError' 
        ? 'Request timed out. Check your connection.' 
        : 'Network error. Please try again.');
      console.error(error);
    } finally {
      this.setLoading(false);
    }
  }

  handleApiError(data) {
    if (data.code === 'EMAIL_EXISTS') {
      this.showError(this.email, 'This email is already registered');
    } else {
      this.showError(this.email, data.message || 'Signup failed. Please try again.');
    }
  }

  showSuccess(email) {
    this.form.innerHTML = `
      <div class="success-state">
        <i class="fas fa-check-circle"></i>
        <h3>Check your email</h3>
        <p>We sent a verification link to <strong>${email}</strong></p>
      </div>
    `;
    // setTimeout(() => window.location.href = '/dashboard', 3000);
  }

  showError(input, message) {
    const field = input.closest('.form-field');
    field.classList.add('error');
    field.querySelector('.error-text').textContent = message;
    input.setAttribute('aria-invalid', 'true');
  }

  clearError(input) {
    const field = input.closest('.form-field');
    field.classList.remove('error');
    input.setAttribute('aria-invalid', 'false');
  }

  setLoading(loading) {
    this.submitBtn.disabled = loading;
    this.btnText.classList.toggle('hidden', loading);
    this.btnLoader.classList.toggle('hidden', !loading);
  }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => new SignupForm());