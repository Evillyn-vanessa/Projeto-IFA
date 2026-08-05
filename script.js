document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================================================
     1. BANCO DE DADOS DE CONTEÚDO (Miopia, Daltonismo e Astigmatismo)
     ========================================================================== */
  const dadosDoencas = {
    miopia: {
      titulo: "Miopia",
      oqueE: "A miopia é um distúrbio visual no qual objetos próximos são vistos com clareza, mas objetos distantes parecem embaçados. Isso ocorre porque a imagem visual é focada à frente da retina, e não diretamente sobre ela.",
      causas: "Geralmente ocorre quando o globo ocular é mais longo do que o normal ou a córnea é muito curva. Fatores genéticos e o uso excessivo de telas a curta distância também influenciam o seu desenvolvimento.",
      sintomas: [
        "Visão embaçada ao olhar para objetos distantes",
        "Necessidade de apertar os olhos para enxergar claramente",
        "Dores de cabeça causadas pelo esforço visual",
        "Dificuldade para enxergar ao dirigir, especialmente à noite"
      ],
      tratamento: "O tratamento envolve o uso de óculos com lentes divergentes (negativas), lentes de contato ou cirurgia refrativa a laser (como LASIK ou PRK) para redefinir a curvatura da córnea."
    },
    daltonismo: {
      titulo: "Daltonismo (Discromatopsia)",
      oqueE: "O daltonismo é uma condição visual caracterizada pela incapacidade ou dificuldade em distinguir certas cores, mais comumente o vermelho e o verde, e raramente o azul e o amarelo.",
      causas: "É uma condição predominantemente genética e hereditária, ligada ao cromossomo X, causada pela ausência ou mau funcionamento dos fotorreceptores da retina chamados 'cones'.",
      sintomas: [
        "Dificuldade em diferenciar cores como vermelho, verde, marrom e amarelo",
        "Incapacidade de julgar tons ou a intensidade das cores",
        "Sensibilidade à luz brilhante em casos mais raros (acromatopsia)"
      ],
      tratamento: "Não há cura para o daltonismo hereditário. No entanto, óculos e lentes com filtros especiais de cor podem ajudar na distinção de certas tonalidades no dia a dia."
    },
    astigmatismo: {
      titulo: "Astigmatismo",
      oqueE: "O astigmatismo é uma imperfeição comum na curvatura da córnea ou do cristalino do olho, fazendo com que a visão fique borrada ou distorcida tanto para perto quanto para longe.",
      causas: "Ocorre quando a córnea ou o cristalino tem um formato irregular (semelhante a uma bola de futebol americano em vez de uma bola de basquete), fazendo com que a luz se refrate de maneira desigual.",
      sintomas: [
        "Visão borrada ou distorcida em qualquer distância",
        "Luzes noturnas parecendo esticadas, borradas ou com 'raios'",
        "Cansaço visual e desconforto nos olhos",
        "Dores de cabeça constantes após focar a visão"
      ],
      tratamento: "Pode ser corrigido com óculos usando lentes cilíndricas, lentes de contato rígidas ou tóricas, e cirurgias refrativas."
    }
  };

  /* ==========================================================================
     2. PERGUNTAS DO MINI-TESTE
     ========================================================================== */
  const perguntasQuiz = [
    { texto: "1. Você costuma ter dificuldade para ler placas de trânsito ou letreiros distantes?", categoria: "miopia" },
    { texto: "2. Quando você olha para luzes à noite (ex: faróis de carros), elas parecem distorcidas ou com raios espalhados?", categoria: "astigmatismo" },
    { texto: "3. Você já teve dúvidas se uma peça de roupa era verde ou marrom, vermelha ou marrom?", categoria: "daltonismo" },
    { texto: "4. Para enxergar algo distante com clareza, você precisa 'apertar' os olhos?", categoria: "miopia" },
    { texto: "5. Você sente cansaço visual ou dores de cabeça após ler por muito tempo ou usar o computador?", categoria: "astigmatismo" },
    { texto: "6. Alguém já lhe disse que uma cor que você escolheu não combinava ou que você errou o nome de uma cor?", categoria: "daltonismo" },
    { texto: "7. Objetos distantes parecem embaçados, mas quando você os aproxima consegue ver perfeitamente?", categoria: "miopia" },
    { texto: "8. A sua visão parece levemente duplicada ou borrada tanto de perto quanto de longe?", categoria: "astigmatismo" },
    { texto: "9. Você tem dificuldade em interpretar gráficos com legenda colorida?", categoria: "daltonismo" },
    { texto: "10. Você prefere sentar nas primeiras fileiras do cinema/sala de aula porque de trás fica difícil ver?", categoria: "miopia" }
  ];

  /* ==========================================================================
     3. REFERÊNCIAS ELEMENTOS DOM
     ========================================================================== */
  const telaInicial = document.getElementById("tela-inicial");
  const telaTeste = document.getElementById("tela-teste");
  const conteudoPrincipal = document.getElementById("conteudo-principal");
  const body = document.body;

  /* ==========================================================================
     4. NAVEGAÇÃO E TROCA DE CONDIÇÕES
     ========================================================================== */
  document.querySelectorAll(".btn-opcao").forEach(btn => {
    btn.addEventListener("click", () => {
      const condicao = btn.getAttribute("data-condicao");

      if (condicao === "nenhuma") {
        exibirTela(telaTeste);
        carregarQuiz();
      } else {
        carregarConteudoDoenca(condicao);
        exibirTela(conteudoPrincipal);
      }
    });
  });

  document.getElementById("btn-voltar-inicio").addEventListener("click", () => {
    exibirTela(telaInicial);
    limparEstilosDeFonte();
  });

  document.getElementById("btn-voltar-principal").addEventListener("click", () => {
    exibirTela(telaInicial);
    limparEstilosDeFonte();
  });

  function exibirTela(telaAtiva) {
    telaInicial.classList.add("escondido");
    telaTeste.classList.add("escondido");
    conteudoPrincipal.classList.add("escondido");

    telaAtiva.classList.remove("escondido");
    window.scrollTo(0, 0);
  }

  function carregarConteudoDoenca(condicao) {
    const dados = dadosDoencas[condicao];
    limparEstilosDeFonte();

    // Aplica a classe de fonte específica no body
    body.classList.add(`fonte-${condicao}`);

    // Preenche os dados
    document.getElementById("titulo-condicao").innerText = dados.titulo;
    document.getElementById("texto-oque-e").innerText = dados.oqueE;
    document.getElementById("texto-causas").innerText = dados.causas;
    document.getElementById("texto-tratamento").innerText = dados.tratamento;

    const listaSintomas = document.getElementById("lista-sintomas");
    listaSintomas.innerHTML = "";
    dados.sintomas.forEach(sintoma => {
      const li = document.createElement("li");
      li.innerText = sintoma;
      listaSintomas.appendChild(li);
    });
  }

  function limparEstilosDeFonte() {
    body.classList.remove("fonte-miopia", "fonte-daltonismo", "fonte-astigmatismo");
  }

  /* ==========================================================================
     5. LÓGICA DO MINI-TESTE / QUIZ
     ========================================================================== */
  function carregarQuiz() {
    const container = document.getElementById("perguntas-container");
    container.innerHTML = "";
    document.getElementById("resultado-quiz").classList.add("escondido");

    perguntasQuiz.forEach((q, index) => {
      const div = document.createElement("div");
      div.className = "item-pergunta";
      div.innerHTML = `
        <p>${q.texto}</p>
        <div class="opcoes-resposta">
          <label><input type="radio" name="p${index}" value="sim" data-cat="${q.categoria}"> Sim</label>
          <label><input type="radio" name="p${index}" value="nao" checked> Não</label>
        </div>
      `;
      container.appendChild(div);
    });
  }

  document.getElementById("btn-resultado-quiz").addEventListener("click", () => {
    const contagem = { miopia: 0, daltonismo: 0, astigmatismo: 0 };
    
    perguntasQuiz.forEach((_, index) => {
      const selecionado = document.querySelector(`input[name="p${index}"]:checked`);
      if (selecionado && selecionado.value === "sim") {
        const cat = selecionado.getAttribute("data-cat");
        contagem[cat]++;
      }
    });

    let recomendacao = "";
    let maxVotos = Math.max(contagem.miopia, contagem.daltonismo, contagem.astigmatismo);

    if (maxVotos === 0) {
      recomendacao = "Você respondeu 'Não' para a maioria das questões. Parece que sua visão vai bem! No entanto, exames de rotina são sempre recomendados.";
    } else {
      let sugestoes = [];
      if (contagem.miopia === maxVotos) sugestoes.push("Miopia (dificuldade de longe)");
      if (contagem.astigmatismo === maxVotos) sugestoes.push("Astigmatismo (visão borrada/luzes distorcidas)");
      if (contagem.daltonismo === maxVotos) sugestoes.push("Daltonismo (distinção de cores)");

      recomendacao = `Com base nas suas respostas, é aconselhável dar uma pesquisada e consultar um profissional em relação a: **${sugestoes.join(" e ")}**.`;
    }

    document.getElementById("texto-feedback").innerText = recomendacao;
    document.getElementById("resultado-quiz").classList.remove("escondido");
  });

  document.getElementById("btn-refazer-quiz").addEventListener("click", carregarQuiz);

  /* ==========================================================================
     6. RECURSOS DE ACESSIBILIDADE (ZOOM & MODO ESCURO)
     ========================================================================== */
  let tamanhoFonteAtual = 100;

  document.getElementById("btn-zoom-in").addEventListener("click", () => {
    if (tamanhoFonteAtual < 150) {
      tamanhoFonteAtual += 10;
      document.documentElement.style.fontSize = `${tamanhoFonteAtual}%`;
    }
  });

  document.getElementById("btn-zoom-out").addEventListener("click", () => {
    if (tamanhoFonteAtual > 80) {
      tamanhoFonteAtual -= 10;
      document.documentElement.style.fontSize = `${tamanhoFonteAtual}%`;
    }
  });

  // Alternar Modo Escuro
  document.getElementById("btn-modo-escuro").addEventListener("click", () => {
    body.classList.toggle("modo-escuro");
    const btn = document.getElementById("btn-modo-escuro");
    if (body.classList.contains("modo-escuro")) {
      btn.innerText = "☀️ Modo Claro";
    } else {
      btn.innerText = "🌙 Modo Escuro";
    }
  });

  /* ==========================================================================
     7. SIMULADOR VISUAL INTEGRADO
     ========================================================================== */
  const btnDaltonismo = document.getElementById("sim-daltonismo");
  const btnAstigmatismo = document.getElementById("sim-astigmatismo");
  const btnReset = document.getElementById("sim-reset");

  btnDaltonismo.addEventListener("click", () => {
    body.classList.remove("simulando-astigmatismo");
    body.classList.add("simulando-daltonismo");
  });

  btnAstigmatismo.addEventListener("click", () => {
    body.classList.remove("simulando-daltonismo");
    body.classList.add("simulando-astigmatismo");
  });

  btnReset.addEventListener("click", () => {
    body.classList.remove("simulando-daltonismo", "simulando-astigmatismo");
  });
});