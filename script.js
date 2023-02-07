async function buscaEndereco(cep) {
    const mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "";
    try{
        const consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const consultaCEPConvertido = await consultaCep.json();

        if (consultaCEPConvertido.erro){
            throw Error('CEP não existente!');
        }

        const cidade = document.getElementById('cidade');
        const logradouro = document.getElementById('endereco');
        const estado = document.getElementById('estado')
        const bairro = document.getElementById('bairro')

        cidade.value = consultaCEPConvertido.localidade;
        logradouro.value = consultaCEPConvertido.logradouro;
        estado.value = consultaCEPConvertido.uf;
        bairro.value = consultaCEPConvertido.bairro;        

        console.log(consultaCEPConvertido)
        return consultaCEPConvertido;

    } catch(erro) {
        mensagemErro.innerHTML = `<p>CEP inválido. Tente Novamente!</p>`;
        console.log(erro);
    }
}


const cep = document.getElementById('cep');
cep.addEventListener("focusout", () => buscaEndereco(cep.value));

