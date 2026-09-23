# Amigo Secreto

Sorteador de amigo secreto: adicione os participantes e sorteie — cada pessoa
descobre, individualmente, quem ela vai presentear.

## O que mudou nesta versão

- **Sorteio corrigido**: antes o app só sorteava nomes aleatórios de uma lista
  (sem dizer quem presenteia quem). Agora ele gera um sorteio completo em que
  ninguém tira o próprio nome, e cada participante revela seu resultado
  clicando no próprio nome — ideal pra usar numa tela compartilhada.
- Bloqueio de nomes duplicados/vazios com mensagem inline (sem `alert()`).
- Adicionar com Enter, remover nome antes do sorteio, mínimo de 3 participantes.
- Lista salva no navegador (`localStorage`) — não perde ao recarregar a página.
- Acessibilidade: foco de teclado visível, `aria-live` nas mensagens, labels.
- Suporte automático a tema claro/escuro.
- Visual novo (tipografia Fraunces + Inter, layout em formato de etiqueta).

## Rodando localmente

Basta abrir o `index.html` no navegador — não tem build nem dependências.

## Estrutura

```
index.html
style.css
app.js
```
