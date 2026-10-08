export default function Home() {
  return (
    <main>
      <h1>Garagem</h1>

      <p>
        Checklist diário dos veículos
      </p>

      <section>
        <div>
          <span>✓</span>
          <strong>5</strong>
          <p>Total Aptos</p>
        </div>

        <div>
          <span>!</span>
          <strong>1</strong>
          <p>Inaptos</p>
        </div>

        <div>
          <span>⏱</span>
          <strong>2</strong>
          <p>Pendentes</p>
        </div>
      </section>

      <input
        type="text"
        placeholder="Buscar por placa ou modelo..."
      />

      <section>
        <div>
          <h2>Fiat Strada</h2>

          <p>
            <strong>Placa:</strong> ABC-1234
          </p>

          <p>
            <strong>Motorista:</strong> João Silva
          </p>

          <p>
            <strong>Última revisão:</strong> 06/10/2026
          </p>

          <span>Apto</span>

          <button>
            Iniciar Checklist
          </button>
        </div>
      </section>
    </main>
  );
}