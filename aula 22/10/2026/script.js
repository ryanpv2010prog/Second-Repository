// 1) Escreve um objeto {rótulo: valor} como linhas de uma tabela function preencherTabela(id, dados)
{
    const tabela = document.getElementById(id);
    tabela.innerHTML = '';
    for (const [rotulo, valor] of Object.entries(dados)) {
        const linha = tabela.insertRow();
        linha.insertCell().textContent = rotulo;
        linha.insertCell().textContent = valor;
    }
}
// 2) Navegador e Sistema function mostrarSistema()
{
    preencherTabela('sistema', {
        'Navegador': navigator.userAgent,
        'Idioma': navigator.lenguage,
        'Núcleo de CPU': navigator.hardwareConcurrency,
        'Memória (GB)': navigator.deviceMemory || 'Indisponivel neste navegador',
        'Fuso Horário': Intl.DateTimeFormat().resolvedOptions(), timeZone,
        'Online': navigator.onLine ? 'sim' : 'não'
    });
}
// 3) Tela e janela
function mostrarTela() {
    preencherTabela('tela', {
        'Resolução da tela': screen.width + 'x' + screen.height,
        'Janela do navegador': window.innerWidth + 'x' + window.innerHeight,
        'Modo escuro': matchMedia('prefers-color-scheme: dark)').matches ? 'sim' : 'não'
    });
}
mostrarSistema();
mostrarTela();
window.addEventListener('resize', mostrarTela); //atualiza ao redimensionar
document.getElementById('btn-local').addEventListener('click', function () {
    const saida = document.getElementById('local');
    saida.textContent = 'buscando...';
    navigator.geolocation.getCurrentPosition(
        function (pos) {
            saida.textContent = 'latitude' + pos.coords.latitude.toFixed(4) +
                ',longitude ' + pos.coords.longitude.toFixed(4);
        },
        function (erro) {
            saida.textContent = 'nao foi possivel obter a localizacao:' + erro.message;
        }
    )
})
document.getElementById('arquivos').addEventListener('change', function (Evento) {
    const dados = {};
    for (const arq of Evento.target.files) {
        dados[arq.nome] = (arq.size / 1024).toFixed(1) + 'KB';
    }
    preencherTabela('lista-arquivos', dados);
}
);