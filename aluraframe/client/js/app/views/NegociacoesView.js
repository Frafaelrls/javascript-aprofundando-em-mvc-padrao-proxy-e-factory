// Herança de classe
class NegociacoesView extends View {

    constructor(elemento) {
        super(elemento);
    }

    template(model) {
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th onclick="negociacaoController.ordena('data')">DATA</th>
                    <th onclick="negociacaoController.ordena('quantidade')">QUANTIDADE</th>
                    <th onclick="negociacaoController.ordena('valor')">VALOR</th>
                    <th onclick="negociacaoController.ordena('volume')">VOLUME</th>
                </tr>
            </thead>
            <tbody>
                ${model.negociacoes.map(negociacao => `
                    
                    <tr>
                        <td>${DateHelper.dataParaTexto(negociacao.data)}</td>
                        <td>${negociacao.quantidade}</td>
                        <td>${negociacao.valor}</td>
                        <td>${negociacao.volume}</td>
                    </tr>
                    
                    `).join('')}
            </tbody>
            
            <tfoot>
            <tr>
            <td colspan='3'>Total usando Immediately-invoked function expression (IIFE):</td>

                <!-- 
                    Usando uma Immediately-invoked function expression (IIFE)  
                    Sintaxe: (function(){})()    
                    Essa função é uma função auto-invocada 
                 -->    
                <td>${
                    (function() {
                        let total = 0;
                        model.negociacoes.forEach(negociacao => total += negociacao.volume);
                        return total;
                    })()
                }</td>
            </tr>
            <tr>
                <td colspan='3'>Total usando o paradigma funcional:</td>

                <!-- 
                    A função reduce() processa o array e retorna um único resultado     
                    Ela recebe uma função como primeiro parâmetro e o valor inicial como segundo parâmetro  
                    A função terá os seguintes parâmetros: 
                        total - Variável que irá acumular o valor a cada interação   
                        negociacao - Elemento da lista   
                -->    
                <td>
                    ${model.volumeTotal}
                </td>
            </tr>

                
            </tfoot>
        </table>
        `;
    }

}