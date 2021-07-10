/* O que é o Canvas: É um elemento da HTML5 destinado a delimitar uma área para renderização dinâmica de gráficos. Todo o trabalho de criação e animação é realizado através de linguagens de programação dinâmica (usualmente Javascript). [1]

O elemento foi originalmente introduzido pela Apple Inc. para o navegador Safari.*/
console.log("Flappy Bird");

let frames = 0;
//Setar efeito de som
const som_HIT = new Audio();
som_HIT.src = "efeitos/hit.wav";

//Seta Imagem
const sprites = new Image();
//Seta caminho da imagem
sprites.src = "sprites.png";

//Pega a tag 'canvas' dentro do documento
const canvas = document.querySelector("canvas");
//O metodo HTMLCanvasElement.getContext() retorna um contexto de desenho no canvas, ou null se o contexto identificado não é suportado.
const contexto = canvas.getContext("2d");

//DESENHAR O PLANO DE FUNDO (BACKGROUND)
const planoDeFundo = {
  sprinteX: 390,
  sprinteY: 0,
  largura: 275,
  altura: 204,
  x: 0,
  y: canvas.height - 204,
  desenha() {
    contexto.fillStyle = "#70c5ce";
    contexto.fillRect(0, 0, canvas.width, canvas.height);
    contexto.drawImage(
      //passa a imagem
      sprites,
      //define os valores
      planoDeFundo.sprinteX,
      planoDeFundo.sprinteY, //Posicione a imagem na tela
      planoDeFundo.largura,
      planoDeFundo.altura, //Posicione a imagem na tela e especifique a largura e a altura da imagem
      planoDeFundo.x,
      planoDeFundo.y, //Recorte a imagem
      planoDeFundo.largura,
      planoDeFundo.altura //posicione a parte recortada na tela
    );

    contexto.drawImage(
      //passa a imagem
      sprites,
      //define os valores
      planoDeFundo.sprinteX,
      planoDeFundo.sprinteY, //Posicione a imagem na tela
      planoDeFundo.largura,
      planoDeFundo.altura, //Posicione a imagem na tela e especifique a largura e a altura da imagem
      planoDeFundo.x + planoDeFundo.largura,
      planoDeFundo.y, //Recorte a imagem
      planoDeFundo.largura,
      planoDeFundo.altura //posicione a parte recortada na tela
    );
  },
};

// DESENHAR O CHÃO
function criaChao() {
  const chao = {
    sprinteX: 0,
    sprinteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    atualiza() {
      const movimentoDoChao = 1;
      const repeteEm = chao.largura / 2;
      const movimentacao = chao.x - movimentoDoChao;
      chao.x = movimentacao % repeteEm;
    },
    desenha() {
      contexto.drawImage(
        //passa a imagem
        sprites,
        //define os valores
        chao.sprinteX,
        chao.sprinteY, //Posicione a imagem na tela
        chao.largura,
        chao.altura, //Posicione a imagem na tela e especifique a largura e a altura da imagem
        chao.x,
        chao.y, //Recorte a imagem
        chao.largura,
        chao.altura //posicione a parte recortada na tela
      );
      //Duplicar a imagem do chão
      contexto.drawImage(
        //passa a imagem
        sprites,
        //define os valores
        chao.sprinteX,
        chao.sprinteY, //Posicione a imagem na tela
        chao.largura,
        chao.altura, //Posicione a imagem na tela e especifique a largura e a altura da imagem
        chao.x + chao.largura,
        chao.y, //Recorte a imagem
        chao.largura,
        chao.altura //posicione a parte recortada na tela
      );
    },
  };
  return chao;
}

function fazColisao(flappyBird, chao) {
  const flappyBirdY = flappyBird.y + flappyBird.altura;
  const chaoY = chao.y;

  if (flappyBirdY >= chaoY) {
    return true;
  }

  return false;
}

//Estrutura para criar a imagem do FlappyBird
function criaFlappyBird() {
  const flappyBird = {
    sprinteX: 0,
    sprinteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    //Definir tamanho do pulo
    pulo: 4.6,
    //Ao click, o passaro vai pular
    pula() {
      flappyBird.velocidade = -flappyBird.pulo;
    },

    //atualizar e fazer o bird cair
    gravidade: 0.25,
    velocidade: 0,
    atualiza() {
      if (fazColisao(flappyBird, globais.chao)) {
        som_HIT.play();
        mudaParaTela(Telas.GAME_OVER);
        return;
      }
      flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
      flappyBird.y = flappyBird.y + flappyBird.velocidade;
    },

    //Fazer com que o bird movimenta a asa
    movimentos: [
      { sprinteX: 0, sprinteY: 0 }, //asa pra cima
      { sprinteX: 0, sprinteY: 26 }, //asa no meio
      { sprinteX: 0, sprinteY: 52 }, //asa pra baixo
    ],
    frameAtual: 0,
    atualizaOFrameAtual() {
      const intervaloDeFrames = 10;
      const passouOIntervalo = frames % intervaloDeFrames === 0;

      if (passouOIntervalo) {
        const baseDoIncremento = 1;
        const incremento = baseDoIncremento + flappyBird.frameAtual;
        const baseRepeticao = flappyBird.movimentos.length;
        flappyBird.frameAtual = incremento % baseRepeticao;
      }
    },
    //Função para ficar chamando em loop a imagem do bird (passaro). a função drawImage vai posicionar e especificar a largarua e altura da imagem e recortar a imagem
    desenha() {
      flappyBird.atualizaOFrameAtual();
      const { sprinteX, sprinteY } =
        flappyBird.movimentos[flappyBird.frameAtual];

      contexto.drawImage(
        //passa a imagem
        sprites,
        //define os valores
        sprinteX,
        sprinteY, //Posicione a imagem na tela
        flappyBird.largura,
        flappyBird.altura, //Posicione a imagem na tela e especifique a largura e a altura da imagem
        flappyBird.x,
        flappyBird.y, //Recorte a imagem
        flappyBird.largura,
        flappyBird.altura //posicione a parte recortada na tela
      );
    },
  };
  return flappyBird;
}

// DESENHAR A MENSAGEM GET READY
const mensagemGetReady = {
  sprinteX: 134,
  sprinteY: 0,
  largura: 174,
  altura: 152,
  x: canvas.width / 2 - 174 / 2,
  y: 50,

  //Função para ficar chamando em loop a imagem . a função drawImage vai posicionar e especificar a largarua e altura da imagem e recortar a imagem
  desenha() {
    contexto.drawImage(
      //passa a imagem
      sprites,
      //define os valores
      mensagemGetReady.sprinteX,
      mensagemGetReady.sprinteY, //Posicione a imagem na tela
      mensagemGetReady.largura,
      mensagemGetReady.altura, //Posicione a imagem na tela e especifique a largura e a altura da imagem
      mensagemGetReady.x,
      mensagemGetReady.y, //Recorte a imagem
      mensagemGetReady.largura,
      mensagemGetReady.altura //posicione a parte recortada na tela
    );
  },
};

const mensagemGameOver = {
  sprinteX: 134,
  sprinteY: 153,
  largura: 226,
  altura: 200,
  x: canvas.width / 2 - 226 / 2,
  y: 50,

  //Função para ficar chamando em loop a imagem . a função drawImage vai posicionar e especificar a largarua e altura da imagem e recortar a imagem
  desenha() {
    contexto.drawImage(
      //passa a imagem
      sprites,
      //define os valores
      mensagemGameOver.sprinteX,
      mensagemGameOver.sprinteY, //Posicione a imagem na tela
      mensagemGameOver.largura,
      mensagemGameOver.altura, //Posicione a imagem na tela e especifique a largura e a altura da imagem
      mensagemGameOver.x,
      mensagemGameOver.y, //Recorte a imagem
      mensagemGameOver.largura,
      mensagemGameOver.altura //posicione a parte recortada na tela
    );
  },
};

//DESENHAR CANOS
function criaCanos() {
  const canos = {
    largura: 52,
    altura: 400,
    chao: {
      spriteX: 0,
      spriteY: 169,
    },
    ceu: {
      spriteX: 52,
      spriteY: 169,
    },
    espaco: 80,
    desenha() {
      canos.pares.forEach(function (par) {
        const yRandom = par.y;
        const espacamentoEntreCanos = 90;

        const canoCeuX = par.x;
        const canoCeuY = yRandom;

        // [Cano do Céu]
        contexto.drawImage(
          sprites,
          canos.ceu.spriteX,
          canos.ceu.spriteY,
          canos.largura,
          canos.altura,
          canoCeuX,
          canoCeuY,
          canos.largura,
          canos.altura
        );

        // [Cano do Chão]
        const canoChaoX = par.x;
        const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;
        contexto.drawImage(
          sprites,
          canos.chao.spriteX,
          canos.chao.spriteY,
          canos.largura,
          canos.altura,
          canoChaoX,
          canoChaoY,
          canos.largura,
          canos.altura
        );

        par.canoCeu = {
          x: canoCeuX,
          y: canos.altura + canoCeuY,
        };
        par.canoChao = {
          x: canoChaoX,
          y: canoChaoY,
        };
      });
    },
    temColisaoComOFlappyBird(par) {
      const cabecaDoFlappy = globais.flappyBird.y;
      const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura;

      if (globais.flappyBird.x + globais.flappyBird.largura >= par.x) {
        if (cabecaDoFlappy <= par.canoCeu.y) {
          return true;
        }

        if (peDoFlappy >= par.canoChao.y) {
          return true;
        }
      }
      return false;
    },
    pares: [],
    atualiza() {
      const passou100Frames = frames % 100 === 0;
      if (passou100Frames) {
        console.log("Passou 100 frames");
        canos.pares.push({
          x: canvas.width,
          y: -150 * (Math.random() + 1),
        });
      }

      canos.pares.forEach(function (par) {
        par.x = par.x - 2;

        if (canos.temColisaoComOFlappyBird(par)) {
          console.log("Você perdeu!");
          som_HIT.play();
          mudaParaTela(Telas.GAME_OVER);
        }

        if (par.x + canos.largura <= 0) {
          canos.pares.shift();
        }
      });
    },
  };

  return canos;
}

function criarPlacar() {
  const placar = {
    pontuacao: 0,
    desenha() {
      contexto.font = '35px "VT323"';
      contexto.textAlign = "right";
      contexto.fillStyle = "white";
      contexto.fillText(`${placar.pontuacao}`, canvas.width - 15, 35);
    },
    atualiza() {
      const intervaloDeFrames = 20;
      const passouOIntervalo = frames % intervaloDeFrames === 0;

      if (passouOIntervalo) {
        placar.pontuacao = placar.pontuacao + 1;
      }
    },
  };
  return placar;
}

//TELAS
const globais = {};
let telaAtiva = {};

function mudaParaTela(novaTela) {
  telaAtiva = novaTela;

  if (telaAtiva.inicializa) {
    telaAtiva.inicializa();
  }
}

const Telas = {
  INICIO: {
    inicializa() {
      globais.flappyBird = criaFlappyBird();
      globais.chao = criaChao();
      globais.canos = criaCanos();
    },
    desenha() {
      planoDeFundo.desenha();
      globais.flappyBird.desenha();
      globais.chao.desenha();
      mensagemGetReady.desenha();
    },
    click() {
      mudaParaTela(Telas.JOGO);
    },
    atualiza() {
      globais.chao.atualiza();
    },
  },
};

Telas.JOGO = {
  inicializa() {
    globais.placar = criarPlacar();
  },
  desenha() {
    planoDeFundo.desenha();
    globais.canos.desenha();
    globais.chao.desenha();
    globais.flappyBird.desenha();
    globais.placar.desenha();
  },
  click() {
    globais.flappyBird.pula();
  },
  //Deve-se chamar esse método sempre que estiver pronto para atualizar a animação na tela
  atualiza() {
    globais.canos.atualiza();
    globais.chao.atualiza();
    globais.flappyBird.atualiza();
    globais.placar.atualiza();
  },
};

Telas.GAME_OVER = {
  desenha() {
    mensagemGameOver.desenha();
  },
  atualiza() {},

  click() {
    mudaParaTela(Telas.INICIO);
  },
};

//Função que vai sempre estar em loop
function loop() {
  telaAtiva.desenha();
  telaAtiva.atualiza();

  frames = frames + 1;
  requestAnimationFrame(loop);
}

//Pegar o evento click
window.addEventListener("click", function () {
  if (telaAtiva.click) {
    telaAtiva.click();
  }
});

//O Start do jogo vai ser:
mudaParaTela(Telas.INICIO);
//Chama a função loop
loop();
