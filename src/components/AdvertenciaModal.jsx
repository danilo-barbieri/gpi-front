import { useState } from "react"

export default function AdvertenciaModal({ agente, onClose }) {
  const [motivo, setMotivo] = useState("")
  const [tipo, setTipo] = useState("Leve")
  const [duracao, setDuracao] = useState(0)
  const [responsavel, setResponsavel] = useState("")

   const enviarAdvertencia = async () => {
    if (!motivo || !responsavel) return alert("Preencha todos os campos.")
    try {
      await fetch(`https://gpi-backend.onrender.com/agentes/${agente._id}/advertencia`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          motivo,
          tipo,
          duracaoDias: Number(duracao) || null,
          responsavel,
          data: new Date().toISOString()
        })
      })
      onAdvertenciaAplicada?.()
      onClose()
    } catch (err) {
      alert("Erro ao aplicar advertência.")
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-xl w-full max-w-md space-y-4 shadow-xl">
        <h2 className="text-xl font-bold text-white">Advertência para {agente.nome}</h2>

        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-300">Motivo:</label>
            <textarea
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600"
              placeholder="Motivo da advertência"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300">Tipo:</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600"
            >
              <option>Leve</option>
              <option>Média</option>
              <option>Grave</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-300">Duração (dias, opcional):</label>
            <input
              type="number"
              value={duracao}
              onChange={(e) => setDuracao(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300">Responsável:</label>
            <input
              type="text"
              value={responsavel}
              onChange={(e) => setResponsavel(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600"
              placeholder="Nome do responsável"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button onClick={onClose} className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600">Cancelar</button>
          <button onClick={enviarAdvertencia} className="px-3 py-1 bg-luna-blue text-white rounded hover:bg-blue-600">
            Aplicar
          </button>
        </div>
      </div>
    </div>
  )
}
