let timer;
let ultimaImagem;
let contador = 0
function comecar(){
    timer = setInterval(getDados,5000)
}


function preencherDados(dados) {
    $('.player--games').empty()
    $('#nome--jogador').html(dados.nome)
    proximosJogos = dados.proximos_jogos
    
    proximosJogos.forEach(jogo => {
        datajogo = String(jogo.data_do_jogo).substring(11,16)
        card = `
        <div class="card-jogo">
                    <div class="lado1">
                        <p class="title--team">${jogo.time1}</p>
                    </div>
                    <div class="vs"><span class="game--modalidade">${dados.modalidade}</span><img
                            src="../assets/imgs/versus.png" alt="Imagem de versus"><span class="game--time">${datajogo}</span>
                    </div>
                    <div class="lado2">
                        <p class="title--team">${jogo.time2}</p>
                    </div>
            </div>
        `
        $('.player--games').append(card)
    });
    
}

function getDados() {
    $.ajax({
        type: 'GET',
        url: `http://localhost:8000/api/v1/atletas/ultimapesquisa`,
        dataType: 'json',
        success: dados => {
            
            if (dados.face_url == ultimaImagem && contador != 0) {
                console.log('é a mesma a 5 segundos atrás')
            } else {
                console.log('mudou')
                preencherDados(dados)
            }
            
            if (contador == 0) {
                ultimaImagem = dados.face_url
                contador++
                preencherDados(dados)
            }

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

function parar(){
    clearInterval(timer)
}

comecar()