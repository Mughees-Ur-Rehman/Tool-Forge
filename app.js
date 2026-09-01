// ===============================
// TOOLFORGE JAVASCRIPT
// ===============================


// THEME SWITCHER

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeBtn.textContent = "☀";
        localStorage.setItem("theme", "dark");
    } else {
        themeBtn.textContent = "☾";
        localStorage.setItem("theme", "light");
    }

});


// LOAD SAVED THEME

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀";
}


// MOBILE MENU

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {

    if (navLinks.style.display === "flex") {
        navLinks.style.display = "none";
    } else {
        navLinks.style.display = "flex";
        navLinks.style.position = "absolute";
        navLinks.style.top = "65px";
        navLinks.style.left = "0";
        navLinks.style.right = "0";
        navLinks.style.padding = "20px";
        navLinks.style.background = "white";
        navLinks.style.flexDirection = "column";
        navLinks.style.margin = "0";
        navLinks.style.gap = "18px";
    }

});


// SEARCH SYSTEM

const searchInput = document.getElementById("searchInput");
const tools = document.querySelectorAll(".tool-card");
const noResults = document.getElementById("noResults");

function searchTools() {

    const query = searchInput.value.toLowerCase().trim();

    let found = 0;

    tools.forEach(tool => {

        const name = tool.dataset.name.toLowerCase();
        const category = tool.dataset.category.toLowerCase();

        if (
            name.includes(query) ||
            category.includes(query)
        ) {
            tool.style.display = "block";
            found++;
        } else {
            tool.style.display = "none";
        }

    });

    if (found === 0) {
        noResults.style.display = "block";
    } else {
        noResults.style.display = "none";
    }

}

searchInput.addEventListener("input", searchTools);

document.getElementById("searchBtn").addEventListener("click", searchTools);


// CATEGORY FILTER

const categoryCards = document.querySelectorAll(".category-card");

categoryCards.forEach(card => {

    card.addEventListener("click", () => {

        const category = card.dataset.category.toLowerCase();

        document.getElementById("popular").scrollIntoView({
            behavior: "smooth"
        });

        let found = 0;

        tools.forEach(tool => {

            if (
                tool.dataset.category.toLowerCase() === category
            ) {
                tool.style.display = "block";
                found++;
            } else {
                tool.style.display = "none";
            }

        });

        noResults.style.display =
            found === 0 ? "block" : "none";

    });

});


// TOOL MODAL

const modal = document.getElementById("toolModal");
const closeModal = document.getElementById("closeModal");
const toolContent = document.getElementById("toolContent");

function openTool(tool) {

    modal.classList.add("active");

    if (tool === "wordCounter") {
        showWordCounter();
    }

    if (tool === "password") {
        showPasswordGenerator();
    }

    if (tool === "qr") {
        showQRGenerator();
    }

    if (tool === "case") {
        showCaseConverter();
    }

    if (tool === "url") {
        showURLTool();
    }

    if (tool === "meta") {
        showMetaGenerator();
    }

}


closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
});


modal.addEventListener("click", (e) => {

    if (e.target === modal) {
        modal.classList.remove("active");
    }

});


// WORD COUNTER

function showWordCounter() {

    toolContent.innerHTML = `

        <div class="tool-interface">

            <h2>Word Counter</h2>

            <p>
                Count words, characters and sentences in your text.
            </p>

            <textarea
                id="wordText"
                rows="10"
                placeholder="Type or paste your text here..."
            ></textarea>

            <button class="tool-btn" onclick="countWords()">
                Count Words
            </button>

            <div class="result-box" id="wordResult">
                Start typing to analyze your text.
            </div>

        </div>
    `;
}


function countWords() {

    const text = document.getElementById("wordText").value.trim();

    const words = text
        ? text.split(/\s+/).length
        : 0;

    const characters = text.length;

    const sentences = text
        ? text.split(/[.!?]+/)
            .filter(sentence => sentence.trim().length > 0)
            .length
        : 0;

    document.getElementById("wordResult").innerHTML = `

        <strong>Words:</strong> ${words}<br>
        <strong>Characters:</strong> ${characters}<br>
        <strong>Sentences:</strong> ${sentences}

    `;
}


// PASSWORD GENERATOR

function showPasswordGenerator() {

    toolContent.innerHTML = `

        <div class="tool-interface">

            <h2>Password Generator</h2>

            <p>Create a strong random password.</p>

            <input
                type="number"
                id="passwordLength"
                value="16"
                min="6"
                max="50"
                placeholder="Password length"
            >

            <button class="tool-btn" onclick="generatePassword()">
                Generate Password
            </button>

            <div class="result-box" id="passwordResult">
                Your password will appear here.
            </div>

        </div>

    `;
}


function generatePassword() {

    const length = parseInt(
        document.getElementById("passwordLength").value
    );

    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
        "abcdefghijklmnopqrstuvwxyz" +
        "0123456789!@#$%^&*()_+-=[]{}";

    let password = "";

    for (let i = 0; i < length; i++) {

        password += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );

    }

    document.getElementById("passwordResult").innerHTML = `

        <strong>${password}</strong>

        <br><br>

        <button class="tool-btn"
            onclick="copyText('${password}')">
            Copy Password
        </button>

    `;

}


// QR CODE GENERATOR

function showQRGenerator() {

    toolContent.innerHTML = `

        <div class="tool-interface">

            <h2>QR Code Generator</h2>

            <p>Create a QR code from any text or URL.</p>

            <input
                type="text"
                id="qrText"
                placeholder="Enter text or website URL..."
            >

            <button class="tool-btn" onclick="generateQR()">
                Generate QR Code
            </button>

            <div class="result-box" id="qrResult">
                Your QR code will appear here.
            </div>

        </div>

    `;

}


function generateQR() {

    const text = document.getElementById("qrText").value.trim();

    if (!text) {
        alert("Please enter text or URL.");
        return;
    }

    const qrURL =
        "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data="
        + encodeURIComponent(text);

    document.getElementById("qrResult").innerHTML = `

        <img
            src="${qrURL}"
            alt="Generated QR Code"
            width="250"
            height="250"
        >

        <br><br>

        <a
            href="${qrURL}"
            target="_blank"
            class="tool-btn"
            style="display:inline-block;"
        >
            Open QR Code
        </a>

    `;

}


// TEXT CASE CONVERTER

function showCaseConverter() {

    toolContent.innerHTML = `

        <div class="tool-interface">

            <h2>Text Case Converter</h2>

            <p>Convert your text into different cases.</p>

            <textarea
                id="caseText"
                rows="8"
                placeholder="Enter your text..."
            ></textarea>

            <button class="tool-btn"
                onclick="convertCase('upper')">
                UPPERCASE
            </button>

            <button class="tool-btn"
                onclick="convertCase('lower')">
                lowercase
            </button>

            <button class="tool-btn"
                onclick="convertCase('title')">
                Title Case
            </button>

            <div class="result-box" id="caseResult">
                Result will appear here.
            </div>

        </div>

    `;

}


function convertCase(type) {

    let text = document.getElementById("caseText").value;

    if (type === "upper") {
        text = text.toUpperCase();
    }

    if (type === "lower") {
        text = text.toLowerCase();
    }

    if (type === "title") {

        text = text.toLowerCase().replace(
            /\b\w/g,
            char => char.toUpperCase()
        );

    }

    document.getElementById("caseResult").innerHTML = `
        ${escapeHTML(text)}
        <br><br>
        <button class="tool-btn"
            onclick="copyText(caseText.value)">
            Copy
        </button>
    `;

}


// URL ENCODER / DECODER

function showURLTool() {

    toolContent.innerHTML = `

        <div class="tool-interface">

            <h2>URL Encoder / Decoder</h2>

            <p>Encode or decode a URL or text.</p>

            <textarea
                id="urlText"
                rows="7"
                placeholder="Enter URL or text..."
            ></textarea>

            <button class="tool-btn"
                onclick="encodeURL()">
                Encode
            </button>

            <button class="tool-btn"
                onclick="decodeURL()">
                Decode
            </button>

            <div class="result-box" id="urlResult">
                Result will appear here.
            </div>

        </div>

    `;

}


function encodeURL() {

    const text = document.getElementById("urlText").value;

    document.getElementById("urlResult").textContent =
        encodeURIComponent(text);

}


function decodeURL() {

    const text = document.getElementById("urlText").value;

    try {

        document.getElementById("urlResult").textContent =
            decodeURIComponent(text);

    } catch {

        document.getElementById("urlResult").textContent =
            "Invalid encoded URL.";

    }

}


// SEO META GENERATOR

function showMetaGenerator() {

    toolContent.innerHTML = `

        <div class="tool-interface">

            <h2>SEO Meta Generator</h2>

            <p>Generate basic SEO title and meta description.</p>

            <input
                id="metaTitle"
                placeholder="Enter page title..."
            >

            <textarea
                id="metaDescription"
                rows="5"
                placeholder="Enter meta description..."
            ></textarea>

            <button class="tool-btn"
                onclick="generateMeta()">
                Generate
            </button>

            <div class="result-box" id="metaResult">
                Your meta tags will appear here.
            </div>

        </div>

    `;

}


function generateMeta() {

    const title =
        document.getElementById("metaTitle").value;

    const description =
        document.getElementById("metaDescription").value;

    document.getElementById("metaResult").innerHTML = `

        &lt;title&gt;${escapeHTML(title)}&lt;/title&gt;<br><br>

        &lt;meta name="description"
        content="${escapeHTML(description)}"&gt;

        <br><br>

        <button class="tool-btn"
            onclick="copyText(
                '&lt;title&gt;${escapeHTML(title)}&lt;/title&gt;\\n' +
                '&lt;meta name=&quot;description&quot; content=&quot;${escapeHTML(description)}&quot;&gt;'
            )">
            Copy
        </button>

    `;

}


// COPY FUNCTION

function copyText(text) {

    navigator.clipboard.writeText(text)
        .then(() => {
            alert("Copied successfully!");
        })
        .catch(() => {
            alert("Could not copy text.");
        });

}


// SECURITY: ESCAPE HTML

function escapeHTML(text) {

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// ESCAPE KEY CLOSES MODAL

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        modal.classList.remove("active");
    }

});