let selectedRole = "volunteer";

const volunteerCard = document.getElementById("card-volunteer");
const ngoCard = document.getElementById("card-ngo");

volunteerCard.addEventListener("click", () => {
  selectedRole = "volunteer";

  volunteerCard.classList.add("selected");
  ngoCard.classList.remove("selected");
});

ngoCard.addEventListener("click", () => {
  selectedRole = "ngo";

  ngoCard.classList.add("selected");
  volunteerCard.classList.remove("selected");
});

document
.getElementById("registerForm")
.addEventListener("submit", function(e){

  e.preventDefault();

  const password =
    document.getElementById("password").value;

  const confirmPassword =
    document.getElementById("confirmPassword").value;

  if(password !== confirmPassword){
    alert("Passwords do not match");
    return;
  }

  const user = {
    role:selectedRole,
    firstName:document.getElementById("firstName").value,
    lastName:document.getElementById("lastName").value,
    email:document.getElementById("email").value
  };

  localStorage.setItem(
    "volunteerBridgeUser",
    JSON.stringify(user)
  );

  alert("Registration Successful!");

  if(selectedRole === "volunteer"){
      window.location.href = "/Dashboard/dashboard.html";
  }else{
      window.location.href = "/Dashboard/dashboardNGO.html";
  }
});