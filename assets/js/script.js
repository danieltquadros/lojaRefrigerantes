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

//Carregamento da lista de refrigerante nos 4 selects
let index = -1
let output = `<option class="opt1" data-key="${index}">Selecione um refrigerante</option>`
for( let soda of stock){
    index++
    output += `<option class="opt2" data-key="${index}">${soda.marca}/${soda.sabor} ${soda.quantidade}</option>`
}
document.querySelector('#line1').innerHTML = output
document.querySelector('#line2').innerHTML = output
document.querySelector('#line3').innerHTML = output
document.querySelector('#line4').innerHTML = output
/*---------------------------------*/

//Função que imprime o preço do 1º item selecionado
function listPrice1(stock) {
    //Área da função responsável por zerar todos os campos da 1ª linha caso o usuário altere o item escolhido
    let p = 0
    document.querySelector('#quant1').value = ''
    document.querySelector('#price1').value = p.toLocaleString('pt-BR', {style: 'currency', currency:'BRL'})
    document.querySelector('#totalItem1').value = ''
    document.querySelector('#totalItem1').setAttribute('data-val', 0)
    document.querySelector('#totalGeral').value = ''
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
        //Verifica se o usuário inseriu número negativo
        if(qt < 0){
            alert('Adicione um valor positivo para comprar')
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
/*---------------------------------*/

//Função que imprime o preço do 2º item selecionado
function listPrice2(stock) {
    //Área da função responsável por zerar todos os campos da 2ª linha caso o usuário altere o item escolhido
    let p = 0
    document.querySelector('#quant2').value = ''
    document.querySelector('#price2').value = p.toLocaleString('pt-BR', {style: 'currency', currency:'BRL'})
    document.querySelector('#totalItem2').value = ''
    document.querySelector('#totalItem2').setAttribute('data-val', 0)
    document.querySelector('#totalGeral').value = ''
    /*---------------------------------*/
    let id = document.querySelector('#line2')
    let option = id.options[id.selectedIndex]
    let key = Number(option.getAttribute('data-key'))
    if(key != -1){
        p = stock[key].valor
    }
    document.querySelector('#price2').value = p.toLocaleString('pt-BR', {style: 'currency', currency:'BRL'})
}
/*---------------------------------*/

//Função responsável por multiplicar a quantidade pelo valor do item da 2ª linha
function listQuant2(stock) {
    let id = document.querySelector('#line2')
    let option = id.options[id.selectedIndex]
    //Verifica se usuário digitou a quantidade sem escolher o item
    if(option.classList.contains('opt1')){
        alert('Selecione um refrigerante')
        document.querySelector('#quant2').value = ''
    /*---------------------------------*/
    } else {
        let key = Number(option.getAttribute('data-key'))
        let qt = document.querySelector('#quant2').value
        let total = stock[key].valor * qt
        //Verifica se o usuário inseriu número negativo
        if(qt < 0){
            alert('Adicione um valor positivo para comprar')
            document.querySelector('#quant2').value = ''
        /*---------------------------------*/
        } else {
            //impressão do total da linha 2
            document.querySelector('#totalItem2').value = total.toLocaleString('pt-BR', {style: 'currency', currency:'BRL'})
            document.querySelector('#totalItem2').setAttribute('data-val', total)
            /*---------------------------------*/
        }
    }
}
/*---------------------------------*/

//Função que imprime o preço do 3º item selecionado
function listPrice3(stock) {
    //Área da função responsável por zerar todos os campos da 3ª linha caso o usuário altere o item escolhido
    let p = 0
    document.querySelector('#quant3').value = ''
    document.querySelector('#price3').value = p.toLocaleString('pt-BR', {style: 'currency', currency:'BRL'})
    document.querySelector('#totalItem3').value = ''
    document.querySelector('#totalItem3').setAttribute('data-val', 0)
    document.querySelector('#totalGeral').value = ''
    /*---------------------------------*/
    let id = document.querySelector('#line3')
    let option = id.options[id.selectedIndex]
    let key = Number(option.getAttribute('data-key'))
    if(key != -1){
        p = stock[key].valor
    }
    document.querySelector('#price3').value = p.toLocaleString('pt-BR', {style: 'currency', currency:'BRL'})
}
/*---------------------------------*/

//Função responsável por multiplicar a quantidade pelo valor do item da 3ª linha
function listQuant3(stock) {
    let id = document.querySelector('#line3')
    let option = id.options[id.selectedIndex]
    //Verifica se usuário digitou a quantidade sem escolher o item
    if(option.classList.contains('opt1')){
        alert('Selecione um refrigerante')
        document.querySelector('#quant3').value = ''
    /*---------------------------------*/
    } else {
        let key = Number(option.getAttribute('data-key'))
        let qt = document.querySelector('#quant3').value
        let total = stock[key].valor * qt
        //Verifica se o usuário inseriu número negativo
        if(qt < 0){
            alert('Adicione um valor positivo para comprar')
            document.querySelector('#quant3').value = ''
        /*---------------------------------*/
        } else {
            //impressão do total da linha 3
            document.querySelector('#totalItem3').value = total.toLocaleString('pt-BR', {style: 'currency', currency:'BRL'})
            document.querySelector('#totalItem3').setAttribute('data-val', total)
            /*---------------------------------*/
        }
    }
}
/*---------------------------------*/

//Função que imprime o preço do 4º item selecionado
function listPrice4(stock) {
    //Área da função responsável por zerar todos os campos da 4ª linha caso o usuário altere o item escolhido
    let p = 0
    document.querySelector('#quant4').value = ''
    document.querySelector('#price4').value = p.toLocaleString('pt-BR', {style: 'currency', currency:'BRL'})
    document.querySelector('#totalItem4').value = ''
    document.querySelector('#totalItem4').setAttribute('data-val', 0)
    document.querySelector('#totalGeral').value = ''
    /*---------------------------------*/
    let id = document.querySelector('#line4')
    let option = id.options[id.selectedIndex]
    let key = Number(option.getAttribute('data-key'))
    if(key != -1){
        p = stock[key].valor
    }
    document.querySelector('#price4').value = p.toLocaleString('pt-BR', {style: 'currency', currency:'BRL'})
}
/*---------------------------------*/

//Função responsável por multiplicar a quantidade pelo valor do item da 4ª linha
function listQuant4(stock) {
    let id = document.querySelector('#line4')
    let option = id.options[id.selectedIndex]
    //Verifica se usuário digitou a quantidade sem escolher o item
    if(option.classList.contains('opt1')){
        alert('Selecione um refrigerante')
        document.querySelector('#quant4').value = ''
    /*---------------------------------*/
    } else {
        let key = Number(option.getAttribute('data-key'))
        let qt = document.querySelector('#quant4').value
        let total = stock[key].valor * qt
        //Verifica se o usuário inseriu número negativo
        if(qt < 0){
            alert('Adicione um valor positivo para comprar')
            document.querySelector('#quant4').value = ''
        /*---------------------------------*/
        } else {
            //impressão do total da linha 4
            document.querySelector('#totalItem4').value = total.toLocaleString('pt-BR', {style: 'currency', currency:'BRL'})
            document.querySelector('#totalItem4').setAttribute('data-val', total)
            /*---------------------------------*/
        }
    }
}
/*---------------------------------*/

//Função responsável por calcular o total de todos os itens
function totalG (){
    let tt1 = Number(document.querySelector('#totalItem1').getAttribute('data-val'))
    let tt2 = Number(document.querySelector('#totalItem2').getAttribute('data-val'))
    let tt3 = Number(document.querySelector('#totalItem3').getAttribute('data-val'))
    let tt4 = Number(document.querySelector('#totalItem4').getAttribute('data-val'))
    let ttG = tt1 + tt2 + tt3 + tt4
    document.querySelector('#totalGeral').value = ttG.toLocaleString('pt-BR', {style: 'currency', currency:'BRL'})
}
/*---------------------------------*/

//Evento que faz com que o submit do formulário não aconteça já que não estamos o enviando para nenhum lugar
var formNewEvent = document.querySelector('#formSoda')
function salveNewEvent(event) {
    event.preventDefault()
}
formNewEvent.addEventListener('submit', salveNewEvent)