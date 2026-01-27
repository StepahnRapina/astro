const botao = document.getElementById("buscar");
const resultado = document.getElementById("resultado");

botao.addEventListener("click", async (event) => {
  event.preventDefault();

  const signo = document
    .getElementById("signo")
    .value.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const grau = document.getElementById("grau").value;

  if (!signo) {
    resultado.innerHTML = "<p>Selecione um signo.</p>";
    return;
  }

  if (grau === "" || grau < 1 || grau > 30) {
    resultado.innerHTML = "<p>Informe um grau entre 1 e 30.</p>";
    return;
  }

  const resposta = await fetch("data/monomeros.json");
  const dados = await resposta.json();

  const item = dados[signo]?.[grau];

  if (!item) {
    resultado.innerHTML = "<p>Grau não encontrado.</p>";
    return;
  }

  const imgPath = `images/monomeros/${item.imagem}`;
  const fallbackPath = "images/monomeros/fallback.png";

  resultado.innerHTML = `
    <h2 class="titulo-grau">${item.titulo}</h2>
    <p class="frase-grau">${item.frase}</p>

    <img 
      src="${imgPath}" 
      alt="Imagem simbólica do grau"
      onerror="this.onerror=null; this.src='${fallbackPath}'"
    >

    <div class="texto-estruturado">
      <p><strong>Figura.</strong> ${item.texto.figura}</p>
      <p><strong>Comentário.</strong> ${item.texto.comentario}</p>
      <p><strong>Correspondências.</strong> ${item.texto.correspondencias}</p>
      <p><strong>Advertência.</strong> ${item.texto.advertencia}</p>
    </div>
  `;
});
