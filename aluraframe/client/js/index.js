var campos = [
    document.querySelector('#data'),
    document.querySelector('#quantidade'),
    document.querySelector('#valor')
]

var tbody = document.querySelector('table tbody');

document.querySelector('.form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Criando uma linha
    var tr = document.createElement('tr');

    campos.forEach(function (campo) {
        // Criando uma célula
        var td = document.createElement('td');
        td.textContent = campo.value;
        // Adicionando a celula a linha
        tr.appendChild(td);
    });

    // Criando célula para o volume
    var tdVolume = document.createElement('td');
    tdVolume.textContent = campos[1].value * campos[2].value;
    // Adicionando a celula a linha
    tr.appendChild(tdVolume);

    // Adicionando a linha a tabela
    tbody.appendChild(tr);

    // Definindo valores padrões para os campos
    campos[0].value = '';
    campos[1].value = 1;
    campos[2].value = 0;

    // Método focus, quando a página é carregada este campo será selecionado automaticamente
    campos[0].focus();   

});




