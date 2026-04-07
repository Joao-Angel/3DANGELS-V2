const btn = document.getElementById("btnEnviar");
const form = document.getElementById("formOrcamento");

btn.addEventListener("click", function () {

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const quantidade = document.getElementById("quantidade").value;
    const material = document.getElementById("material").value;
    const descricao = document.getElementById("descricao").value;

    if (!nome || !email || !descricao) {
        alert("Preencha os campos obrigatórios!");
        return;
    }

    const mensagem = 
    ` Novo pedido de orçamento – 3D Angels:
    
     Nome: ${nome}
     Email: ${email}
     Telefone: ${telefone}
     Quantidade: ${quantidade}
     Material: ${material}
    
    Descrição do projeto:
    ${descricao}`;

    // WhatsApp (clique direto)
    const whatsappURL = `https://wa.me/5519991946309?text=${encodeURIComponent(mensagem)}`;
    window.open(whatsappURL, "_blank");

    // Email via FormSubmit
    fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" }
    })
    .then(() => {
        alert("Orçamento enviado com sucesso!");
        form.reset();
    })
    .catch(() => {
        alert("Erro ao enviar o orçamento por email.");
    });
});
