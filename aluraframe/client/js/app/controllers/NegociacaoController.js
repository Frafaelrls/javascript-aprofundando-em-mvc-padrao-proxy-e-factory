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


        // NegociacoesView recebe o local onde deve ser incluida no DOM
        this.#negociacoesView = new NegociacoesView($('#negociacoesView'));

        this.#listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            this.#negociacoesView,
            ['adiciona', 'esvazia']
        );


        // MensagemView recebe o local onde deve ser incluida no DOM
        this.#mensagemView = new MensagemView($('#mensagemView'));

        this.#mensagem = new Bind(
            new Mensagem(),
            this.#mensagemView,
            ['texto']
        );



    }

    adiciona(event) {
        event.preventDefault();

        this.#listaNegociacoes.adiciona(this.#criaNegociacao());
        this.#mensagem.texto = 'Negociação adicionada com sucesso!';
        this.#limpaFormulario();

    };

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

    #limpaFormulario() {
        this.#inputData.value = '';
        this.#inputQuantidade.value = 1;
        this.#inputValor.value = 0.0;

        this.#inputData.focus();
    }
};