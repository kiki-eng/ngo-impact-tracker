const eventDate = new Date("July 18, 2026 11:00:00").getTime();

function updateTimer() {

    const now = new Date().getTime();
    const distance = eventDate - now;

    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const mins = Math.floor(
        (distance % (1000 * 60 * 60))
        / (1000 * 60)
    );

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("mins").textContent = mins;
}

updateTimer();

setInterval(updateTimer, 60000);

document.querySelector(".download-btn")
.addEventListener("click", () => {
    alert("PDF Download Started");
});