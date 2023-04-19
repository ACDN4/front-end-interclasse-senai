let contador = 4

function add_input(){
    if (contador <= 10){

        jogador_input = `
        <div class="bloco">
            <h1>Jogador 0${contador}</h1>
            <label for="select-grouped"></label>
            <select id="select-grouped" name="select-grouped">
                <optgroup label="Modalidades">
                <option value="0"></option>
                    <option value="option1">Gabriel Bonaretti</option>
                    <option value="option2">Diego Castan</option>
                </optgroup>
                </select>
        </div>` 

        contador++
        $('#inputs').append(jogador_input)
    } else {
        return Swal.fire(
            'limite atingido!',
            'Os times só podem ter 10 jogadores no máximo',
            'error'
          )
    }
}

$('#form-cad-time').on('submit', (e) => {
    e.preventDefault()
    console.log('Cadastrar time')
})