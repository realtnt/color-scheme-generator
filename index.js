const colorModeSelect = document.getElementById("color-mode")
const colorSchemeBtn = document.getElementById("color-btn")
const colorPicker = document.getElementById("color-picker")
const mainEl = document.querySelector("main")
const footerEl = document.querySelector("footer")
const snackbar = document.getElementById("snackbar")
const baseUrl = "https://www.thecolorapi.com/scheme"

randomColor = Math.floor(Math.random() * 16777215)
colorPicker.value = '#' + randomColor.toString(16)
getColors()

colorSchemeBtn.addEventListener("click", () => {
    getColors()
})

function getColors() {
    fetch(`${baseUrl}?hex=${colorPicker.value.slice(1)}&${colorModeSelect.value}`)
        .then(res => res.json())
        .then(data => renderColors(data.colors))
}

function renderColors(colorsArray) {
    mainEl.innerHTML = colorsArray.map(color => {
        return `
            <div 
                onclick="copyToClipboard('${color.hex.value}')"
                class="colors" 
                style="background-color: ${color.hex.value}">
                <div class="color-name">${color.name.value}</div>
            </div>
        `
    }).join('')

    footerEl.innerHTML = colorsArray.map(color => {
        return `
            <p 
                onclick="copyToClipboard('${color.hex.value}')"
                class="color-hex">
                ${color.hex.value}
            </p>
        `
    }).join('')
}

function copyToClipboard(str) {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(str)
            .then(() => {
                snackbar.className = "show"
                setTimeout(() => snackbar.className = "", 2900)
            }, error => { deprecatedCopyToClipboard(str) })
    } else { // Clipboard API not supported
        deprecatedCopyToClipboard(str)
    }
}

function deprecatedCopyToClipboard(str) {
    const area = document.createElement('textarea')
    document.body.appendChild(area)
    area.value = str
    area.select()
    document.execCommand('copy')
    document.body.removeChild(area)
    snackbar.className = "show"
    setTimeout(() => snackbar.className = "", 2900)
}