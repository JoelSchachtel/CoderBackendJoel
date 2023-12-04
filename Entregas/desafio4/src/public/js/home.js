let url = "http://localhost:8080/api/products"

const info = document.getElementById("data")

fetch(url)
    .then(response => response.json())
    .then(data => { mostrarData(data) })
    .catch(error => console.log(error))

const mostrarData = (data) => {
    console.log(data)
    const ARRAY = data.AllProducts
    console.log(ARRAY)
    let body = ""
    for (let i = 0; i < ARRAY.length; i++) {
        body += 
        `<tr>
        <td>${ARRAY[i].ID_Product}</td>
        <td>${ARRAY[i].title}</td>
        <td>${ARRAY[i].description}</td>
        <td>${ARRAY[i].price}</td>
        <td>${ARRAY[i].thumbnail}</td>
        <td>${ARRAY[i].code}</td>
        <td>${ARRAY[i].stock}</td>
        </tr>`
    }
}