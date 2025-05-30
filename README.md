# Gerenciador de Vendas

Este é um projeto pessoal desenvolvido com o objetivo de criar uma aplicação funcional para gerenciar produtos, vendas, estoque e processos, utilizando tecnologias modernas de desenvolvimento web.

## 🚀 Funcionalidades

- **Gerenciamento de Produtos**: Criação, edição, ativação/inativação e listagem de produtos.
- **Gerenciamento de Vendas**: Criação, edição, exclusão e listagem de vendas, incluindo a associação de produtos às vendas.
- **Gerenciamento de estoque**: Criação, edição, exclusão e listagem de materiais.
- **Interface Responsiva**: Design adaptado para diferentes tamanhos de tela.
- **Feedback ao Usuário**: Mensagens de erro e sucesso para ações realizadas.

## 🛠️ Tecnologias Utilizadas

- **Frontend**:
  - React com TypeScript
  - React Router para navegação
  - React Query para gerenciamento de estado assíncrono
  - TailwindCSS para estilização
  - Axios para requisições HTTP
  - React Icons para ícones
  - Framer Motion para animações

- **Backend** (não incluído neste repositório):
    - Desenvolvido com Node.js, Express, Prisma e MySQL.
    - Possui um repositório próprio com instruções detalhadas no README.
    - Repositório do backend: [Gerenciador de Vendas Backend](https://github.com/Olieveira/sales-management-backend).

## 📦 Estrutura do Projeto

- **src/components**: Componentes reutilizáveis.
- **src/pages**: Páginas principais da aplicação.
- **src/services**: Serviços para comunicação com a API.
- **src/hooks**: Hooks personalizados para gerenciamento de dados.
- **src/layouts**: Layouts compartilhados.
- **src/routes.tsx**: Configuração das rotas da aplicação.

## ⚙️ Instalação e Execução

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/Olieveira/sales-management-frontend.git
   cd sales-management-frontend
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure a API**:
   - Certifique-se de que a API backend está rodando e atualize a URL base no arquivo `src/api/api.ts`.

4. **Execute o projeto**:
   ```bash
   npm run dev
   ```

5. **Acesse no navegador**:
   - Acesse `http://localhost:5173` para visualizar a aplicação.

## 📝 Observações Importantes

- **Projeto Acadêmico**: Este projeto pode não atender a todos os padrões de produção.

## 📌 Próximas funcionalidades:

- **Fornecedores**: Página e respectivas funções para gestão do cadastro de fornecedores.
- **Fabricação**: Página para gerir processos de fabricação e materiais utilizados.

---

- **Licença**: Este projeto está licenciado sob a [Creative Commons BY-NC 4.0](LICENSE), permitindo uso não comercial com atribuição.


**Autor**: [Nathan Oliveira](https://github.com/olieveira)  
