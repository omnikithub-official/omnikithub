/* ==========================================================================
   OmniKitHub.com - Main Global JavaScript
   Features: Dark/Light Mode, Instant Live Search & Dynamic Category Filter
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initTheme();
});

/* --------------------------------------------------------------------------
   1. Dark / Light Theme Toggle Engine
   -------------------------------------------------------------------------- */
function initTheme() {
    const themeToggleBtn = document.getElementById("theme-toggle");
    const body = document.body;
    
    if (!themeToggleBtn) return;

    // Check saved theme preference or default to light theme
    const savedTheme = localStorage.getItem("omnikithub_theme") || "light";
    
    if (savedTheme === "dark") {
        body.classList.remove("light-theme");
        body.classList.add("dark-theme");
        body.setAttribute("data-theme", "dark");
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        body.classList.remove("dark-theme");
        body.classList.add("light-theme");
        body.setAttribute("data-theme", "light");
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }

    // Toggle click handler
    themeToggleBtn.addEventListener("click", () => {
        if (body.classList.contains("dark-theme")) {
            body.classList.remove("dark-theme");
            body.classList.add("light-theme");
            body.setAttribute("data-theme", "light");
            localStorage.setItem("omnikithub_theme", "light");
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        } else {
            body.classList.remove("light-theme");
            body.classList.add("dark-theme");
            body.setAttribute("data-theme", "dark");
            localStorage.setItem("omnikithub_theme", "dark");
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }
    });
}

/* --------------------------------------------------------------------------
   2. Live Search Filter for 30+ Tools
   -------------------------------------------------------------------------- */
function filterTools() {
    const searchInput = document.getElementById("tool-search").value.toLowerCase().trim();
    const toolCards = document.querySelectorAll(".tool-card");

    toolCards.forEach(card => {
        const title = card.querySelector("h3").innerText.toLowerCase();
        const description = card.querySelector("p").innerText.toLowerCase();
        const category = card.getAttribute("data-category").toLowerCase();

        if (title.includes(searchInput) || description.includes(searchInput) || category.includes(searchInput)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}

/* --------------------------------------------------------------------------
   3. Category Filtering Engine
   -------------------------------------------------------------------------- */
function filterCategory(categoryName) {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const toolCards = document.querySelectorAll(".tool-card");

    // Update active button UI state
    filterButtons.forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");
function printOrSavePDF(contentElementId, title = 'OmniKitHub Document') {
    const element = document.getElementById(contentElementId);
    if (!element) return;

    let content = element.value !== undefined ? element.value : element.innerHTML;
    const printWindow = window.open('', '', 'height=750,width=950');

    printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="bn">
        <head>
            <meta charset="UTF-8">
            <title>${title}</title>
            <style>
                @page {
                    size: A4;
                    margin: 15mm;
                }
                body {
                    font-family: 'Segoe UI', Arial, sans-serif;
                    color: #111111;
                    background-color: #ffffff;
                    line-height: 1.6;
                    font-size: 13pt;
                }
                .header {
                    border-bottom: 2px solid #222;
                    padding-bottom: 8px;
                    margin-bottom: 20px;
                    display: flex;
                    justify-content: space-between;
                }
                .content {
                    white-space: pre-wrap;
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                    text-align: justify;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1 style="font-size: 16pt; margin: 0;">${title}</h1>
                <span style="font-size: 10pt; color: #555;">OmniKitHub.com</span>
            </div>
            <div class="content">${content}</div>
        </body>
        </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 300);
}
 
    // Clear search box when clicking categories
    const searchInput = document.getElementById("tool-search");
    if (searchInput) searchInput.value = "";

    // Show/Hide relevant tool cards
    toolCards.forEach(card => {
        const cardCategory = card.getAttribute("data-category");

        if (categoryName === "all" || cardCategory === categoryName) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}
