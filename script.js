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
/* ==========================================================================
   1. Category Filtering Engine & Global Scripts
   ========================================================================== */

function filterCategory(categoryName) {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const toolCards = document.querySelectorAll(".tool-card");

    // Update active button state
    filterButtons.forEach(btn => btn.classList.remove("active"));
    if (event && event.target) {
        event.target.classList.add("active");
    }
}

/* ==========================================================================
   2. Universal Clean Print & Save as PDF Function for Text Tools
   ========================================================================== */

function printOrSavePDF(contentElementId, title = 'OmniKitHub Document') {
    const element = document.getElementById(contentElementId);
    if (!element) {
        alert("কন্টেন্ট পাওয়া যায়নি!");
        return;
    }

    // টেক্সটভ্যালু বা কন্টেন্ট নেওয়া
    let content = element.value !== undefined ? element.value : element.innerHTML;

    if (!content.trim()) {
        alert("প্রিন্ট বা সেভ করার জন্য কোনো টেক্সট নেই!");
        return;
    }

    // নতুন প্রিন্ট উইন্ডো খোলা
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
                    margin: 15mm 15mm 15mm 15mm;
                }
                
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    color: #111111;
                    background-color: #ffffff;
                    margin: 0;
                    padding: 0;
                    line-height: 1.6;
                    font-size: 13pt;
                }

                .header {
                    border-bottom: 2px solid #222222;
                    padding-bottom: 8px;
                    margin-bottom: 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .header h1 {
                    font-size: 16pt;
                    margin: 0;
                    color: #000000;
                }

                .content {
                    white-space: pre-wrap;
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                    text-align: justify;
                }

                p, div {
                    page-break-inside: auto;
                }

                @media print {
                    body {
                        -webkit-print-color-adjust: exact;
                    }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>${title}</h1>
                <span style="font-size: 10pt; color: #555555;">OmniKitHub.com</span>
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
