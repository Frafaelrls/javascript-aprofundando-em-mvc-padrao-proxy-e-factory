class NegociacaoService {

    #http;

    constructor() {

        this.#http = new HttpService();
    }

    obeterNegociacoesDaSemana() {

        return new Promise((resolve, reject) => {

            this.#http
                .get('negociacoes/semana')
                .then(negociacoes => {
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível as negociações da semana');
                })
        });
    }

    obeterNegociacoesDaSemanaAnterior() {

        return new Promise((resolve, reject) => {

            this.#http
                .get('negociacoes/anterior')
                .then(negociacoes => {
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível as negociações da semana anterior');
                })
        });
    }

    obeterNegociacoesDaSemanaRetrasada() {

        return new Promise((resolve, reject) => {

            this.#http
                .get('negociacoes/retrasada')
                .then(negociacoes => {
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível as negociações da semana retrasada');
                })
        });
    }
}