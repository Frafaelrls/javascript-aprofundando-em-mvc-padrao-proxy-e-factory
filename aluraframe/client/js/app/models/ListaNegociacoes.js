class ListaNegociacoes {

    #negociacoes;
    
    constructor() {

        this.#negociacoes = [];
    }

    adiciona(negociacao) {
        this.#negociacoes.push(negociacao);
    }

    get negociacoes(){
        return [].concat(this.#negociacoes);
    }
}