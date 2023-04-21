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


$('#modalidade-select').on('change', function (e) {
    e.preventDefault()
    var Idmodalidade = $('#modalidade-select').val()
    $('#select-time').empty()
    $.ajax({
        type: 'GET',
        url: `https://interclasse.azurewebsites.net/api/v1/times/modalidade/${Idmodalidade}`,
        dataType: 'json',
        success: times => {
            times.forEach(time => {
               
                $('#select-time').append($('<option>', {
                    value: time.id,
                    text: time.nome
                }));
            });
        },
        error: e => {
            Swal.fire(
                'Vazio!',
                'Não há nenhum time registrado para esta modalidade',
                'error'
              )
        }
    })

})


function clearInputs(){
    $('#modalidade-select').val('')
    $('#select-time').val('')
}


$('#form-champion').on('submit', (e) => {
    e.preventDefault()
    
    idTime = $('#select-time').val()
    modalidadeId = $('#modalidade-select').val()
    if (idTime == '' || modalidadeId == '') {
        Swal.fire(
            'Valores inválidos',
            'Preencha todos os campos, para adicionar um campeão',
            'error'
          )
    } else{
        $.ajax({
            type: 'POST',
            url: 'https://interclasse.azurewebsites.net/api/v1/campeao',
            data : `{ "time":"${idTime}","modalidade_id":"${modalidadeId}" }`,
            contentType: "application/json",
            dataType: 'json',
            success: dados => {
                    clearInputs()
                    return Swal.fire(
                        'Adicionado',
                        `Campeão cadastrado com sucesso`,
                        'success'
                    )
            }
        })
    }
})

$(document).ready(function() {
    getModalides()    
});