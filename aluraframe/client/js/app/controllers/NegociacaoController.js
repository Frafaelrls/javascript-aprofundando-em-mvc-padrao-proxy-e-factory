class NegociacaoController {

    // Atributos privados
    #inputData;
    #inputQuantidade;
    #inputValor;
    #listaNegociacoes;
    #mensagem;
    #ordemAtual;

    constructor() {

        /* 
            O método .bind criar uma função que o seu this tem referência ao atributo fornecido
            Nes caso, a variável $ mantem a associação ao document
        */
        let $ = document.querySelector.bind(document);

        this.#inputData = $('#data');
        this.#inputQuantidade = $('#quantidade');
        this.#inputValor = $('#valor');
        this.#ordemAtual = '';


        this.#listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

        this.#mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto');

    }

    adiciona(event) {
        event.preventDefault();

        this.#listaNegociacoes.adiciona(this.#criaNegociacao());
        this.#mensagem.texto = 'Negociação adicionada com sucesso!';
        this.#limpaFormulario();

    };

    importaNegociacoes() {

        let service = new NegociacaoService();

        // Padrão de projeto promise

        // Promise.all() executa as promises sequencialmente.

        Promise.all([
            service.obeterNegociacoesDaSemana(),
            service.obeterNegociacoesDaSemanaAnterior(),
            service.obeterNegociacoesDaSemanaRetrasada()
        ]).then(negociacoes => {
            negociacoes
            .reduce((arrayAchatado, array) => arrayAchatado.concat(array),[] )
            .forEach(negociacao => this.#listaNegociacoes.adiciona(negociacao));
            this.#mensagem.texto = 'Negociações importadas com sucesso';
        }).catch(erro => this.#mensagem.texto = erro);        

        /*
            Abaixo temos a aplicação do padrão de projeto promise, mas, o código abaixo
            é um "Pyramid of Doom". Este tipo de código pode apresentar retornos fora de
            ordem devido a promise ser assíncrona, onde uma solicitação é executada independente
            da solicitação anterior.

        let promise = service.obeterNegociacoesDaSemana();
        promise
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this.#listaNegociacoes.adiciona(negociacao))
                this.#mensagem.texto = 'Negociações da semana obtida com sucesso!';
            })
            .catch(erro => this.#mensagem.texto = erro)

        service.obeterNegociacoesDaSemanaAnterior()
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this.#listaNegociacoes.adiciona(negociacao))
                this.#mensagem.texto = 'Negociações da semana anterior obtida com sucesso!';
            })
            .catch(erro => this.#mensagem.texto = erro)

        service.obeterNegociacoesDaSemanaRetrasada()
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this.#listaNegociacoes.adiciona(negociacao))
                this.#mensagem.texto = 'Negociações da semana retrasada obtida com sucesso!';
            })
            .catch(erro => this.#mensagem.texto = erro)


        */
        /* 
        
            Abaixo temos um exemplo de código chamado "Pyramid of Doom" ("Pirâmide do destino")
            Isso ocorre quando temos um aninhamento de funções, ou seja, uma função dentro de outras
            funções.

            A pirâmide é um forte indício de que temos problemas de legibilidade do código,
            e é o sintoma de um problema maior, o "Callback Hell". 
            Ocorre quando temos requisições assíncronas executadas em determinada ordem, 
            que chama vários callbacks seguidos.
        
        

        service.obeterNegociacoesDaSemana((erro, negociacoes) => {

            // Pragamação chamada de Error-First-Callback
            if (erro) {
                this.#mensagem.texto = erro;
                return
            }

            negociacoes.forEach(negociacao => this.#listaNegociacoes.adiciona(negociacao));

            service.obeterNegociacoesDaSemanaAnterior((erro, negociacoes) => {

                if (erro) {
                    this.#mensagem.texto = erro;
                    return
                }

                negociacoes.forEach(negociacao => this.#listaNegociacoes.adiciona(negociacao));

                service.obeterNegociacoesDaSemanaRetrasada((erro, negociacoes) => {
                   
                    if (erro) {
                        this.#mensagem.texto = erro;
                        return
                    }

                    negociacoes.forEach(negociacao => this.#listaNegociacoes.adiciona(negociacao));
                    this.#mensagem.texto = 'Negociações importadas com sucesso.'
                });
            });
        });
        
        */

    }

    apaga() {

        this.#listaNegociacoes.esvazia();
        this.#mensagem.texto = 'Negociações apagadas com sucesso';

    }

    #criaNegociacao() {

        return new Negociacao(
            DateHelper.textoParaData(this.#inputData.value),
            this.#inputQuantidade.value,
            this.#inputValor.value
        );
    }

    ordena(coluna) {
        if(this.#ordemAtual == coluna) {
            this.#listaNegociacoes.inverteOrdem();
        }else{
            this.#listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }
        this.#ordemAtual = coluna;
    }

    #limpaFormulario() {
        this.#inputData.value = '';
        this.#inputQuantidade.value = 1;
        this.#inputValor.value = 0.0;

        this.#inputData.focus();
    }
};