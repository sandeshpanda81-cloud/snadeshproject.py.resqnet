const $ = id => document.getElementById(id);

function showToast(message) {
    const toast = $("toast");
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
}

function updateDashboard(data) {
    $("incidents").textContent = data.incidents;
    $("critical").textContent = data.critical;
    $("ambulances").textContent = data.ambulances;
    $("teams").textContent = data.teams;
    $("kits").textContent = `${data.medical_kits} / 50`;
    $("shelter").textContent = `${data.shelter_capacity} / 500`;

    const critical = data.risk === "CRITICAL";
    $("riskBadge").textContent = `● ${data.risk} RISK`;
    $("riskText").textContent = `${critical ? "Critical" : "High"}-risk flood event`;
    $("score").textContent = critical ? 94 : 86;

    $("recommendation").textContent = critical
        ? "Immediately deploy Rescue Teams #01 and #03 to Zone A. Prioritize medical evacuation and use Route C."
        : "Deploy Rescue Team #03 to Zone A. Route C is currently the safest available route.";

    $("lastUpdated").textContent =
        `Last updated: ${data.timestamp || "just now"}`;
}

async function simulateDisaster() {
    showToast("AI agents analyzing disaster data...");
    try {
        const response = await fetch("/api/simulate", {method: "POST"});
        const data = await response.json();
        setTimeout(() => {
            updateDashboard(data);
            showToast("✓ AI disaster analysis completed.");
        }, 700);
    } catch (error) {
        showToast("Backend connection error.");
    }
}

async function resetDashboard() {
    try {
        const response = await fetch("/api/reset", {method: "POST"});
        const data = await response.json();
        updateDashboard(data);
        showToast("Dashboard reset successfully.");
    } catch (error) {
        showToast("Backend connection error.");
    }
}

async function loadDashboard() {
    try {
        const response = await fetch("/api/dashboard");
        const data = await response.json();
        updateDashboard(data);
    } catch (error) {
        console.log("Dashboard API unavailable.");
    }
}

loadDashboard();
