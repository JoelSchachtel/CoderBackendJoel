const socketClient = io()

const formInputs = document.getElementById('form-inputs')
const ftitle = document.getElementById('inputTitle')
const fdescrip = document.getElementById('inputDescrip')
const fprice = document.getElementById('inputPrice')
const fcode = document.getElementById('inputCode')
const fstock = document.getElementById('inputStock')


PonerDatos()

formInputs.onsubmit = (e) => {
    e.preventDefault()
    console.log(ftitle)
    console.log(fprice)
    const formProduct = {
        title: ftitle.value,
        description: fdescrip.value,
        price: fprice.value,
        thumbnail: "Without image",
        code: fcode.value,
        stock: fstock.value
    }
    socketClient.emit('EventClient:NewProduct', formProduct)
}

socketClient.on('EventServer:PorductCreated', a => {
    PonerDatos()
})

function PonerDatos() {
    let url = "http://localhost:8080/api/products"

    const info = document.getElementById('data')

    fetch(url)
        .then(response => response.json())
        .then(data => mostrarData(data))
        .catch(error => console.log(error))

    const mostrarData = (data) => {
        console.log(data)
        const ARRAY = data.AllProducts
        console.log(ARRAY)
        let body = ''
        for (let i = 0; i < ARRAY.length; i++) {
            body += `<tr>
                <td>${ARRAY[i].ID_Product}</td>
                <td>${ARRAY[i].title}</td>
                <td>${ARRAY[i].description}</td>
                <td>${ARRAY[i].price}</td>
                <td>${ARRAY[i].thumbnail}</td>
                <td>${ARRAY[i].code}</td>
                <td>${ARRAY[i].stock}</td>
            </tr>`
        }
        info.innerHTML = body
    }
}