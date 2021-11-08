function toDoGet(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}
const data = toDoGet("https://api.adsim.co/crm/api/v1/refrigerante/listar")
let stock = JSON.parse(data)
let index = -1
let output = `<option class="opt1" data-key="${index}">Selecione um refrigerante</option>`
for( let soda of stock){
    index++
    output += `<option class="opt2" data-key="${index}">${soda.marca}/${soda.sabor} ${soda.quantidade}</option>`
}
document.querySelector('#line1').innerHTML = output

function listPrice1(stock) {
    //Área da função responsável por zerar todos os campos da 1ª linha caso o usuário altere o item escolhido
    let p = 0
    document.querySelector('#quant1').value = ''
    document.querySelector('#price1').value = p.toLocaleString('pt-BR', {style: 'currency', currency:'BRL'})
    document.querySelector('#totalItem1').value = ''
    document.querySelector('#totalItem1').setAttribute('data-val', 0)
    /*---------------------------------*/
    let id = document.querySelector('#line1')
    let option = id.options[id.selectedIndex]
    let key = Number(option.getAttribute('data-key'))
    if(key != -1){
        p = stock[key].valor   
    }
    document.querySelector('#price1').value = p.toLocaleString('pt-BR', {style: 'currency', currency:'BRL'})
}
/*---------------------------------*/

//Função responsável por multiplicar a quantidade pelo valor do item da 1ª linha
function listQuant1(stock) {
    let id = document.querySelector('#line1')
    let option = id.options[id.selectedIndex]
    //Verifica se usuário digitou a quantidade sem escolher o item
    if(option.classList.contains('opt1')){
        alert('Selecione um refrigerante')
        document.querySelector('#quant1').value = ''
    /*---------------------------------*/
    } else {
        let key = Number(option.getAttribute('data-key'))
        let qt = document.querySelector('#quant1').value
        let total = stock[key].valor * qt
        //Verifica se o usuário inseriu número negativo ou zero
        if(qt < 1){
            alert('Adicione a quantidade')
            document.querySelector('#quant1').value = ''
        /*---------------------------------*/
        } else {
            //impressão do total da linha 1
            document.querySelector('#totalItem1').value = total.toLocaleString('pt-BR', {style: 'currency', currency:'BRL'})
            document.querySelector('#totalItem1').setAttribute('data-val', total)
            /*---------------------------------*/
        }
    }  
}

let product = []

//Função responsável por receber cada produto adicionado no carrinho de compras
function addProd(product){
    let tbody = document.querySelector('#tbody')
    tbody.innerText = ''
    let item = product.length + 1
    console.log(item)
    let prod = document.querySelector('#line1').value
    let quant = document.querySelector('#quant1').value
    let price = document.querySelector('#price1').value
    let total = document.querySelector('#totalItem1').value
    
    product.push({id: item, marcaSabor: prod, quantidade: quant, valor: price, total: total})
    console.log(product)

    for(let i of product){
        let tr = tbody.insertRow()
        let tdItem = tr.insertCell()
        let tdProd = tr.insertCell()
        let tdQuant = tr.insertCell()
        let tdPreco = tr.insertCell()
        let tdTotal = tr.insertCell()
        let tdImg = tr.insertCell()
        tdItem.innerText = i.id
        tdProd.innerText = i.marcaSabor
        tdQuant.innerText = i.quantidade
        tdPreco.innerText = i.valor
        tdTotal.innerText = i.total
        let img = document.createElement('img')
        img.src = 'assets/images/delet.png'
        img.setAttribute('onclick', `delet(product, ${item})`)
        tdImg.appendChild(img)
        item++
    }

    return product
}

//Função responsável por excluir um item específico do carrinho de compras
// IMCOMPLETA"!!!
/*function delet(product, item){
    for(let i = 0; i < product.length; i++){
        if(product[i].id == item){
            product.splice(i, 1)
        }
    }
    console.log(product)
}*/

//Função que adiciona e atualiza o valor do campo Total de Compras
function ended() {
    let finish = 0
    finish += Number(document.querySelector('#totalItem1').getAttribute('data-val'))
    finish += Number(document.querySelector('#priceTotal').value)
    document.querySelector('#priceTotal').value = finish
    return finish
}

