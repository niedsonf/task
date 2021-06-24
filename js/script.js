class Bd {
    constructor() {
        let id = localStorage.getItem('id')

        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(d) {
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)
    }
}

let bd = new Bd()

class Lembrete {
    constructor(assunto, descricao) {
        this.assunto = assunto
        this.descricao = descricao
    }

    validarDados() {
        for (let i in this) {
            if (this[i] == undefined || this[i] == '' || this[i] == null)
                return false
        }
        return true
    }
}

class Card {
    constructor(assunto, descricao) {
        this.assunto = assunto
        this.descricao = descricao
    }
    criarDOM(){
        let divExterna = document.createElement('div')
        divExterna.className = 'card col-3'
        let cardBody = document.createElement('div')
        cardBody.className = 'card-body'
        let cardTitle = document.createElement('h3')
        cardTitle.className = 'card-title'
        cardTitle.innerHTML = this.assunto
        let cardText = document.createElement('h4')
        cardText.className = 'card-text'
        cardText.innerHTML = this.descricao
        divExterna.appendChild(cardBody)
        cardBody.appendChild(cardTitle)
        cardBody.appendChild(cardText)
        let mural = document.getElementById('mural')
        mural.appendChild(divExterna)
    }
}

function cadastrar() {
    let assunto = document.getElementById('addModal_assunto')
    let descricao = document.getElementById('addModal_descricao')
    let statusModal = new bootstrap.Modal(document.getElementById('statusModal'))
    let addModal = new bootstrap.Modal(document.getElementById('addModal'))

    let lembrete = new Lembrete(assunto.value, descricao.value)

    if (lembrete.validarDados()) {
        document.getElementById('statusModal_titulo').innerHTML = 'Lembrete salvo com sucesso!'
        document.getElementById('statusModal_btn').innerHTML = 'Adicionar mais'
        bd.gravar(lembrete)
        assunto.value = ''
        descricao.value = ''
    } else {
        document.getElementById('statusModal_titulo').innerHTML = 'Erro! Preencha todos os campos.'
        document.getElementById('statusModal_btn').innerHTML = 'Voltar e Corrigir'
    }

    statusModal.show()
}

let id = JSON.parse(localStorage.getItem('1'))

let nota = new Card(id.assunto, id.descricao)
nota.criarDOM()