

// Sidebar navigation active state + page switch simulation

const navItems = document.querySelectorAll(".item");

navItems.forEach(item => {
  item.addEventListener("click", () => {

    // remove active class from all
    navItems.forEach(i => i.classList.remove("active"));

    // add active to clicked
    item.classList.add("active");

    // get page
    const page = item.getAttribute("data-page");

    console.log("Navigating to:", page);

    // OPTIONAL: real navigation
    // window.location.href = page;

  });
});


// Example button actions (right panel)
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", () => {
    alert(btn.textContent + " clicked!");
  });
});