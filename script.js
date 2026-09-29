const campoTarefa = document.getElementById("campo-tarfa");
const botaoAdicionar = document.getElementById("botao-adicionar");
const listaTarefas = document.getElementById("lista-tarefas");
const contadorTarefas = document.getElementById("contador-tarefas");
const botaoTema = document.getElementById("boyao-slternar-tema");

// Adicionar tarefa
function adicionarTarefa() {
const texto = campoTarefa.value.trim();

// Verifica se a tarefa está vazia
if (texto === "") {
    alert("A tarefa não pode estar vazia!");
    campoTarefa.focus();
    return;
}

// Criar tarefa
const tarefa = document.createElement("li");
tarefa.classList.add("item-tarefa");

// Texto da tarefa
const textoTarefa = document.createElement("span");
textoTarefa.textContent = texto;

// Área dos botões
const acoes = document.createElement("div");
acoes.classList.add("acoes-tarefa");

// Botão concluir
const botaoConcluir = document.createElement("button");
botaoConcluir.classList.add("botao-acao");
botaoConcluir.innerHTML = '<i class="fa-solid fa-check"></i>';
botaoConcluir.title = "Concluir tarefa";

botaoConcluir.addEventListener("click", function () {
    tarefa.classList.toggle("concluido");

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
botaoExcluir.classList.add("botao-acao", "botao-excluir");
botaoExcluir.innerHTML = '<i class="fa-solid fa-trash"></i>';
botaoExcluir.title = "Excluir tarefa";

botaoExcluir.addEventListener("click", function () {
    tarefa.remove();
    atualizarContador();
});

// Colocar os botões dentro da área de ações
acoes.appendChild(botaoConcluir);
acoes.appendChild(botaoExcluir);

// Montar a tarefa
tarefa.appendChild(textoTarefa);
tarefa.appendChild(acoes);

// Adicionar tarefa à lista
listaTarefas.appendChild(tarefa);

// Limpar campo
campoTarefa.value = "";
campoTarefa.focus();

// Atualizar contador
atualizarContador();


}

// Atualizar contador
function atualizarContador() {
const quantidade =
listaTarefas.querySelectorAll(".item-tarefa").length;

if (quantidade === 0) {
    contadorTarefas.textContent = "0 tarefas na lista";
} else if (quantidade === 1) {
    contadorTarefas.textContent = "1 tarefa na lista";
} else {
    contadorTarefas.textContent =
        `${quantidade} tarefas na lista`;
}


}

// Botão adicionar
botaoAdicionar.addEventListener("click", adicionarTarefa);

// Adicionar apertando Enter
campoTarefa.addEventListener("keydown", function (evento) {
if (evento.key === "Enter") {
adicionarTarefa();
}
});

// Modo escuro
botaoTema.addEventListener("click", function () {
document.body.classList.toggle("modo-escuro");

// A lua permanece sempre no botão
botaoTema.innerHTML =
    '<i class="fa-solid fa-moon"></i>';


});

// Iniciar contador
atualizarContador();
