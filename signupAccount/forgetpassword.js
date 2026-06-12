const form = document.getElementById("loginForm");
const passwordInput = document.getElementById("password");
const togglePass = document.querySelector(".toggle-pass");

togglePass.addEventListener("click", () => {
  const type =
    passwordInput.getAttribute("type") === "password"
      ? "text"
      : "password";

  passwordInput.setAttribute("type", type);

  togglePass.classList.toggle("fa-eye");
  togglePass.classList.toggle("fa-eye-slash");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  alert("Login Successful!");

  // Redirect to dashboard
  window.location.href = "/Dashboard/dashboard.html";
});