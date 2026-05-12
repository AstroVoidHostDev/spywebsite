// Load site metadata
document.getElementById("siteName").textContent = SITE_CONFIG.siteName;
document.getElementById("siteNameHero").textContent = SITE_CONFIG.siteName;
document.getElementById("siteLogo").textContent = SITE_CONFIG.siteLogo;
document.getElementById("siteDescription").textContent = SITE_CONFIG.siteDescription;
document.title = SITE_CONFIG.siteName + " | Premium Hosting";

// Load panel and Discord links
document.getElementById("panelBtn").href = SITE_CONFIG.customPanel.url;
document.getElementById("panelBtn").textContent = SITE_CONFIG.customPanel.name;
document.getElementById("discordBtn").href = SITE_CONFIG.social.discord;

// Set background videos
const currentPage = window.location.pathname.split("/").pop();
if (currentPage === "plans.html" || currentPage === "") {
  document.getElementById("bgVideo").src = SITE_CONFIG.defaultBgVideo.plans;
} else {
  document.getElementById("bgVideo").src = SITE_CONFIG.defaultBgVideo.index;
}

// Load plans dynamically
function loadPlans(planType, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  SITE_CONFIG.plans[planType].forEach(plan => {
    const planCard = document.createElement("div");
    planCard.className = "plan-card animate-scale-in";
    planCard.innerHTML = `
      <h3>${plan.name}</h3>
      <div class="price">${plan.price}</div>
      <div class="specs">
        ${plan.ram ? `<p><strong>RAM:</strong> ${plan.ram}</p>` : ""}
        ${plan.cpu ? `<p><strong>CPU:</strong> ${plan.cpu}</p>` : ""}
        ${plan.storage ? `<p><strong>Storage:</strong> ${plan.storage}</p>` : ""}
        ${plan.bandwidth ? `<p><strong>Bandwidth:</strong> ${plan.bandwidth}</p>` : ""}
        ${plan.players ? `<p><strong>Players:</strong> ${plan.players}</p>` : ""}
      </div>
      <ul class="features">
        ${plan.features.map(feature => `<li>${feature}</li>`).join("")}
      </ul>
      <a href="#" class="btn">Order Now</a>
    `;
    container.appendChild(planCard);
  });
}

// Load all plans
loadPlans("vps", "vpsPlans");
loadPlans("minecraft", "minecraftPlans");
loadPlans("discord", "discordPlans");

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});
