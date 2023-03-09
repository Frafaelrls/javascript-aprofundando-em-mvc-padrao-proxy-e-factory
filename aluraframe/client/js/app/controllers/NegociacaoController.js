class NegociacaoController {

    // Atributos privados
    #inputData;
    #inputQunatidade;
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
        this.#inputQunatidade = $('#quantidade');
        this.#inputValor = $('#valor');
        
        /*
            O escopo de this é léxico em uma arrow function,em vez de ser dinâmico como em uma função
            assim, o this irá manter o escopo de quando foi crida independente de onde for chamada
        */ 

        this.#listaNegociacoes = new ListaNegociacoes(model => this.#negociacoesView.update(model));

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
            this.#inputQunatidade.value,
            this.#inputValor.value
        );
    }

    #limpaFormulario() {
        this.#inputData.value = '';
        this.#inputQunatidade.value = 1;
        this.#inputValor.value = 0.0;

        this.#inputData.focus();
    }
};