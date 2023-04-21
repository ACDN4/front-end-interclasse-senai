let contador = 4
let atletas_global = ''


function getModalides() {
    $.ajax({
        type: 'GET',
        url: `https://interclasse.azurewebsites.net/api/v1/modalidades/`,
        dataType: 'json',
        success: modalidades => {

            modalidades.forEach(modalidade => {
                $('#modalidade-select').append($('<option>', {
                    value: modalidade.id,
                    text: modalidade.nome
                }));
            });
        },
        error: e => {
            Swal.fire(
                'Erro de conexão!',
                'Desculpe, mas não conseguimos nos conectar ao servidor, tente novamente mais tarde',
                'error'
            )
        }
    })
}

function clearInputs() {
    selects = $('.select-player')

    for (var i = 0; i < selects.length; i++) {
        $(`#select-player${i + 1}`).val('')
        $(`#select-player${i + 1}`).empty()
    }

    
}

function getPlayers() {
    selects = $('.select-player')
    for (var i = 0; i < selects.length; i++) {
        $(`#select-player${i + 1}`).append($('<option>', {
            value: '',
            text: ''
        }));
    }
    atletas_global.forEach(atleta => {
        for (var i = 0; i < selects.length; i++) {
            $(`#select-player${i + 1}`).append($('<option>', {
                value: atleta.id,
                text: atleta.nome
            }));
        }
    })

}

function add_input() {
    if (contador <= 10) {

        jogador_input = `
        <div class="bloco">
            <h1>Jogador 0${contador}</h1>
            <label for="select-grouped"></label>
            <select id="select-player${contador}" class="select-player" name="select-grouped">
                <option value="0"></option>
                </select>
        </div>`

        contador++
        $('#inputs').append(jogador_input)
        getPlayers()
    } else {
        return Swal.fire(
            'limite atingido!',
            'Os times só podem ter 10 jogadores no máximo',
            'error'
        )
    }
}

$('#add-input').on('click', e => {
    e.preventDefault()
    add_input()
})

$('#modalidade-select').on('change', function (e) {
    e.preventDefault()
    var Idmodalidade = $('#modalidade-select').val()
    atletas_global = ''
    clearInputs()
    $.ajax({
        type: 'GET',
        url: `https://interclasse.azurewebsites.net/api/v1/atletas/modalidade/${Idmodalidade}`,
        dataType: 'json',
        success: atletas => {
            atletas_global = atletas
            getPlayers()

        },
        error: e => {
            console.log('Nenhum atleta cadastrado nessa modalidade')
        }
    })



})


$('#form-cad-time').on('submit', (e) => {
    e.preventDefault()
    nomeTime = $('#team-name').val()
    modalidadeId = $('#modalidade-select').val()
    jogador1 = $('#select-player1').val() != undefined ? $('#select-player1').val() : 0
    jogador2 = $('#select-player2').val() != '' ? $('#select-player2').val() : 0
    jogador3 = $('#select-player3').val() != '' ? $('#select-player3').val() : 0
    jogador4 = $('#select-player4').val() != undefined ? $('#select-player4').val() : 0
    jogador5 = $('#select-player5').val() != undefined ? $('#select-player5').val() : 0
    jogador6 = $('#select-player6').val() != undefined ? $('#select-player6').val() : 0
    jogador7 = $('#select-player7').val() != undefined ? $('#select-player7').val() : 0
    jogador8 = $('#select-player8').val() != undefined ? $('#select-player8').val() : 0
    jogador9 = $('#select-player9').val() != undefined ? $('#select-player9').val() : 0
    jogador10 = $('#select-player10').val() != undefined ? $('#select-player10').val() : 0

    if (nomeTime == '' || modalidadeId == '' || jogador1 == '') {
        Swal.fire(
            'Valores inválidos',
            'Para registrar um time é necessário ter um nome, a modalidade e pelo menos um jogador',
            'error'
        )
    } else {
        $.ajax({
            type: 'POST',
            url: 'https://interclasse.azurewebsites.net/api/v1/times',
            data: `{
                "pontos":"0", 
                "nome":"${nomeTime}",
                "modalidade_id":"${modalidadeId}",
                "jogador1":"${jogador1}",
                "jogador2":"${jogador2}",
                "jogador3":"${jogador3}",
                "jogador4":"${jogador4}",
                "jogador5":"${jogador5}",
                "jogador6":"${jogador6}",
                "jogador7":"${jogador7}",
                "jogador8":"${jogador8}",
                "jogador9":"${jogador9}",
                "jogador10":"${jogador10}"
            }`,
            contentType: "application/json",
            dataType: 'json',
            success: dados => {
                $('#team-name').val('')
                $('#modalidade-select').val('')
                clearInputs()
                return Swal.fire(
                    'Adicionado',
                    `Time cadastrado com sucesso`,
                    'success'

                )
            }
        })

    }
})

getModalides()