document.addEventListener("submit", async (event) => {
    event.preventDefault()

    const input = document.querySelector("#input").value
    if(!input) return

    const table = await solve(input)
    console.table(table)
})

const solve = async (input) => {
    const BASEURL = 'http://localhost:3000'
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
    const table = data.table
    return table
}