const btn = document.getElementById("btnEnviar");
const form = document.getElementById("formOrcamento");

btn.addEventListener("click", function () {
    const nome       = document.getElementById("nome").value.trim();
    const email      = document.getElementById("email").value.trim();
    const telefone   = document.getElementById("telefone").value.trim();
    const quantidade = document.getElementById("quantidade").value.trim();
    const material   = document.getElementById("material").value;
    const descricao  = document.getElementById("descricao").value.trim();

    const camposObrigatorios = [
        { id: "nome",      label: "Nome Completo" },
        { id: "email",     label: "Email" },
        { id: "descricao", label: "Descrição do Projeto" },
    ];

    // Remove erros anteriores
    camposObrigatorios.forEach(function(c) {
        document.getElementById(c.id).style.border = "";
        document.getElementById(c.id).style.background = "";
    });

    const faltando = camposObrigatorios.filter(function(c) {
        return document.getElementById(c.id).value.trim() === "";
    });

    if (faltando.length > 0) {
       // Destaca campos com erro
        faltando.forEach(function(c) {
        var el = document.getElementById(c.id);
        el.style.border = "2px solid #f50808";
        el.style.outline = "3px solid rgba(216, 90, 48, 0.25)";
        el.style.background = ""; // <- remove o fundo claro, mantém o escuro do site
        });

        // Popula a lista do pop-up
        var lista = document.getElementById("popup-campos-lista");
        lista.innerHTML = "";
        faltando.forEach(function(c) {
            var li = document.createElement("li");
            li.textContent = c.label;
            li.style.cssText = [
                "font-size: 14px",
                "color: #993C1D",
                "background: #FAECE7",
                "border-radius: 6px",
                "padding: 8px 12px",
                "display: flex",
                "align-items: center",
                "gap: 8px"
            ].join(";");

            // Bolinha vermelha como ícone
            var dot = document.createElement("span");
            dot.style.cssText = "width:8px;height:8px;border-radius:50%;background:#D85A30;flex-shrink:0;display:inline-block";
            li.prepend(dot);

            lista.appendChild(li);
        });

        document.getElementById("popup-validacao").style.display = "flex";

        // Scroll suave até o primeiro campo com erro
        document.getElementById(faltando[0].id).scrollIntoView({ behavior: "smooth", block: "center" });
        return;
    }

    // Tudo ok — monta mensagem WhatsApp
    const mensagem =
    ` Novo pedido de orçamento – 3D Angels:

 Nome: ${nome}
 Email: ${email}
 Telefone: ${telefone}
 Quantidade: ${quantidade}
 Material: ${material}

Descrição do projeto:
${descricao}`;

    const whatsappURL = `https://wa.me/5519991946309?text=${encodeURIComponent(mensagem)}`;
    window.open(whatsappURL, "_blank");

    // Envia por email via FormSubmit
    fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" }
    })
    .then(function() {
        document.getElementById("popup-sucesso").style.display = "flex";
        form.reset();
    })
    .catch(function() {
        alert("Erro ao enviar o orçamento por email.");
    });
});

function fecharPopup(id) {
    document.getElementById(id).style.display = "none";
}

document.addEventListener("click", function(e) {
    ["popup-validacao", "popup-sucesso"].forEach(function(id) {
        var el = document.getElementById(id);
        if (el && e.target === el) fecharPopup(id);
    });
});

document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
        ["popup-validacao", "popup-sucesso"].forEach(fecharPopup);
    }
});
