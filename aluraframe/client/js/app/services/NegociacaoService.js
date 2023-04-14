class NegociacaoService {

    obeterNegociacoesDaSemana(cb) {

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
                    cb(null, JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));

                        
                } else {
                    console.log(xhr.responseText);
                    cb('Não foi possível obeter as negociações', null);

                }
            }
        };

        xhr.send();
    }

    obeterNegociacoesDaSemanaAnterior(cb) {

        let xhr = new XMLHttpRequest();

        xhr.open('GET', 'negociacoes/anterior');

        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {

                if (xhr.status == 200) {
    
                    cb(null, JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));

                        
                } else {
                    console.log(xhr.responseText);
                    cb('Não foi possível obeter as negociações', null);

                }
            }
        };

        xhr.send();
    }

    obeterNegociacoesDaSemanaRetrasada(cb) {

        let xhr = new XMLHttpRequest();

        xhr.open('GET', 'negociacoes/retrasada');

        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {

                if (xhr.status == 200) {

                    cb(null, JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));

                        
                } else {
                    console.log(xhr.responseText);
                    cb('Não foi possível obeter as negociações', null);

                }
            }
        };

        xhr.send();
    }
}