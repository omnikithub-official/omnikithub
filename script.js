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

    filterButtons.forEach(btn => btn.classList.remove("active"));
    if (event && event.target) {
        event.target.classList.add("active");
    }
}

/* ==========================================================================
   2. Universal Omni-Export Engine (Print, PDF, JPG, PNG & Share)
   ========================================================================== */

function exportToolContent(contentElementId, actionType = 'print', title = 'OmniKitHub Document') {
    const element = document.getElementById(contentElementId);
    if (!element) {
        alert("কন্টেন্ট পাওয়া যায়নি!");
        return;
    }

    let rawContent = element.value !== undefined ? element.value : element.innerHTML;

    if (!rawContent.trim()) {
        alert("অ্যাকশন করার জন্য কোনো টেক্সট বা ডেটা নেই!");
        return;
    }

    // A4 পেজ ও প্যারাগ্রাফ অনুযায়ী স্মার্ট টেক্সট ফরম্যাটিং (অটো পেজ ব্রেক)
    let paragraphs = rawContent.split(/\r?\n\r?\n/);
    let formattedHTML = paragraphs.map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');

    // যদি ব্যবহারকারী শেয়ার করতে চায়
    if (actionType === 'share') {
        if (navigator.share) {
            navigator.share({
                title: title,
                text: rawContent,
                url: window.location.href
            }).catch(() => {});
        } else {
            navigator.clipboard.writeText(rawContent);
            alert("টেক্সট ক্লিপবোর্ডে কপি হয়ে গেছে!");
        }
        return;
    }

    // নতুন প্রিন্ট ও এক্সপোর্ট উইন্ডো তৈরি
    const exportWindow = window.open('', '', 'height=800,width=1000');

    exportWindow.document.write(`
        <!DOCTYPE html>
        <html lang="bn">
        <head>
            <meta charset="UTF-8">
            <title>${title}</title>
            <!-- Image Conversion Library (html2canvas) -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"><\/script>
            <style>
                @page {
                    size: A4 portrait;
                    margin: 20mm 15mm 20mm 15mm;
                }
                
                html, body {
                    width: 210mm;
                    background-color: #ffffff;
                    color: #111111;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    line-height: 1.6;
                    font-size: 12pt;
                    margin: 0;
                    padding: 0;
                }

                .export-page {
                    width: 100%;
                    box-sizing: border-box;
                    padding: 10mm;
                    background: #ffffff;
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
                    font-size: 15pt;
                    margin: 0;
                    color: #000000;
                }

                .content {
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                    text-align: justify;
                }

                p {
                    margin-bottom: 14px;
                    page-break-inside: avoid;
                    break-inside: avoid;
                    orphans: 3;
                    widows: 3;
                }

                .action-bar {
                    margin-top: 20px;
                    text-align: center;
                }

                .action-bar button {
                    padding: 10px 20px;
                    margin: 0 5px;
                    background: #007bff;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 11pt;
                }
                .action-bar button:hover {
                    background: #0056b3;
                }

                @media print {
                    .action-bar { display: none; }
                    body { -webkit-print-color-adjust: exact; }
                }
            </style>
        </head>
        <body>
            <div class="export-page" id="captureArea">
                <div class="header">
                    <h1>${title}</h1>
                    <span style="font-size: 10pt; color: #555555;">OmniKitHub.com</span>
                </div>
                <div class="content">
                    ${formattedHTML}
                </div>
            </div>

            <div class="action-bar">
                <button onclick="window.print()">🖨️ Print / Save PDF</button>
                <button onclick="downloadImage('png')">📥 Download PNG</button>
                <button onclick="downloadImage('jpg')">📥 Download JPG</button>
                <button onclick="window.close()">❌ Close</button>
            </div>

            <script>
                function downloadImage(type) {
                    const captureElement = document.getElementById('captureArea');
                    html2canvas(captureElement, { scale: 2 }).then(canvas => {
                        const link = document.createElement('a');
                        link.download = '${title.toLowerCase().replace(/\\s+/g, '_')}.' + type;
                        link.href = canvas.toDataURL('image/' + (type === 'jpg' ? 'jpeg' : 'png'));
                        link.click();
                    });
                }

                window.onload = function() {
                    if ('${actionType}' === 'print') {
                        setTimeout(() => { window.print(); }, 500);
                    }
                }
            <\/script>
        </body>
        </html>
    `);

    exportWindow.document.close();
    exportWindow.focus();
}

/* ==========================================================================
   3. Auto-Injection Engine: Automatically injects buttons & binds actions
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    // ওয়েবসাইট লোড হওয়ার সাথে সাথে ইনপুট বক্স খুঁজে বের করা
    const targetInput = document.getElementById("user-input") || document.querySelector("textarea") || document.querySelector(".tool-output");

    if (targetInput && !document.querySelector(".omnikit-auto-buttons")) {
        // নতুন ৪টি বাটন ধারণকারী কন্টেইনার জেনারেট করা
        const buttonContainer = document.createElement("div");
        buttonContainer.className = "omnikit-auto-buttons";
        buttonContainer.style.cssText = "margin-top: 15px; display: flex; gap: 10px; flex-wrap: wrap;";

        buttonContainer.innerHTML = `
            <button class="print-btn" style="padding: 9px 16px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: 500;">🖨️ Print / PDF</button>
            <button class="png-btn" style="padding: 9px 16px; background: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: 500;">🖼️ Download PNG</button>
            <button class="jpg-btn" style="padding: 9px 16px; background: #ffc107; color: black; border: none; border-radius: 5px; cursor: pointer; font-weight: 500;">📷 Download JPG</button>
            <button class="share-btn" style="padding: 9px 16px; background: #17a2b8; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500;">🔗 Share</button>
        `;

        // বাটনগুলো ইনপুট বক্সের নিচে অটোমেটিক যুক্ত করা
        targetInput.parentNode.insertBefore(buttonContainer, targetInput.nextSibling);
    }

    // গ্লোবাল ক্লিক ইভেন্ট হ্যান্ডলার
    document.body.addEventListener("click", (e) => {
        const title = document.title || "OmniKitHub Document";
        const targetId = targetInput ? targetInput.id || "user-input" : "user-input";

        if (e.target.classList.contains("print-btn")) {
            exportToolContent(targetId, 'print', title);
        } else if (e.target.classList.contains("png-btn")) {
            exportToolContent(targetId, 'png', title);
        } else if (e.target.classList.contains("jpg-btn")) {
            exportToolContent(targetId, 'jpg', title);
        } else if (e.target.classList.contains("share-btn")) {
            exportToolContent(targetId, 'share', title);
        }
    });
});
 
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
