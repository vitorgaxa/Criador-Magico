/*
    (X) Descobrir quando o botão foi clicado
    (X) Pegar o que foi escrito no Input
    (X) Enviar para o N8N
    (X) Receber o que o N8N respondeu
    (X) Colocar na tela o que ele respondeu
 */


let Webhook = "https://vitorxavier.app.n8n.cloud/webhook/animacao-css"
async function cliqueNoBotao() {

    let textoInput = document.querySelector(".input-animacao").value
    let codigo = document.querySelector(".area-codigo")
    let areaResultado = document.querySelector(".area-resultado")
    let botao = document.querySelector(".butao-magica")

    botao.disabled = true
    botao.textContent = "Criando..."
    botao.style.background = "#888"


    // usando a função fetch para enviar dados
    let resposta = await fetch(Webhook , {
        method: 'POST', // Método usando para enviar os dados
        headers: {'Content-Type': 'application/json'}, // Informando que estamos enviando JSON
        body: JSON.stringify({ pergunta: textoInput }) // Aqui você coloca os dados que deseja enviar
    })

    let resultado = await resposta.json()
    let info = JSON.parse(resultado.resposta)

    codigo.innerHTML = info.code
    areaResultado.innerHTML = info.preview

    document.head.insertAdjacentHTML('beforeend', "<style>"+ info.style +"</style>")

    botao.disabled = false
    botao.textContent = "Criar mágica ✨"
    botao.style.background = "#37e359"
}