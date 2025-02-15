const amigos = [];

function adicionarAmigo() {
  const input = document.getElementById("amigo");
  const nome = input.value.trim();

  if (!nome) {
    alert("É necessário inserir um nome válido");
    return;
  }

  amigos.push(nome);

  // Atualiza a lista de amigos exibida na tela
  const ulLista = document.getElementById("listaAmigos");
  const li = document.createElement("li");
  li.textContent = nome;
  ulLista.appendChild(li);

  input.value = "";
}

function sortearAmigo() {
  if (amigos.length === 0) {
    alert("Todos os amigos já foram sorteados!");
    return;
  }

  // Seleciona aleatoriamente um índice e remove o nome sorteado do array
  const indiceAleatorio = Math.floor(Math.random() * amigos.length);
  const amigoSorteado = amigos.splice(indiceAleatorio, 1)[0];

  // Atualiza a área de resultado para exibir somente o nome sorteado
  const ulResultado = document.getElementById("resultado");
  ulResultado.innerHTML = ""; // Limpa o resultado anterior
  const li = document.createElement("li");
  li.textContent = amigoSorteado;
  ulResultado.appendChild(li);

  // (Opcional) Atualiza a lista exibida dos amigos que ainda não foram sorteados
  atualizarListaDeAmigos();
}

function atualizarListaDeAmigos() {
  const ulLista = document.getElementById("listaAmigos");
  ulLista.innerHTML = "";
  amigos.forEach(nome => {
    const li = document.createElement("li");
    li.textContent = nome;
    ulLista.appendChild(li);
  });
}
