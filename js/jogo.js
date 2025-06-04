// Declaração das variáveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

// Captura os botões pelos ids e adiciona um evento de clique
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

// Função que zera os valores das variáveis controladoras
function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogarNovamente();
  atualizaPlacar(0, 0);
  btnJogarNovamente.className = 'visivel';
  btnReiniciar.className = 'invisivel';
}

// Função jogar novamente
function jogarNovamente() {
  jogar = true;
  let divis = document.getElementsByTagName("div");
  for (let i = 0; i < divis.length; i++) {
    if (["0", "1", "2", "3"].includes(divis[i].id)) {
      divis[i].className = "inicial";
      divis[i].innerHTML = divis[i].id;
    }
  }

  let imagem = document.getElementById("imagem");
  if (imagem) {
    imagem.remove();
  }

  let imagemErro = document.getElementById("imagemErro");
  if (imagemErro) {
    imagemErro.remove();
  }
}

// Função que atualiza o placar
function atualizaPlacar(acertos, tentativas) {
  desempenho = (acertos / tentativas) * 100;
  document.getElementById("resposta").innerHTML =
    "Placar - Acertos: " + acertos +
    " Tentativas: " + tentativas +
    " Desempenho: " + Math.round(desempenho) + "%";
}

// ✅ Função unificada para mostrar acertos e erros
function mostrarResultado(obj, tipo) {
  let classe, idImagem, urlImagem, limparConteudo;

  if (tipo === "acerto") {
    classe = "acertou";
    idImagem = "imagem";
    urlImagem = "https://i1.sndcdn.com/avatars-000040422234-su9tw5-t1080x1080.jpg";
    limparConteudo = false;
  } else if (tipo === "erro") {
    classe = "errou";
    idImagem = "imagemErro";
    urlImagem = "https://www.nicelembrancinhas.com.br/image/cache/catalog/DIVERTIDAMENTE/TRISTEZA-650x650.jpg";
    limparConteudo = true;
  } else {
    console.error("Tipo inválido para mostrarResultado");
    return;
  }

  if (limparConteudo) {
    obj.innerHTML = "";
  }

  obj.className = classe;

  const img = new Image(100);
  img.id = idImagem;
  img.src = urlImagem;
  obj.appendChild(img);
}

// Função que sorteia um número aleatório entre 0 e 3 e verifica se o jogador acertou
function verifica(obj) {
  if (jogar) {
    jogar = false;
    tentativas++;

    let sorteado = Math.floor(Math.random() * 4);

    if (obj.id == sorteado) {
      mostrarResultado(obj, "acerto");
      acertos++;
    } else {
      mostrarResultado(obj, "erro");

      const objSorteado = document.getElementById(sorteado);
      mostrarResultado(objSorteado, "acerto");
    }

    atualizaPlacar(acertos, tentativas);

    if (tentativas == 5) {
      btnJogarNovamente.className = 'invisivel';
      btnReiniciar.className = 'visivel';
    }
  } else {
    alert('Clique em "Jogar novamente"');
  }
}

// Adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);