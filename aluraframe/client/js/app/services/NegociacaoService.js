class NegociacaoService {

    obeterNegociacoesDaSemana() {

        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();

            xhr.open('GET', 'negociacoes/semana');

            /*
                Estado da requisição ajax:
                0: requisição ainda não iniciada
                1: conexão com o servidor estabelecida
                2: requisição recebida
                3: processando requisição
                4: requisição está concluída e a resposta está pronta
            */

            // Quando o estado mudar a função é executada 
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {

                    if (xhr.status == 200) {
                        // transformando o JSON em objetos 
                        resolve(JSON.parse(xhr.responseText)
                            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));

                    } else {
                        console.log(xhr.responseText);
                        // Quando a solicitação falhar, será passado uma string para
                        // a função reject
                        reject('Não foi possível obeter as negociações da semana');

                    }
                }
            };

            xhr.send();

        });


    }

    obeterNegociacoesDaSemanaAnterior() {

        return new Promise((resolve, reject) =>{

            let xhr = new XMLHttpRequest();

            xhr.open('GET', 'negociacoes/anterior');
    
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
    
                    if (xhr.status == 200) {
                        // Quando bem sucedida o retorno é passado para a função resolve
                        resolve(JSON.parse(xhr.responseText)
                            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
    
    
                    } else {
                        console.log(xhr.responseText);
                        reject('Não foi possível obeter as negociações da semana anterior');
    
                    }
                }
            };
    
            xhr.send();
        });

 
    }

    obeterNegociacoesDaSemanaRetrasada() {

        return new Promise((resolve, reject) => {
            
            let xhr = new XMLHttpRequest();

            xhr.open('GET', 'negociacoes/retrasada');
    
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
    
                    if (xhr.status == 200) {
    
                        resolve(JSON.parse(xhr.responseText)
                            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
    
    
                    } else {
                        console.log(xhr.responseText);
                        reject('Não foi possível obeter as negociações da semana retrasada');
    
                    }
                }
            };
    
            xhr.send();

        });

 
    }
}