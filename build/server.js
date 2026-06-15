import express from "express";
import cors from 'cors';
const app = express();
const PORTA = 3000;
// MIDDLEWARES OBRIGATÓRIOS
app.use(cors()); // Permite que o Front-end consuma esta API mesmo estando em portas diferentes
app.use(express.json()); // Configura o servidor para conseguir ler corpos de requisição formatados em JSON
// BANCO DE DADOS EM MEMÓRIA (ARRAY TIPADO)
// Substitui temporariamente o uso de bancos de dados relacionais nesta etapa inicial
app.use(express.static('Client'));
const bancoDadosMemoria = [
    {
        id: "1718112000000",
        titulo: "Exemplo Inicial",
        descricao: "Item padrão inserido automaticamente para testes de listagem.",
        dataCriacao: new Date().toISOString()
    }
];
// ROTA 1: GET /recurso (Listagem de Dados)
app.get('/items', (req, res) => {
    // Retorna o status HTTP 200 (OK) e o array completo convertido em JSON
    res.status(200).json(bancoDadosMemoria);
});
// ROTA 2: POST /recurso (Cadastro de Dados)
app.post('/items', (req, res) => {
    const { titulo, descricao } = req.body;
    // Validação básica de consistência de dados recebidos no corpo
    if (!titulo || !descricao) {
        res.status(400).json({ erro: "Campos obrigatórios ausentes: 'titulo' e 'descricao'." });
        return;
    }
    // Construção do novo registro seguindo estritamente a Interface IItemSistema
    const novoItem = {
        id: Date.now().toString(), // Gera ID único baseado no timestamp atual
        titulo: String(titulo),
        descricao: String(descricao),
        dataCriacao: new Date().toISOString()
    };
    // Salvando o dado temporariamente no array
    bancoDadosMemoria.push(novoItem);
    // Retorna o status HTTP 201 (Created) e o objeto recém-criado para o cliente
    res.status(201).json(novoItem);
});
// Inicialização do Servidor Local
app.listen(PORTA, () => {
    console.log(`[SERVIDOR] API rodando com sucesso em http://localhost:${PORTA}`);
});
//# sourceMappingURL=server.js.map