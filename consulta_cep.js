//preencher o formulario com os dados de retorno da API

function preecherFormulario(endereco){

    document.getElementById("endereco").value = endereco.logradouro;

    document.getElementById("bairro").value = endereco.bairro;

    document.getElementById("cidade").value = endereco.localidade;

    document.getElementById("estado").value = endereco.uf;

}



//Verifica se o que foi digitado pelo usuario é somente números

function eNumero(numero){
    return /^[0-9]+$/.test(numero);

}

//Verifica ce o Cep possui tamanho 8 e so possui numeros
function cepValido(cep){
    return cep.length == 8 && eNumero (cep);
}

//função para pesquisar o CEP via API

async function pesquisarCEP(){

    const cep = document.getElementById("cep").value.replace("-","");
    const url = `https://viacep.com.br/ws/${cep}/json`;

    if (cepValido(cep)){

        const dados = await fetch(url);
        const endereco = await dados.json();
        console.log(endereco);
        if (endereco.hasOwnProperty("erro") ){
            document.getElementById("endereco").value = "CEP não encontrado!"
        } else{
            preecherFormulario(endereco);
        }
        
    } else {
        document.getElementById("endereco").value = "CEP Incorreto!"
    }
    
    
}

document.getElementById("cep").addEventListener("focusout",pesquisarCEP);