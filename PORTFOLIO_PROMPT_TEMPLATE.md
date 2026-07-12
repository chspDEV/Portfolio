# Template de Prompt: Criando seu Portfólio de Game Dev com IA

Este documento é um guia e um template de prompt para que você (ou seus colegas) possam copiar, preencher com suas informações e enviar para uma IA (como o AntiGravity, ChatGPT, Claude) criar um portfólio completo, dinâmico e hospedado gratuitamente.

---

## 📋 Como usar este arquivo
1. **[IMPORTANTE]** Se estiver usando o **AntiGravity** no VS Code, certifique-se de estar conectado à sua conta do GitHub na aba de "Source Control" (Controle de Código-Fonte) no menu lateral! Isso permite que a IA crie o repositório e faça o push pra você.
2. Copie o bloco de texto abaixo da linha divisória.
3. Substitua os textos entre colchetes `[ ]` com as suas próprias informações.
4. **[DICA DE OURO]** Na hora de enviar o prompt para a IA, faça também o upload do seu Currículo (PDF) no chat para que ela já extraia toda a sua experiência automaticamente!
5. Envie para a sua IA favorita e siga as instruções.

---

## 🚀 O Prompt (Copie a partir daqui)

**Contexto:**
Você é um desenvolvedor web sênior e vai me ajudar a programar do zero o meu Portfólio. 

O portfólio deve ser feito puramente usando **HTML, CSS (Vanilla) e JavaScript**. Não use frameworks complexos como React ou Next.js, pois quero hospedar tudo estaticamente de forma simples.

---

### 1. Meu Perfil e Foco
*Por favor IA, use as informações abaixo e o meu currículo em anexo (se houver) para moldar os textos do site:*
- **Área de Atuação:** [Ex: Game Developer / Artista 3D / Sound Designer]
- **Foco Principal do Perfil:** [Ex: Mostrar minhas habilidades avançadas em C# e Unity / Destacar minha arte pixelada / Focar em level design]
- **Idiomas do Portfólio:** [Ex: Apenas Inglês / Português e Inglês (com botão para alternar)]

### 2. Estética Visual
- **Vibe Geral:** [SUA ESTÉTICA PREFERIDA AQUI, ex: Clean e Moderna / Dark Mode Minimalista / Cyberpunk / Retrô 8-bit]
- **Cores Principais:** [SUAS CORES PREFERIDAS AQUI, ex: Fundo escuro azulado com acentos ciano / Fundo branco com destaques em laranja]
- **Tipografia:** Combine as fontes com a estética escolhida, mas sempre mantenha uma fonte limpa e sem serifa para textos longos de descrição, garantindo total acessibilidade para recrutadores.

### 3. Minhas Informações de Contato
- **Nome:** [SEU NOME AQUI]
- **Email:** [SEU EMAIL AQUI]
- **Discord:** [SEU DISCORD AQUI]
- **Link do LinkedIn:** [SEU LINKEDIN AQUI]
- **Link do GitHub:** [SEU GITHUB AQUI]
- **Link do Itch.io (ou ArtStation):** [SEU ITCH.IO AQUI]

---

### 4. Arquitetura e Funcionalidades Exigidas:
1. **Página Inicial (`index.html`)**: Deve conter uma seção "Sobre Mim", "Trajetória/Experiência", "Projetos em Destaque" e links para minhas redes sociais no Footer.
2. **Sistema Data-Driven (JSON)**: Crie um arquivo `data/projects.js` (ou json) onde eu possa cadastrar os meus jogos (título, descrição, o que eu aprendi, imagem). Crie uma página genérica `project.html` que leia os dados desse JSON via URL (`project.html?id=meujogo`) e gere a página do projeto dinamicamente.
3. **Integração com GitHub**: Use a API pública do GitHub (`fetch('https://api.github.com/users/[SEU_USUARIO_AQUI]/repos')`) no JavaScript para listar meus projetos de estudo mais recentes automaticamente na página inicial.
4. **Sistema de Idiomas (i18n)** *(Se aplicável)*: Implemente um botão na navbar que alterne o site inteiro entre os idiomas escolhidos instantaneamente. Guarde a preferência no `localStorage`.

### 5. Deploy / Hospedagem:
Após gerarmos o código, por favor, me dê o passo a passo exato via terminal (`git`) de como eu subo esse repositório local para a minha conta do GitHub e como eu ativo o **GitHub Pages** para que o site fique no ar gratuitamente de forma automática a cada "git push".

Por favor, comece me fazendo qualquer pergunta adicional que precisar e, em seguida, me envie o código base do `index.html` e `style.css`!
