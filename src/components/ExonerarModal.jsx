import { useState } from "react"

export default function ExonerarModal({ agente, onClose, onConfirm }) {
  const [motivo, setMotivo] = useState("")
  const [responsavel, setResponsavel] = useState("")

  const handleSubmit = () => {
    if (!motivo || !responsavel) return alert("Preencha todos os campos.")
    onConfirm({ motivo, responsavel })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-xl shadow-xl w-96 space-y-4">
        <h2 className="text-lg font-bold text-white">Exonerar {agente.nome}</h2>

        <div className="space-y-2">
          <label className="block text-sm text-gray-300">Motivo:</label>
          <input
            className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            placeholder="Motivo da exoneração"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-gray-300">Responsável:</label>
          <input
            className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600"
            value={responsavel}
            onChange={(e) => setResponsavel(e.target.value)}
            placeholder="Nome do responsável"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button onClick={onClose} className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600">Cancelar</button>
          <button onClick={handleSubmit} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500">Exonerar</button>
        </div>
      </div>
    </div>
  )
}
