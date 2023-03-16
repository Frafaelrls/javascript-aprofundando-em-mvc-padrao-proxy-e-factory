class Bind { 

    /*
        Utilizando três pontos afrente de um a parâmetro estamos 
        Transformando-o em um REST operator. Assim, todos os parâmetros passados
        Serão adicionados a um array

        O REST operator deve ser o último parâmetro.
    */

    constructor(model, view, ...props) {

        let proxy = ProxyFactory.create(model, props, model => 
            view.update(model));
        view.update(model);

        return proxy;
        
    }
}