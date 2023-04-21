function getChampions() {

    var pFutsal = $('#campeao-futsal')
    var pVolei = $('#campeao-volei')
    var pTenis = $('#campeao-tenis')
    var pXadrez = $('#campeao-xadrez')
    var pQueimada = $('#campeao-queimada')
    var pPebolim = $('#campeao-pebolim')

    $.ajax({
        type: 'GET',
        url: `https://interclasse.azurewebsites.net/api/v1/campeao/campeao`,
        dataType: 'json',
        success: campeoes => {
    
            campeoes.forEach(campeao => {
                if (campeao.modalidade_id == 2) {
                    pFutsal.html(campeao.time_nome)
                } else if (campeao.modalidade_id == 3) {
                    pXadrez.html(campeao.time_nome)
                } else if (campeao.modalidade_id == 1) {
                    pPebolim.html(campeao.time_nome)
                } else if (campeao.modalidade_id == 4){
                    pVolei.html(campeao.time_nome)
                } else if (campeao.modalidade_id == 5) {
                    pQueimada.html(campeao.time_nome)
                } else if (campeao.modalidade_id == 6) {
                    pTenis.html(campeao.time_nome)
                } else {
                    console.log(campeao)
                }
                
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

$(document).ready(function() {
    getChampions()    
});