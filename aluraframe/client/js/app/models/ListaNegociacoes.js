class ListaNegociacoes {

    #negociacoes;
    #armadilha;
    #contexto;
    
    constructor(contexto, armadilha) {

        this.#negociacoes = [];
        // armadilha recebe uma função
        this.#armadilha = armadilha;
        this.#contexto = contexto;
    }

    adiciona(negociacao) {
        this.#negociacoes.push(negociacao);

        /*
            Classe Reflect.apply, é utilizada para modificar o contexto de execução
            de uma função e dentro de um array é passado os parâmretros que serão usados. 
        */

        Reflect.apply(this.#armadilha, this.#contexto, [this]);
    }

    get negociacoes(){
        return [].concat(this.#negociacoes);
    }

    esvazia() {
        this.#negociacoes = [];

        Reflect.apply(this.#armadilha, this.#contexto, [this]);
    }
}