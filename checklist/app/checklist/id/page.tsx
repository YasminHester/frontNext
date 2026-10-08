"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ItemChecklist from "@/components/ItemChecklist";
import mockVeiculos from "@/data/mockVeiculos";

const itensChecklist = {
  Documentação: ["CNH", "CRLV"],
  Segurança: [
    "Freios",
    "Pneus",
    "Faróis",
    "Cinto",
    "Extintor",
  ],
  Operacional: [
    "Nível de óleo",
    "Água",
    "Combustível",
    "Buzina",
    "Limpador",
  ],
};

export default function Checklist() {
  const params = useParams();
  const router = useRouter();

  const id = Number(params.id);

  const veiculo = mockVeiculos.find(
    (item) => item.id === id
  );

  const todosItens = Object.values(itensChecklist).flat();

  const [checklist, setChecklist] = useState<Record<string, boolean>>(
    Object.fromEntries(
      todosItens.map((item) => [item, true])
    )
  );

  const [observacoes, setObservacoes] = useState("");
  const [foto, setFoto] = useState<File | null>(null);

  if (!veiculo) {
    return (
      <main className="container">
        <h1>Veículo não encontrado</h1>
      </main>
    );
  }

  const algumReprovado = Object.values(checklist).some(
    (item) => item === false
  );

  const statusAtual = algumReprovado ? "Inapto" : "Apto";

  function alterarItem(item: string) {
    setChecklist((estadoAtual) => ({
      ...estadoAtual,
      [item]: !estadoAtual[item],
    }));
  }

  function finalizarRevisao() {
    if (!veiculo) {
    return;
    }
    const reprovados = Object.entries(checklist)
      .filter(([, aprovado]) => !aprovado)
      .map(([item]) => item);

    const resultado = {
      id: veiculo.id,
      placa: veiculo.placa,
      modelo: veiculo.modelo,
      motorista: veiculo.motorista,
      status: statusAtual,
      observacoes,
      foto: foto?.name || "",
      reprovados,
      horario: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    localStorage.setItem(
      `checklist-${veiculo.id}`,
      JSON.stringify(resultado)
    );

    alert("Checklist salvo!");

    router.push("/relatorios");
  }

  return (
    <main className="container">
      <section className="cabecalho-checklist">
        <div>
          <p>Checklist do veículo</p>
          <h1>{veiculo.modelo}</h1>
          <strong>{veiculo.placa}</strong>
        </div>

        <span className={`status ${statusAtual.toLowerCase()}`}>
          {statusAtual}
        </span>
      </section>

      <section className="formulario-checklist">
        {Object.entries(itensChecklist).map(
          ([secao, itens]) => (
            <div className="secao-checklist" key={secao}>
              <h2>{secao}</h2>

              {itens.map((item) => (
                <ItemChecklist
                  key={item}
                  nome={item}
                  marcado={checklist[item]}
                  aoAlterar={() => alterarItem(item)}
                />
              ))}
            </div>
          )
        )}

        <div className="campo-formulario">
          <label htmlFor="observacoes">
            Observações
          </label>

          <textarea
            id="observacoes"
            placeholder="Digite alguma observação..."
            value={observacoes}
            onChange={(evento) =>
              setObservacoes(evento.target.value)
            }
          />
        </div>

        <div className="campo-formulario">
          <label htmlFor="foto">
            Foto do hodômetro
          </label>

          <input
            id="foto"
            type="file"
            accept="image/*"
            onChange={(evento) =>
              setFoto(evento.target.files?.[0] || null)
            }
          />
        </div>

        <button
          className="botao finalizar"
          onClick={finalizarRevisao}
        >
          Finalizar Revisão
        </button>
      </section>
    </main>
  );
}