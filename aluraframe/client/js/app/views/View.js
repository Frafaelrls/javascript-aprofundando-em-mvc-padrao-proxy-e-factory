class View {

    #elemento;

    constructor(elemento) {

        this.#elemento = elemento;
    }

    template() {

        throw 'O método template deve ser implementado.'
    }

    
    update(model) {

        this.#elemento.innerHTML = this.template(model);

    }
    
}