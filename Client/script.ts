const URL_API = '/items';
// Mapeamento explícito de elementos do DOM com asserção de tipos correta
const form = document.getElementById('formCadastro') as HTMLFormElement;
const inputTitulo = document.getElementById('txtTitulo') as HTMLInputElement;
const inputDescricao = document.getElementById('txtDescricao') as HTMLTextAreaElement;
const listaContainer = document.getElementById('listaContainer') as HTMLDivElement;
// FUNÇÃO ASSÍNCRONA: Buscar itens da API e renderizar na tela
async function carregarElementos(): Promise<void> {
try {
const resposta = await fetch(URL_API);
if (!resposta.ok) throw new Error("Erro ao conectar na API de listagem.");
const dados = await resposta.json();
// Limpa o aviso de carregamento
 listaContainer.innerHTML = "";
if (dados.length === 0) {
 listaContainer.innerHTML = "<p>Nenhum item cadastrado no servidor.</p>";
return;
 }
// Mapeamento estruturado e criação dinâmica de elementos em tela
 dados.forEach((item: any) => {
const card = document.createElement('div');
 card.className = 'card-item';
 card.innerHTML = `
 <h3>${item.titulo}</h3>
 <p>${item.Autor}</p>
 <small>Cadastrado em: ${new Date(item.dataPublicacao).toLocaleString()}</
small>
 `;
 listaContainer.appendChild(card);
 });
 } catch (erro) {
 console.error("[ERRO FRONTE]", erro);
 listaContainer.innerHTML = "<p style='color:red;'>Erro de rede ao buscar registros.</p>";
 }
}
// EVENTO DE SUBMISSÃO DO FORMULÁRIO
form.addEventListener('submit', async (evento: SubmitEvent) => {
 evento.preventDefault(); // Impede o recarregamento clássico da página
const cargaUtil = {
 titulo: inputTitulo.value.trim(),
 Autor: inputDescricao.value.trim()
 };
try {
const resposta = await fetch(URL_API, {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify(cargaUtil) // Transforma o objeto em string JSON para a rede
 });
if (resposta.status === 201) {
// Limpa os campos do formulário se salvou corretamente
 form.reset();
// Atualiza a lista automaticamente na tela
await carregarElementos();
 } else {
 alert("Falha ao cadastrar item no servidor.");
 }
 } catch (erro) {
 alert("Servidor offline ou falha crítica de rede externa.");
 }
});
// DISPARO AUTOMÁTICO INICIAL AO ABRIR O NAVEGADOR
carregarElementos();