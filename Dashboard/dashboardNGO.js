/* ==========================================
   OUTCOMEHUB - DASHBOARD CONTROLLER
   Built by: OutcomeHub Team (Custom Build)
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================
       CACHE DOM ELEMENTS
    ====================================== */
    const elements = {
        navLinks: document.querySelectorAll(".sidebar .nav-link"),
        logout: document.getElementById("logout"),
        notifications: document.querySelector(".fa-bell"),
        messages: document.querySelector(".fa-envelope"),
        applyBtn: document.querySelector(".btn-apply"),
        sop: document.querySelector(".sop-box"),
        alertToggle: document.getElementById("activateBtn")
    };


    /* ======================================
       SIDEBAR NAVIGATION STATE
    ====================================== */
    const setActiveNav = () => {
        elements.navLinks.forEach(link => {
            link.addEventListener("click", () => {
                elements.navLinks.forEach(item => item.classList.remove("active"));
                link.classList.add("active");
            });
        });
    };


    /* ======================================
       HANDLE LOGOUT FLOW
    ====================================== */
    const handleLogout = () => {
        if (!elements.logout) return;

        elements.logout.addEventListener("click", (e) => {
            e.preventDefault();

            const confirmExit = confirm("Do you really want to log out of OutcomeHub?");

            if (confirmExit) {
                window.location.href = elements.logout.href;
            }
        });
    };


    /* ======================================
       NOTIFICATIONS & MESSAGES
    ====================================== */
    const initHeaderActions = () => {

        if (elements.notifications) {
            elements.notifications.addEventListener("click", () => {
                alert("🔔 You have no new notifications right now");
            });
        }

        if (elements.messages) {
            elements.messages.addEventListener("click", () => {
                alert("✉️ Your inbox is currently empty");
            });
        }
    };


    /* ======================================
       APPLY BUTTON LOGIC
    ====================================== */
    const handleApply = () => {
        if (!elements.applyBtn) return;

        elements.applyBtn.addEventListener("click", () => {

            const roleTitle = document.querySelector(".ngo-card h2")?.innerText || "this role";

            elements.applyBtn.innerText = "Applied ✔";
            elements.applyBtn.disabled = true;

            elements.applyBtn.style.background = "#2ecc71";
            elements.applyBtn.style.color = "#fff";
            elements.applyBtn.style.cursor = "not-allowed";

            alert(`Application submitted for: ${roleTitle}`);
        });
    };


    /* ======================================
       SOP TOGGLE (FUTURE MODAL READY)
    ====================================== */
    const handleSOP = () => {
        if (!elements.sop) return;

        let isOpen = false;

        elements.sop.addEventListener("click", () => {
            isOpen = !isOpen;

            elements.sop.classList.toggle("open", isOpen);

            if (isOpen) {
                alert("Standard Operating Procedure opened 📄");
            } else {
                alert("Standard Operating Procedure closed");
            }
        });
    };


    /* ======================================
       ROLE ALERT SYSTEM
    ====================================== */
    const handleAlerts = () => {
        if (!elements.alertToggle) return;

        let isActive = false;

        elements.alertToggle.addEventListener("click", () => {
            isActive = !isActive;

            if (isActive) {
                elements.alertToggle.innerText = "Activated 🔔";
                elements.alertToggle.style.background = "#2ecc71";
                elements.alertToggle.style.color = "#fff";

                alert("You will now receive role alerts");
            } else {
                elements.alertToggle.innerText = "Activate";
                elements.alertToggle.style.background = "";
                elements.alertToggle.style.color = "";

                alert("Role alerts disabled");
            }
        });
    };


    /* ======================================
       INITIALIZE ALL FEATURES
    ====================================== */
    const init = () => {
        setActiveNav();
        handleLogout();
        initHeaderActions();
        handleApply();
        handleSOP();
        handleAlerts();
    };

    init();

});