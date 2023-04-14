window.addEventListener("DOMContentLoaded", (event) => {

    var formulario = document.getElementById('form-entrar')

    formulario.addEventListener("submit", function (e) {
        e.preventDefault();

        var user = document.getElementById("user").value;
        var password = document.getElementById("password").value;

        if (user == "admin" && password == "admin") {
            window.location.href = 'cadastro.html'
        } else {
            Swal.fire(
                'informações inválidas',
                'Seu email  ou senha estão incorretos',
                'error'
            )
        }


    });
})


var formCadastroAluno = document.getElementById("form-cadastrar_aluno")

formCadastroAluno.addEventListener("submit", function (e) {
    e.preventDefault();
    Swal.fire(
        'Sucesso',
        'O cadastro foi realizado!',
        'success'
    ).then((result) => {
        if (result.isConfirmed == true) {
            window.location.replace("./cadastro.html");
        }
    })
    })


    var formCadastroTime = document.getElementById("form-cadastrar_time")

    formCadastroTime.addEventListener("submit", function (e) {
        e.preventDefault();
        Swal.fire(
            'Sucesso',
            'O cadastro foi realizado!',
            'success'
        ).then((result) => {
            if (result.isConfirmed == true) {
                window.location.replace("./cadastro.html");
            }
        })
    })