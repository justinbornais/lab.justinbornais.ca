(function () {
  // Theme management
  function getPreferredTheme() {
    const stored = localStorage.getItem("theme");
    if (stored) return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
  }

  applyTheme(getPreferredTheme());

  document.getElementById("theme-toggle").addEventListener("click", function () {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem("theme", next);
    applyTheme(next);
  });

  // Load and render projects
  fetch("projects.json")
    .then(function (res) { return res.json(); })
    .then(function (projects) {
      var container = document.getElementById("projects");
      projects.forEach(function (project) {
        var card = document.createElement("div");
        card.className = "card";
        card.innerHTML =
          "<h2>" + escapeHtml(project.name) + "</h2>" +
          "<p>" + escapeHtml(project.description) + "</p>" +
          '<div class="card-links">' +
            '<a href="' + escapeAttr(project.url) + '" target="_blank" rel="noopener">Open Tool</a>' +
            '<a href="' + escapeAttr(project.github) + '" target="_blank" rel="noopener">GitHub</a>' +
          "</div>";
        container.appendChild(card);
      });
    });

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function escapeAttr(str) {
    return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
})();
