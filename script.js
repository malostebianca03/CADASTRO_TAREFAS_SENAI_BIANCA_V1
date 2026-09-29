const campoTarefa = document.getElementById("campo-tarfa");
const botaoAdicionar = document.getElementById("botao-adicionar");
const listaTarefas = document.getElementById("lista-tarefas");
const contadorTarefas = document.getElementById("contador-tarefas");
const botaoTema = document.getElementById("boyao-slternar-tema");

// Carregar tarefas salvas
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

// ================================
// SALVAR TAREFAS
// ================================
function salvarTarefas() {
localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// ================================
// CRIAR TAREFA NA TELA
// ================================
function criarTarefa(texto, concluida = false) {

const tarefa = document.createElement("li");
tarefa.classList.add("item-tarefa");

if (concluida) {
    tarefa.classList.add("concluido");
}

// Texto
const textoTarefa = document.createElement("span");
textoTarefa.textContent = texto;

// Área dos botões
const acoes = document.createElement("div");
acoes.classList.add("acoes-tarefa");

// Botão concluir
const botaoConcluir = document.createElement("button");
botaoConcluir.classList.add("botao-acao");
botaoConcluir.title = "Concluir tarefa";

if (concluida) {
    botaoConcluir.innerHTML =
        '<i class="fa-solid fa-rotate-left"></i>';
} else {
    botaoConcluir.innerHTML =
        '<i class="fa-solid fa-check"></i>';
}

botaoConcluir.addEventListener("click", function () {

    tarefa.classList.toggle("concluido");

    // Encontrar a tarefa no array
    const indice = tarefas.findIndex(
        item => item.texto === texto
    );

    if (indice !== -1) {
        tarefas[indice].concluida =
            tarefa.classList.contains("concluido");

        salvarTarefas();
    }

    if (tarefa.classList.contains("concluido")) {
        botaoConcluir.innerHTML =
            '<i class="fa-solid fa-rotate-left"></i>';
        botaoConcluir.title = "Desmarcar tarefa";
    } else {
        botaoConcluir.innerHTML =
            '<i class="fa-solid fa-check"></i>';
        botaoConcluir.title = "Concluir tarefa";
    }
});

// Botão excluir
const botaoExcluir = document.createElement("button");
botaoExcluir.classList.add(
    "botao-acao",
    "botao-excluir"
);

botaoExcluir.innerHTML =
    '<i class="fa-solid fa-trash"></i>';

botaoExcluir.title = "Excluir tarefa";

botaoExcluir.addEventListener("click", function () {

    tarefa.remove();

    const indice = tarefas.findIndex(
        item => item.texto === texto
    );

    if (indice !== -1) {
        tarefas.splice(indice, 1);
        salvarTarefas();
    }

    atualizarContador();
});

// Montar tarefa
acoes.appendChild(botaoConcluir);
acoes.appendChild(botaoExcluir);

tarefa.appendChild(textoTarefa);
tarefa.appendChild(acoes);

listaTarefas.appendChild(tarefa);


}

// ================================
// ADICIONAR TAREFA
// ================================
function adicionarTarefa() {

const texto = campoTarefa.value.trim();

if (texto === "") {
    alert("A tarefa não pode estar vazia!");
    campoTarefa.focus();
    return;
}

// Adicionar no array
tarefas.push({
    texto: texto,
    concluida: false
});

// Salvar no navegador
salvarTarefas();

// Mostrar na tela
criarTarefa(texto);

// Limpar campo
campoTarefa.value = "";
campoTarefa.focus();

atualizarContador();


}

// ================================
// CONTADOR
// ================================
function atualizarContador() {

const quantidade =
    listaTarefas.querySelectorAll(".item-tarefa").length;

if (quantidade === 0) {

    contadorTarefas.textContent =
        "0 tarefas na lista";

} else if (quantidade === 1) {

    contadorTarefas.textContent =
        "1 tarefa na lista";

} else {

    contadorTarefas.textContent =
        `${quantidade} tarefas na lista`;
}


}

// ================================
// BOTÃO ADICIONAR
// ================================
botaoAdicionar.addEventListener(
"click",
adicionarTarefa
);

// ================================
// ENTER PARA ADICIONAR
// ================================
campoTarefa.addEventListener(
"keydown",
function (evento) {

    if (evento.key === "Enter") {
        adicionarTarefa();
    }

}


);

// ================================
// MODO ESCURO
// ================================
botaoTema.addEventListener(
"click",
function () {

    document.body.classList.toggle(
        "modo-escuro"
    );

    // Mantém a lua
    botaoTema.innerHTML =
        '<i class="fa-solid fa-moon"></i>';
}


);

// ================================
// CARREGAR TAREFAS SALVAS
// ================================
tarefas.forEach(function (item) {

criarTarefa(
    item.texto,
    item.concluida
);


});

// Atualizar contador
atualizarContador();
