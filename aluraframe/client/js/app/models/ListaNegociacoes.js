class ListaNegociacoes {

    #negociacoes;
    
    constructor() {

        this.#negociacoes = [];
    }

    adiciona(negociacao) {
        this.#negociacoes.push(negociacao);

        /*
            Classe Reflect.apply, é utilizada para modificar o contexto de execução
            de uma função e dentro de um array é passado os parâmretros que serão usados.
            
            Reflect.apply(this.#armadilha, this.#contexto, [this]);
        */
       
    }

    get negociacoes(){
        return [].concat(this.#negociacoes);
    }

    esvazia() {
        this.#negociacoes = [];

    }

    get volumeTotal() {
        return this.#negociacoes.reduce((total, n) => total + n.volume, 0.0);
     }

    ordena (criterio) { 
        this.#negociacoes.sort(criterio);
    }

    inverteOrdem() {
        this.#negociacoes.reverse();
    }
}