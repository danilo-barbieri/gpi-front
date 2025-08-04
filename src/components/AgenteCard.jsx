import { useState } from "react";
import axios from "axios";

export default function AgenteCard({
  id,
  foto,
  nome,
  idJogo,
  cargo,
  advertencias,
  dataEntrada,
  dataPromocao,
  edital,
  grupamento,
  onAtualizar
}) {
  const [novoGrupamento, setNovoGrupamento] = useState(grupamento || "");

  const atualizarGrupamento = async () => {
    try {
      await axios.put(`http://localhost:3000/agentes/${id}`, {
        grupamento: novoGrupamento
      });
      onAtualizar();
    } catch (err) {
      console.error("Erro ao atualizar grupamento", err);
    }
  };

  return (
    <div className="bg-zinc-900 rounded-xl p-4 shadow space-y-2 relative">
      <img src={foto} alt={nome} className="w-20 h-20 rounded-full mx-auto" />
      <h3 className="text-xl text-center font-semibold">{nome}</h3>
      <p className="text-center text-sm text-gray-400">ID: {idJogo}</p>
      <p className="text-center text-luna-blue">{cargo}</p>

      <div className="text-sm mt-2 space-y-1">
        <p><strong>Data de Entrada:</strong> {dataEntrada}</p>
        <p><strong>Última Promoção:</strong> {dataPromocao}</p>
        <p><strong>Edital:</strong> {edital}</p>
        <p><strong>Advertências:</strong> {advertencias.length}/3</p>

        <div>
          <label className="text-gray-300 text-sm">Grupamento:</label>
          <input
            type="text"
            className="w-full bg-zinc-800 text-white p-1 rounded mt-1"
            value={novoGrupamento}
            onChange={(e) => setNovoGrupamento(e.target.value)}
            onBlur={atualizarGrupamento}
          />
        </div>
      </div>

      <div className="flex justify-around mt-4">
        <button className="text-green-400 hover:text-green-300">⬆️</button>
        <button className="text-yellow-400 hover:text-yellow-300">⚠️</button>
        <button className="text-red-500 hover:text-red-400">⬇️</button>
        <button className="text-red-600 hover:text-red-500">❌</button>
      </div>
    </div>
  );
}
