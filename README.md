# Kanban

App de Kanban (ferramenta de produtividade) em React.

Realizado como teste de Desenvolvimento Front-End para [Amopromo](https://gist.github.com/LeonardoMarco/9a9615bd425854fe15e963d5d06c715d).

Você pode visualizar aqui: [https://kind-kepler.netlify.app/](https://kind-kepler.netlify.app/)

Para rodar localmente, baixe o repositório e execute os seguintes comandos:

```
npm i

npm run build

npm i -g serve

serve -s build
```

## Recursos

- Arraste e solte para reorganizar os cartões entre as colunas.
- Para adicionar colunas e/ou tarefas, clique no botão e digite o nome. O novo item será salvo ao pressionar Enter ou clicar fora do campo. Esc cancela o processo.
- Para adicionar tags, digite o nome e pressione Enter.
- Para mudar o ícone no topo das colunas, clique e escolha a opção desejada. 😃

## Testes

```
npm run test
```

## Bibliotecas

- React
- styled-components
- styled-reset
- react-beautiful-dnd
- react-tag-input
- emoji-mart
- redux
- react-redux
- uuid

NodeJS versão 16.6.2