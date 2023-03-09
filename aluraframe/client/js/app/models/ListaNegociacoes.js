class ListaNegociacoes {

    #negociacoes;
    #armadilha;
    
    constructor(armadilha) {

        this.#negociacoes = [];
        // armadilha recebe uma função
        this.#armadilha = armadilha;
    }

    adiciona(negociacao) {
        this.#negociacoes.push(negociacao);

        /*
            Classe Reflect.apply, é utilizada para modificar o contexto de execução
            de uma função e dentro de um array é passado os parâmretros que serão usados.
            
            Reflect.apply(this.#armadilha, this.#contexto, [this]);
        */

        this.#armadilha(this);
        
    }

    get negociacoes(){
        return [].concat(this.#negociacoes);
    }

    esvazia() {
        this.#negociacoes = [];

        this.#armadilha(this);
    }
}