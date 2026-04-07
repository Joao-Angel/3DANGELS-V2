// ================= CONFIG =================
const WHATSAPP_NUMERO = "5519991946309"


// ================= PEDIR PRODUTO =================
function pedirProduto(produto){

    const mensagem =
`Olá! Vim pelo site 3D Angels 🚀

Tenho interesse neste produto:
${produto}

Você tem outras cores ou opções disponíveis?`

    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`

    // abre direto (mais confiável que window.open)
    window.location.href = url
}


// ================= TROCAR CATEGORIA =================
function trocarCategoria(nome, event){

    const categorias = document.querySelectorAll(".categoria")
    const botoes = document.querySelectorAll(".tab-btn")

    botoes.forEach(btn => btn.classList.remove("active"))

    if(event){
        event.target.classList.add("active")
    }

    categorias.forEach(cat => {
        cat.classList.remove("active")
    })

    // pequeno delay pra animação ficar suave
    setTimeout(() => {
        document.getElementById(nome).classList.add("active")
    }, 100)
}


// ================= MELHORIA EXTRA =================
// garante que sempre começa na primeira aba ao carregar
document.addEventListener("DOMContentLoaded", () => {
    const primeiraCategoria = document.querySelector(".categoria")
    const primeiroBotao = document.querySelector(".tab-btn")

    if(primeiraCategoria && primeiroBotao){
        primeiraCategoria.classList.add("active")
        primeiroBotao.classList.add("active")
    }
})