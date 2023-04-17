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
    $('input[name="image"]').val('')
}



var formCadastroAluno = document.getElementById("form-cadastrar_aluno")

formCadastroAluno.addEventListener("submit", async function (e) {
    e.preventDefault();
    
    var nomeAluno = $('#name').val()
    var idadeAluno = $('#idade').val()
    var modalidadeId = $('#modalides-select').val()
    var cursoId = $('#curso-select').val()
    var nomeArquivo = $('input[type="file"]')[0].files[0].name.split(".")
    
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
        data : `{"nome":"${nomeAluno}", "idade":"${idadeAluno}", "curso_id":${cursoId}, "modalidade_id": ${modalidadeId}, "face_url": "${nomeArquivo[0]}"}`,
        contentType: "application/json",
        dataType: 'json',
        success: dados => {
                
                return Swal.fire(
                    'Adicionado',
                    `Aluno cadastrado com sucesso`,
                    'success'
                )
        }
    })

    const formData = new FormData();
    const imageInput = document.querySelector('input[name="image"]');
    formData.append('image', imageInput.files[0]);
    
    const response = await fetch('http://127.0.0.1:8000/api/v1/atletas/upload', {
        method: 'POST',
        body: formData
      }).then(response => response.json())
      .then(json => console.log(json))
      .catch(error => console.log(error.message));

    clearInputs()


    })
getModalides()
getCursos()