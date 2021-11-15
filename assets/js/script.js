//Conexão com a API
function toDoGet(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}
const data = toDoGet("https://api.adsim.co/crm/api/v1/refrigerante/listar")
let stock = JSON.parse(data)
/*---------------------------------*/

//Carregamento da lista de refrigerante no select
let index = -1
let output = `<option class="opt1" data-key="${index}">Selecione um refrigerante</option>`
for( let soda of stock){
    index++
    output += `<option class="opt2" data-key="${index}">${soda.marca}/${soda.sabor} ${soda.quantidade}</option>`
}
document.querySelector('#line1').innerHTML = output
/*---------------------------------*/

//Função que imprime o preço do 1º item selecionado
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
    document.querySelector('#price1').setAttribute('data-und', p)
    document.querySelector('#price1').value = p.toLocaleString('pt-BR', {style: 'currency', currency:'BRL'})
}
/*---------------------------------*/

//Função responsável por multiplicar a quantidade pelo valor do item da 1ª linha
function listQuant1(stock) {
    let id = document.querySelector('#line1')
    let option = id.options[id.selectedIndex]
    let key = Number(option.getAttribute('data-key'))
    let qt = document.querySelector('#quant1').value
    let total = ''
    if(key != -1){
        total = stock[key].valor * qt
        document.querySelector('#totalItem1').value = total.toLocaleString('pt-BR', {style: 'currency', currency:'BRL'})
        document.querySelector('#totalItem1').setAttribute('data-val', total)
    }        
}
/*---------------------------------*/

let product = []

//Função responsável pela validação de preenchimento dos campos do catálogo
function prodVerification () {
    let flag = 0
    let id = document.querySelector('#line1')
    let option = id.options[id.selectedIndex]
    let qt = document.querySelector('#quant1').value
    if(option.classList.contains('opt1') && qt < 1){
        flag = 1
    } else if (option.classList.contains('opt1')){
        flag = 2
    } else if (qt < 1){
        flag = 3
    }
    return flag
}
/*---------------------------------*/

//Função responsável por receber cada produto adicionado no carrinho de compras
function addProd(product){
    //Verificação com prodVerification e seus devidos alerts
    if(prodVerification() == 1){
        alert('Selecione um refrigerante e a quantidade para prosseguir')
    } else if (prodVerification() == 2){
        alert('Selecione um refrigerante para prosseguir')
    } else if (prodVerification() == 3){
        alert('Selecione a quantidade para prosseguir')
    } else{
    /*---------------------------------*/

        //Captura dos valores que foram preenchidos no catálogo e adicionados ao array product
        let tbody = document.querySelector('#tbody')
        tbody.innerText = ''
        let item = product.length + 1
        let prod = document.querySelector('#line1').value
        let quant = Number(document.querySelector('#quant1').value)
        let price = Number(document.querySelector('#price1').getAttribute('data-und'))
        let total = Number(document.querySelector('#totalItem1').getAttribute('data-val'))
        product.push({id: item, marcaSabor: prod, quantidade: quant, valor: price, total: total})
        /*---------------------------------*/
        
        //Criação da tabela com os produtos adicionados ao carrinho
        for(let i of product){
            let tr = tbody.insertRow()
            tr.setAttribute('data-id', i.id)
            tr.id = `item${i.id}`
            let tdItem = tr.insertCell()
            let tdProd = tr.insertCell()
            let tdQuant = tr.insertCell()
            let tdPreco = tr.insertCell()
            let tdTotal = tr.insertCell()
            let tdImg = tr.insertCell()
            /*---------------------------------*/

            //Impressão da tabela de produtos no carrinho de compras
            tdItem.innerText = i.id
            tdProd.innerText = i.marcaSabor
            tdQuant.innerText = i.quantidade
            tdPreco.innerText = i.valor.toLocaleString('pt-BR', {style: 'currency', currency:'BRL'})
            tdTotal.innerText = i.total.toLocaleString('pt-BR', {style: 'currency', currency:'BRL'})
            /*---------------------------------*/

            //Adição do botão excluir para cada linha da tabela
            let img = document.createElement('img')
            img.src = 'assets/images/delet.png'
            img.className = 'btnDel'
            img.setAttribute('onclick', `delRow(product, ${i.id})`)
            tdImg.appendChild(img)
            /*---------------------------------*/

            //Zerador do catálogo para a adição de novos produtos
            document.querySelector('#line1').innerHTML = output
            document.querySelector('#quant1').value = ''
            document.querySelector('#price1').value = ''
            document.querySelector('#totalItem1').value = ''
            /*---------------------------------*/
        }

        ended()
        return product
    }
}

//Função responsável por excluir um item específico do carrinho de compras
function delRow(product, item){
    let newT = 0
    let index = 0
    document.querySelector(`#item${item}`).remove()
    for(let i = 0; i < product.length; i++){
        if(product[i].id == item){
            product.splice(i,1)
        }
    }
    for(let i2 = 0; i2 < product.length; i2++){
        newT += product[i2].total
    }
    document.querySelector('#priceTotal').setAttribute('data-val', newT)
    document.querySelector('#priceTotal').value = newT.toLocaleString('pt-BR', {style: 'currency', currency:'BRL'})
    return product
}

//Função que adiciona e atualiza o valor do campo Total de Compras
function ended() {
    let finish = 0
    finish += Number(document.querySelector('#totalItem1').getAttribute('data-val'))
    finish += Number(document.querySelector('#priceTotal').getAttribute('data-val'))
    document.querySelector('#priceTotal').setAttribute('data-val', finish)
    document.querySelector('#priceTotal').value = finish.toLocaleString('pt-BR', {style: 'currency', currency:'BRL'})
}
/*---------------------------------*/
