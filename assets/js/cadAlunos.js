function getModalides() {
    $.ajax({
        type: 'GET',
        url: `http://localhost:8000/api/v1/modalidades/`,
        dataType: 'json',
        success: modalidades => {
    
            modalidades.forEach(modalidade => {
                $('#modalides-select').append($('<option>', {
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


function getCursos() {
    // curso-select
    $.ajax({
        type: 'GET',
        url: `http://localhost:8000/api/v1/cursos/`,
        dataType: 'json',
        success: cursos => {
    
            cursos.forEach(curso => {
                $('#curso-select').append($('<option>', {
                    value: curso.id,
                    text: curso.curso
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


function clearInputs(){
    $('#name').val('')
    $('#idade').val('')
    $('#modalides-select').val('')
    $('#curso-select').val('')
}



var formCadastroAluno = document.getElementById("form-cadastrar_aluno")

formCadastroAluno.addEventListener("submit", function (e) {
    e.preventDefault();
    
    var nomeAluno = $('#name').val()
    var idadeAluno = $('#idade').val()
    var modalidadeId = $('#modalides-select').val()
    var cursoId = $('#curso-select').val()

    if (nomeAluno == '' || modalidadeId == null || cursoId == null || idadeAluno == '') {
      return  Swal.fire(
            'Erro ao cadastrar!',
            'Por favor, preencha todos os campos',
            'error'
          )
    } 

    // cadastrando
    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8000/api/v1/atletas/',
        data : `{"nome":"${nomeAluno}", "idade":"${idadeAluno}", "curso_id":${cursoId}, "modalidade_id": ${modalidadeId}}`,
        contentType: "application/json",
        dataType: 'json',
        success: dados => {
                clearInputs()
                return Swal.fire(
                    'Adicionado',
                    `Jogo cadastrado com sucesso`,
                    'success'
                )
        }
    })
    
    
    
    
    
    // Swal.fire(
    //     'Sucesso',
    //     'O cadastro foi realizado!',
    //     'success'
    // ).then((result) => {
    //     if (result.isConfirmed == true) {
    //         window.location.replace("./cadastros.html");
    //     }
    // })


    })
getModalides()
getCursos()