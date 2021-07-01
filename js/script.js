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

    gravar(item) {
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(item))

        localStorage.setItem('id', id)
    }

    recuperarDados() {
        let lembretes = Array()
        let id = localStorage.getItem('id')

        for (let i = 1; i <= id; i++) {
            let lembrete = JSON.parse(localStorage.getItem(i))

            if (lembrete === null)
                continue

            lembrete.id = i
            lembretes.push(lembrete)
        }

        return lembretes
    }

    remover(id) {
        localStorage.removeItem(id)
    }
}

let bd = new Bd()

class Card {
    constructor(assunto, descricao, data) {
        this.assunto = assunto
        this.descricao = descricao
        this.data = data
    }

    criarDOM(id, data) {
        let dataObj = formatarData(data)
        let divExterna = document.createElement('div')
        divExterna.className = 'card border-dark col-12 col-lg-5 mb-2 me-2'
        let cardHeader = document.createElement('div')
        cardHeader.className = 'card-header d-flex justify-content-between align-items-center bg-warning border-dark'
        let cardBody = document.createElement('div')
        cardBody.className = 'card-body'
        let cardFooter = document.createElement('div')
        cardFooter.className = 'card-footer border-dark text-muted'
        let cardTitle = document.createElement('h3')
        cardTitle.className = 'card-title display-6 fs-4'
        cardTitle.innerHTML = this.assunto
        let cardText = document.createElement('h4')
        cardText.className = 'card-text fs-5'
        cardText.innerHTML = this.descricao
        let cardDate = document.createElement('h4')
        cardDate.className = 'fs-6 card-text'
        cardDate.innerHTML = `${dataObj.dia}/${dataObj.mes}/${dataObj.ano} - ${dataObj.diaSemana}`
        let btn = document.createElement('BUTTON')
        btn.id = `lembrete_id_${id}`
        btn.className = 'btn btn-sm btn-danger text-dark border-dark'
        btn.innerHTML = '<i class="bi bi-x-circle"></i>'
        btn.onclick = function () {
            let id = this.id.replace('lembrete_id_', '')
            bd.remover(id)
            window.location.reload()
        }

        divExterna.appendChild(cardHeader)
        divExterna.appendChild(cardBody)
        divExterna.appendChild(cardFooter)
        cardHeader.appendChild(cardTitle)
        cardHeader.appendChild(btn)
        cardBody.appendChild(cardText)
        cardFooter.appendChild(cardDate)
        let mural = document.getElementById('mural')
        mural.appendChild(divExterna)
    }

    validarDados() {
        for (let i in this) {
            if (this[i] == undefined || this[i] == '' || this[i] == null)
                return false
        }
        return true
    }
}

function cadastrar() {
    let assunto = document.getElementById('addModal_assunto')
    let descricao = document.getElementById('addModal_descricao')
    let data = document.getElementById('addModal_data')
    let statusModal = new bootstrap.Modal(document.getElementById('statusModal'))
    let addModal = new bootstrap.Modal(document.getElementById('addModal'))
    console.log(data.value)

    let lembrete = new Card(assunto.value, descricao.value, data.value.replaceAll('-', ','))

    if (lembrete.validarDados()) {
        document.getElementById('statusModal_titulo').innerHTML = 'Lembrete salvo com sucesso!'
        document.getElementById('statusModal_btn').innerHTML = 'Adicionar mais'
        document.getElementById('statusModal_btn').className = 'btn btn-success border-dark'
        document.getElementById('statusModal_header').className = 'modal-header bg-success border-dark'
        bd.gravar(lembrete)
        assunto.value = ''
        descricao.value = ''
    } else {
        document.getElementById('statusModal_titulo').innerHTML = 'Erro! Preencha todos os campos.'
        document.getElementById('statusModal_btn').innerHTML = 'Voltar e Corrigir'
        document.getElementById('statusModal_btn').className = 'btn btn-danger border-dark'
        document.getElementById('statusModal_header').className = 'modal-header bg-danger border-dark'
    }

    statusModal.show()
    carregarLembretes()
}

function carregarLembretes() {
    let mural = document.getElementById('mural')
    mural.innerHTML = ''
    let lembretes = Array()
    lembretes = bd.recuperarDados()
    lembretes.forEach(l => {
        let lembrete = new Card(l.assunto, l.descricao, l.data)
        lembrete.criarDOM(l.id, l.data);
    })
}

function formatarData(d) {
    let data = new Date(d)
    let dia = data.getDate()
    let mes = data.getMonth()
    mes+=1
    let ano = data.getFullYear()
    let diaSemana = data.getDay()

    switch(diaSemana) {
        case 0:
            diaSemana = 'Domingo'
            break
        case 1:
            diaSemana = 'Segunda'
            break
        case 2:
            diaSemana = 'Terça'
            break
        case 3:
            diaSemana = 'Quarta'
            break
        case 4:
            diaSemana = 'Quinta'
            break
        case 5:
            diaSemana = 'Sexta'
            break
        case 6:
            diaSemana = 'Sábado'
            break
    }

    return {dia, mes, ano, diaSemana}
}