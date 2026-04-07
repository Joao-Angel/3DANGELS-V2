function enviarPergunta(){

    let pergunta = document.getElementById("perguntaCliente").value
    let numero = "5519991946309"
    
    let mensagem = `Olá! Tenho uma dúvida:
    
    ${pergunta}`
    
    let url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`
    
    window.open(url, "_blank")
    
    }