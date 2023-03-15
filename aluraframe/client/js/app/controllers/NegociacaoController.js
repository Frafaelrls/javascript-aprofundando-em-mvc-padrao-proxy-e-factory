class NegociacaoController {

    // Atributos privados
    #inputData;
    #inputQuantidade;
    #inputValor;
    #listaNegociacoes;
    #negociacoesView;
    #mensagem;
    #mensagemView;

    constructor() {
        /* 
            O método .bind criar uma função que o seu this tem referência ao atributo fornecido
            Nes caso, a variável $ mantem a associação ao document
        */
        let $ = document.querySelector.bind(document);

        this.#inputData = $('#data');
        this.#inputQuantidade = $('#quantidade');
        this.#inputValor = $('#valor');
        
        let self = this;

        this.#listaNegociacoes = new Proxy(new ListaNegociacoes(), {

            get(target, prop, receiver) {

                /*
                    Verificando se a propriedade enviada é um dos dois métodos e se é uma função
                    Caso verdadeiro, será retornado uma função
                */

                if(['adiciona', 'esvazia'].includes(prop) && typeof(target[prop]) == typeof(Function)) {
                    
                    return function() {
                        console.log(`Interceptando ${prop}`);

                        /*
                          O Reflect faz com que o método alvo receba os parâmetros (arguments) enviados
                          e executa o método dentro do seu contexto (target)  

                        */

                        Reflect.apply(target[prop], target, arguments);
                        self.#negociacoesView.update(target);
                    }
                }

                return target[prop];
                
            }
        });
      
       
        // NegociacoesView recebe o local onde deve ser incluida no DOM
        this.#negociacoesView = new NegociacoesView($('#negociacoesView'));
        this.#negociacoesView.update(this.#listaNegociacoes);

        this.#mensagem = new Mensagem();
        // MensagemView recebe o local onde deve ser incluida no DOM
        this.#mensagemView = new MensagemView($('#mensagemView'));
        this.#mensagemView.update(this.#mensagem);

    }

    adiciona(event) {
        event.preventDefault();

        this.#listaNegociacoes.adiciona(this.#criaNegociacao());

        this.#mensagem.texto = 'Negociação adicionada com sucesso!';
        this.#mensagemView.update(this.#mensagem);
       
        this.#limpaFormulario();

    };

    apaga() {
        this.#listaNegociacoes.esvazia();

        this.#mensagem.texto = 'Negociações apagadas com sucesso';
        this.#mensagemView.update(this.#mensagem);
    }


    #criaNegociacao() {

        return new Negociacao(
            DateHelper.textoParaData(this.#inputData.value),
            this.#inputQuantidade.value,
            this.#inputValor.value
        );
    }

    #limpaFormulario() {
        this.#inputData.value = '';
        this.#inputQuantidade.value = 1;
        this.#inputValor.value = 0.0;

        this.#inputData.focus();
    }
};