# Conversor-de-bases

Apresento-lhes o Conversor de Bases Website, um sistema que calcula a conversão de bases numéricas. O sistema permite que o usuário escolha a base numérica que ele deseja converter (chamamos de base de origem), qual a base de destino, depois o conversor realiza o cálculo e exibe o resultado da conversão na tela. 

# Tecnologias utilizadas

JavaScript (ES modules): implementa a lógica da interface, validação dos valores e fluxo de conversão, em App.jsx.
React: constrói a interface em componentes e atualiza os campos e resultados conforme o usuário interage. O useState guarda o estado do formulário.
HTML: fornece a estrutura inicial da página, idioma e metadados, em index.html.
CSS: define o visual, as cores, o layout responsivo e os estados dos controles, em App.css e index.css.
BigInt e recursos nativos do JavaScript: fazem os cálculos com precisão para números grandes. A conversão não usa uma biblioteca externa.
Vite: executa o servidor de desenvolvimento e gera a versão de produção do site.
npm: instala e gerencia dependências e disponibiliza os comandos do projeto, como npm run dev e npm run build.
Oxlint: verifica problemas de lint no código.
