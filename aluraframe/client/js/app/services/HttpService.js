class HttpService {

    get(url) {

        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();

            xhr.open('GET', url);

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
                        resolve(JSON.parse(xhr.responseText));
                            
                    } else {
                        // Quando a solicitação falhar, será passado o que veio do servidor
                        reject(xhr.responseText);

                    }
                }
            };

            xhr.send();
        });

    }

    post(url, dado) {


        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onreadystatechange = () => {

                if (xhr.readyState == 4) {

                    if (xhr.status == 200) {

                        resolve(JSON.parse(xhr.responseText));
                    } else {

                        reject(xhr.responseText);
                    }
                }
            };

            xhr.send(JSON.stringify(dado));
        });

    }
}