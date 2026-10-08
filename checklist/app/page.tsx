"use client";

import { useState } from "react";
import CardVeiculo from "@/components/CardVeiculos";
import mockVeiculos from "@/data/mockVeiculos";

export default function Home() {
  const [busca, setBusca] = useState("");

  const veiculosFiltrados = mockVeiculos.filter((veiculo) => {
    return (
      veiculo.placa.toLowerCase().includes(busca.toLowerCase()) ||
      veiculo.modelo.toLowerCase().includes(busca.toLowerCase())
    );
  });

  const totalAptos = mockVeiculos.filter(
    (veiculo) => veiculo.status === "Apto"
  ).length;

  const totalInaptos = mockVeiculos.filter(
    (veiculo) => veiculo.status === "Inapto"
  ).length;

  const totalPendentes = mockVeiculos.filter(
    (veiculo) => veiculo.status === "Pendente"
  ).length;

  return (
    <main className="container">
      <section className="titulo">
        <div>
          <h1>Garagem</h1>
          <p>Checklist diário dos veículos</p>
        </div>
      </section>

      <section className="indicadores">
        <div className="indicador apto">
          <span>✓</span>
          <div>
            <strong>{totalAptos}</strong>
            <p>Total Aptos</p>
          </div>
        </div>

        <div className="indicador inapto">
          <span>!</span>
          <div>
            <strong>{totalInaptos}</strong>
            <p>Inaptos</p>
          </div>
        </div>

        <div className="indicador pendente">
          <span>⏱</span>
          <div>
            <strong>{totalPendentes}</strong>
            <p>Pendentes</p>
          </div>
        </div>
      </section>

      <section className="busca">
        <input
          type="text"
          placeholder="Buscar por placa ou modelo..."
          value={busca}
          onChange={(evento) => setBusca(evento.target.value)}
        />
      </section>

      <section className="grid-veiculos">
        {veiculosFiltrados.length > 0 ? (
          veiculosFiltrados.map((veiculo) => (
            <CardVeiculo
              key={veiculo.id}
              veiculo={veiculo}
            />
          ))
        ) : (
          <p>Nenhum veículo encontrado.</p>
        )}
      </section>
    </main>
  );
}