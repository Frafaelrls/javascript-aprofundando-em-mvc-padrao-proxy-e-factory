class Mensagem {

    #texto;

    constructor(texto='') {
        this.#texto = texto;
    }

    get texto() {
        return this.#texto
    }

    set texto(novoTexto) {
        this.#texto = novoTexto;
    }
}