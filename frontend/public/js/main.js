var screen

window.addEventListener("load", (event) => {
    screen = document.querySelector("#screen")
    const btn_letters = document.querySelectorAll(".btn-letter")
    const btn_operators = document.querySelectorAll(".btn-operator")
    const btn_backspace = document.querySelector("#btn-backspace")

    addEventListenerAll(btn_letters, "click", appendSymbolToScreen)
    addEventListenerAll(btn_operators, "click", appendSymbolToScreen)
    btn_backspace.addEventListener('click', deleteAtScreenCursorPosition)
    document.addEventListener('keydown', verifyKeydown)
})

const addEventListenerAll = (nodeList, type, listener, bubble = false) => {
    nodeList.forEach(node => node.addEventListener(type, listener, bubble))
}

const appendSymbolToScreen = (event) => {
    const button = event.target
    const value = button.value
    insertAtScreenCursorPosition(value)
    event.preventDefault()
}

const verifyKeydown = (event) => {
    const whitelist_letters = ['A', 'B', 'C', 'D', 'E', 'F']
    const whitelist_symbols = ['v', '-', '<', '>', '(', ')', ' ', 'Dead']
    const whitelist_delete = ['Backspace', 'Delete']
    const whitelist_arrows = ['ArrowLeft', 'ArrowRight']

    const letter_filter = whitelist_letters.find(key => key == event.key)
    const symbol_filter = whitelist_symbols.find(key => key == event.key)
    const delete_filter = whitelist_delete.find(key => key == event.key)
    const arrows_filter = whitelist_arrows.find(key => key == event.key)

    if (!letter_filter && !symbol_filter && !delete_filter && !arrows_filter)
        event.preventDefault()
}

const insertAtScreenCursorPosition = (text) => {
    if (!text || text.length == 0 || text.trim() == "") return;
    
    const position = screen.selectionStart
    const screen_text = screen.value
    const new_text = [screen_text.slice(0, position), text, screen_text.slice(position)].join('')
    const new_screen_cursor_position = position + text.length

    updateScreen(new_text, new_screen_cursor_position, new_screen_cursor_position)
}

const deleteAtScreenCursorPosition = (event) => {
    let start = screen.selectionStart
    let end = screen.selectionEnd

    if(start == 0 && end == 0) return;
    if(start == end) start = end-1

    const screen_text = screen.value
    const new_text = [screen_text.slice(0, start), screen_text.slice(end, screen_text.length)].join('')

    updateScreen(new_text, start, start)
    event.preventDefault()
}

const updateScreen = (new_text, selectionStart, selectionEnd) => {
    screen.value = new_text
    screen.focus()
    screen.setSelectionRange(selectionStart, selectionEnd)
}

document.addEventListener("submit", async (event) => {
    event.preventDefault()

    const input = screen.value
    if (!input) return

    const data = await solve(input)
    if(data.error) {
        showMessage({type: 'error', text: data.error})
        hiddenTable()
        return;
    }
    
    const table = data.table
    showMessage({type: 'success', text: "Well-formed formula!"})
    appendTable(table)
})

const solve = async (input) => {
    const BASEURL = 'http://localhost:3000'

    try {
        const response = await fetch(`${BASEURL}/interpreter`, {
            mode: 'cors',
            method: 'POST',
            cache: 'no-cache',
            body: JSON.stringify({input}),
            headers: {
                "Accept": 'application/json',
                "Content-type": "application/json; charset=UTF-8"
            }
        })

        const data = await response.json()
        return data
    } catch(error) {
        const message = {type: "error", text: `Server not Found! (Try starting the backend app)`}
        showMessage(message)
    } 
}

const showMessage = (message) => {
    const container = document.querySelector("#container-message")
    container.setAttribute("class", `container message-${message.type}`);
    container.innerHTML = message.text
}

const appendTable = (table) => {
    const container = document.querySelector("#container-table")
    const html = generateHtmlTable(table)
    container.innerHTML = html
    container.setAttribute("class", `container`);
}

const hiddenTable = () => {
    const container = document.querySelector("#container-table")
    container.setAttribute("class", `container hidden`);
}

const generateHtmlTable = (table) => {
    let html = `<table class="table">`

    const header = table.shift()
    html += generateRowHeader(header)
    table.forEach(array => html += generateRow(array))

    html += "</table>"
    return html
}

const generateRow = (array) => {
    let row = "<tr>"
    let index = array.shift()
    row += `<td>${index}</td>`
    array.forEach(data => row += generateCol(data))
    row += "</tr>"
    return row
}

const generateRowHeader = (array) => {
    let row = `<tr class="row-header sticky">`
    array.forEach(data => row += generateColHeader(data))
    row += "</tr>"
    return row
}

const generateColHeader = (data) => {
    const headercol = `<th clas="row">${data}</th>`
    return headercol
}

const generateCol = (data) => {
    const isTruth = data == 1
    const classname = isTruth ? "true" : "false"
    const value = isTruth ? "V" : "F"
    const col = `<td class="data-${classname}">${value}</td>`
    return col
}