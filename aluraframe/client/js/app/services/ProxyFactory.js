class ProxyFactory {

    /* 
        Recebe, o objeto que a proxy vai ser criada 
        Um array com as propriedades (props) que devem ser monitoradas
        E uma ação (acao) que deve ser executada quando as propriedades forem acessadas
    */

    static create(objeto, props, acao) {
        return new Proxy(objeto, {

            get(target, prop, receiver) {

                /*
                    Verificando se a propriedade enviada é um dos dois métodos e se é uma função
                    Caso verdadeiro, será retornado uma função
                */

                if (props.includes(prop) && ProxyFactory.#ehFuncao(target[prop])) {

                    return function () {
                        console.log(`Interceptando ${prop}`);

                        /*
                          O Reflect faz com que o método alvo receba os parâmetros (arguments) enviados
                          e executa o método dentro do seu contexto (target)  

                        */

                        Reflect.apply(target[prop], target, arguments);
                        return acao(target);
                    }
                }

                return target[prop];

            },

            // O set será chamado quando ocorrer o acesso a uma propriedade
            set(target, prop, value, receiver) {
                if (props.includes(prop)) {
                    target[prop] = value;
                    acao(target);
                }
                return target[prop] = value;
            }
        });
    }

    static #ehFuncao(func) {
        return typeof (func) == typeof (Function);
    }

}