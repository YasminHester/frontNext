"use client";

import Link from "next/link";

interface Veiculo {
  id: number;
  placa: string;
  modelo: string;
  motorista: string;
  status: string;
  ultimaRevisao: string;
}

interface CardVeiculoProps {
  veiculo: Veiculo;
}

export default function CardVeiculo({ veiculo }: CardVeiculoProps) {
  return (
    <div className="card-veiculo">
      <div className="card-topo">
        <h2>{veiculo.modelo}</h2>

        <span className={`status ${veiculo.status.toLowerCase()}`}>
          {veiculo.status}
        </span>
      </div>

      <p>
        <strong>Placa:</strong> {veiculo.placa}
      </p>

      <p>
        <strong>Motorista:</strong> {veiculo.motorista}
      </p>

      <p>
        <strong>Última revisão:</strong> {veiculo.ultimaRevisao}
      </p>

      <Link href={`/checklist/${veiculo.id}`} className="botao">
        Iniciar Checklist
      </Link>
    </div>
  );
}