// Herança de classe
class MensagemView extends View {

    constructor(elemento) {
        // Método super() será utilizado para passar o elemento para o construtor da classe mãe
        super(elemento);
    }

    template(model) {

        /* 
            If ternário. Verifica se a expresão a esquerda da interrogação (?) é verdadeira, caso seja
            o primeiro código a direita da interrogação (?) será executado, caso não seja, o código a 
            direita do dois pontos (:) será executado
        */
        return model.texto ? `<p class='alert alert-info'>${model.texto}</p>` : '<p></p>';
    }

}