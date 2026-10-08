ATIVIDADE PRÁTICA - FRONT-END COM http://NEXT.JS
Tema: Sistema de Checklist de Revisão Veicular
Tempo: 3 horas | Individual | Apenas Front-end (sem API, sem banco)

Contexto:
Uma empresa com 10 veículos precisa de um sistema simples para o motorista fazer o checklist diário antes de sair. Você vai criar o protótipo em http://Next.js com dados mockados.

---

TELA 1: / - Garagem / Lista de Veículos - 1h
Rota: app/page.tsx

O que deve ter:
- Grid de cards com no mínimo 6 veículos mockados. Campos no mock: id, placa, modelo, motorista, status [Apto | Inapto | Pendente], ultimaRevisao
- Selo de cor para o status: Verde=Apto, Vermelho=Inapto, Amarelo=Pendente
- Barra de busca por placa ou modelo (filtro em tempo real com useState)
- Botão "Iniciar Checklist" em cada card que leva para /checklist/[id]
- No topo: 3 contadores calculados a partir do array: Total Aptos, Inaptos, Pendentes

TELA 2: /checklist/[id] - Formulário de Checklist - 1h
Rota: app/checklist/[id]/page.tsx

É a tela principal. Ao clicar no veículo, o motorista preenche:

- Cabeçalho com Placa e Modelo do veículo selecionado
- Checklist dividido em 3 seções com checkbox (mínimo 10 itens no total):
    - Documentação: CNH, CRLV
    - Segurança: Freios, Pneus, Faróis, Cinto, Extintor
    - Operacional: Nível de óleo, Água, Combustível, Buzina, Limpador
- Ao final: Campo textarea para Observações
- Campo input type="file" para foto do hodômetro (só visual, não precisa fazer upload)
- Lógica obrigatória: Se QUALQUER item for desmarcado como reprovado, o status do veículo deve mudar automaticamente para "Inapto". Se todos OK, "Apto".
- Botão "Finalizar Revisão" que salva o resultado no estado local e redireciona para Tela 3 com alert("Checklist salvo!")

TELA 3: /relatorios - Painel do Gestor de Frota - 1h
Rota: app/relatorios/page.tsx

- 3 Cards de KPI calculados do mock: % de Frota Apta, Veículos Inaptos Hoje, Checklists Pendentes
- Tabela: "Histórico de Revisões de Hoje" com: Placa, Motorista, Horário, Status, Quem reprovou (ex: Pneus)
- Gráfico simples SEM biblioteca: Use divs com width: % para mostrar quantos itens mais reprovam. Ex:
  > Freios: ██████ 60%

  > Pneus: ████ 40%
- Botão "Exportar PDF" que só faz alert("Relatório exportado!")

REGRAS TÉCNICAS

1.  Crie data/mockVeiculos.js com o array de veículos.
2.  Proibido back-end. Tudo com useState. Se quiser persistir entre telas, use localStorage ou Context.
3.  Componentize: no mínimo components/CardVeiculo.tsx e components/ItemChecklist.tsx
4.  Responsivo para celular - o motorista vai usar no pátio.

AVALIAÇÃO

- [ ] Navegação entre as 3 telas funciona?
- [ ] Busca da Tela 1 filtra de verdade?
- [ ] Lógica da Tela 2: desmarcar 1 item já torna Inapto?
- [ ] KPIs da Tela 3 são calculados e não chumbados?
- [ ] Código organizado?

BÔNUS: Adicionar botão de Dark Mode no Header.
