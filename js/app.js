const botao = document.getElementById("buscar");
const resultado = document.getElementById("resultado");

botao.addEventListener("click", async () => {
  // 1️⃣ Captura os valores do formulário
  const signo = document.getElementById("signo").value;
  const grau = document.getElementById("grau").value;

  // 2️⃣ VALIDAÇÃO DO SIGNO (AQUI)
  if (!signo) {
    resultado.innerHTML = "<p>Selecione um signo.</p>";
    return;
  }

  // 3️⃣ VALIDAÇÃO DO GRAU
  if (grau < 0 || grau > 29 || grau === "") {
    resultado.innerHTML = "<p>Informe um grau entre 0 e 29.</p>";
    return;
  }

  // 4️⃣ Carrega o JSON
  const resposta = await fetch("data/monomeros.json");
  const dados = await resposta.json();

  // 5️⃣ Busca o grau do signo
  const item = dados[signo]?.[grau];

  // 6️⃣ Verifica se existe
  if (!item) {
    resultado.innerHTML = "<p>Grau não encontrado.</p>";
    return;
  }

  // 7️⃣ Exibe o resultado
  resultado.innerHTML = `
    <p>${item.frase}</p>
    <img src="images/monomeros/${item.imagem}" alt="Imagem simbólica do grau">
  `;
});
