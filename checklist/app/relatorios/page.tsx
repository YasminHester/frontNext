"use client";

import { useEffect, useState } from "react";
import mockVeiculos from "@/data/mockVeiculos";

interface ResultadoChecklist {
  id: number;
  placa: string;
  modelo: string;
  motorista: string;
  status: string;
  observacoes: string;
  reprovados: string[];
  horario: string;
}

export default function Relatorios() {
  const [revisoes, setRevisoes] = useState<ResultadoChecklist[]>([]);

  useEffect(() => {
    const resultados: ResultadoChecklist[] = [];

    mockVeiculos.forEach((veiculo) => {
      const dados = localStorage.getItem(
        `checklist-${veiculo.id}`
      );

      if (dados) {
        resultados.push(JSON.parse(dados));
      }
    });

    setRevisoes(resultados);
  }, []);

  const totalVeiculos = mockVeiculos.length;

  const aptos =
    mockVeiculos.filter(
      (veiculo) => veiculo.status === "Apto"
    ).length;

  const inaptos =
    mockVeiculos.filter(
      (veiculo) => veiculo.status === "Inapto"
    ).length;

  const pendentes =
    mockVeiculos.filter(
      (veiculo) => veiculo.status === "Pendente"
    ).length;

  const porcentagemApta = Math.round(
    (aptos / totalVeiculos) * 100
  );

  const itensReprovados: Record<string, number> = {};

  revisoes.forEach((revisao) => {
    revisao.reprovados.forEach((item) => {
      itensReprovados[item] =
        (itensReprovados[item] || 0) + 1;
    });
  });

  const maiorQuantidade =
    Math.max(
      ...Object.values(itensReprovados),
      1
    );

  return (
    <main className="container">
      <section className="titulo">
        <div>
          <h1>Relatórios</h1>
          <p>Painel do gestor de frota</p>
        </div>
      </section>

      <section className="kpis">
        <div className="kpi">
          <span>🚗</span>
          <strong>{porcentagemApta}%</strong>
          <p>Frota Apta</p>
        </div>

        <div className="kpi">
          <span>⚠️</span>
          <strong>{inaptos}</strong>
          <p>Veículos Inaptos Hoje</p>
        </div>

        <div className="kpi">
          <span>⏱️</span>
          <strong>{pendentes}</strong>
          <p>Checklists Pendentes</p>
        </div>
      </section>

      <section className="relatorio-box">
        <div className="titulo-tabela">
          <h2>Histórico de Revisões de Hoje</h2>
        </div>

        <div className="tabela-container">
          <table>
            <thead>
              <tr>
                <th>Placa</th>
                <th>Motorista</th>
                <th>Horário</th>
                <th>Status</th>
                <th>Quem reprovou</th>
              </tr>
            </thead>

            <tbody>
              {revisoes.length > 0 ? (
                revisoes.map((revisao) => (
                  <tr key={revisao.id}>
                    <td>{revisao.placa}</td>
                    <td>{revisao.motorista}</td>
                    <td>{revisao.horario}</td>
                    <td>
                      <span
                        className={`status ${revisao.status.toLowerCase()}`}
                      >
                        {revisao.status}
                      </span>
                    </td>
                    <td>
                      {revisao.reprovados.length > 0
                        ? revisao.reprovados.join(", ")
                        : "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>
                    Nenhuma revisão realizada hoje.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="relatorio-box">
        <h2>Itens que mais reprovam</h2>

        {Object.keys(itensReprovados).length > 0 ? (
          Object.entries(itensReprovados).map(
            ([item, quantidade]) => {
              const porcentagem = Math.round(
                (quantidade / maiorQuantidade) * 100
              );

              return (
                <div className="barra-item" key={item}>
                  <div className="barra-info">
                    <span>{item}</span>
                    <strong>{porcentagem}%</strong>
                  </div>

                  <div className="barra">
                    <div
                      className="barra-preenchida"
                      style={{
                        width: `${porcentagem}%`,
                      }}
                    />
                  </div>
                </div>
              );
            }
          )
        ) : (
          <p>Nenhum item reprovado ainda.</p>
        )}
      </section>

      <button
        className="botao exportar"
        onClick={() => alert("Relatório exportado!")}
      >
        📄 Exportar PDF
      </button>
    </main>
  );
}