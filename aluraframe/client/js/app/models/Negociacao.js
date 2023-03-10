class Negociacao {

    #data;
    #quantidade;
    #valor;

    constructor(data, quantidade, valor) {
        this.#data = new Date(data.getTime());
        this.#quantidade = quantidade;
        this.#valor = valor;
        /*
            O método freeze congela o objeto impedindo sua alteração
            É um comando shallow, ou seja, ele ficará na superfície não congela objetos que são atribuidos ao
            atributo da classe
        */
        Object.freeze(this);
    }

    get data() {
        /*
            Abaixo uma programação defensiva, é retornado um novo objeto
            que não tem a referência para o atributo do objeto
            getTime retorna um número que representa a data
        */
        return new Date(this.#data.getTime());
    }

    get quantidade() {
        return this.#quantidade;
    }

    get valor() {
        return this.#valor
    }

    get volume() {

        return this.#quantidade * this.#valor;
    }

    /*
        Metodos set criados para realizar testes com o método set do Proxy
    */

    set quantidade(novaQuantidade) {
        this.#quantidade = novaQuantidade;
    }

    set valor(novoValor) {
        this.#valor = novoValor;
    }

}