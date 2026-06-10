/* =====================================
   OUTCOMEHUB DASHBOARD - CUSTOM JS
   Author: You 🚀
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       ELEMENTS
    ========================== */
    const navLinks = document.querySelectorAll(".sidebar nav a");
    const searchInput = document.querySelector(".search-bar input");
    const roleCards = document.querySelectorAll(".role-card");
    const filterBtn = document.querySelector(".filter-btn");
    const applyButtons = document.querySelectorAll(".apply-btn");
    const detailButtons = document.querySelectorAll(".actions button:nth-child(2)");
    const bellIcon = document.querySelector(".fa-bell");
    const messageIcon = document.querySelector(".fa-envelope");


    /* =========================
       SIDEBAR ACTIVE STATE
    ========================== */
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.forEach(item => item.classList.remove("active"));
            link.classList.add("active");
        });
    });


    /* =========================
       LIVE SEARCH SYSTEM
    ========================== */
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const keyword = e.target.value.toLowerCase();

            roleCards.forEach(card => {
                const title = card.querySelector("h3")?.innerText.toLowerCase() || "";
                const org = card.querySelector("h4")?.innerText.toLowerCase() || "";

                const match = title.includes(keyword) || org.includes(keyword);

                card.style.display = match ? "flex" : "none";
            });
        });
    }


    /* =========================
       FILTER ACTION (PLACEHOLDER)
    ========================== */
    if (filterBtn) {
        filterBtn.addEventListener("click", () => {
            console.log("Filter clicked");
            alert("Filters will be added soon 🚀");
        });
    }


    /* =========================
       APPLY BUTTON SYSTEM
    ========================== */
    applyButtons.forEach(button => {
        button.addEventListener("click", () => {
            const card = button.closest(".role-card");
            const roleName = card?.querySelector("h3")?.innerText || "this role";

            button.innerText = "Applied ✔";
            button.disabled = true;

            // inline styling (simple UI feedback)
            button.style.background = "#2ecc71";
            button.style.color = "#fff";
            button.style.cursor = "not-allowed";

            alert(`You successfully applied for: ${roleName}`);
        });
    });


    /* =========================
       ROLE DETAILS ACTION
    ========================== */
    detailButtons.forEach(button => {
        button.addEventListener("click", () => {
            const card = button.closest(".role-card");
            const roleName = card?.querySelector("h3")?.innerText || "this role";

            alert(`Opening details for: ${roleName}`);
        });
    });


    /* =========================
       NOTIFICATIONS
    ========================== */
    if (bellIcon) {
        bellIcon.addEventListener("click", () => {
            alert("🔔 No new notifications");
        });
    }


    /* =========================
       MESSAGES
    ========================== */
    if (messageIcon) {
        messageIcon.addEventListener("click", () => {
            alert("✉️ No new messages");
        });
    }

});