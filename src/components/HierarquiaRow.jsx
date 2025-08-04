import { ArrowUp, ArrowDown, Trash2 } from "lucide-react"
import { useState } from "react"
import AdvertenciaModal from "./AdvertenciaModal"
import ExonerarModal from "./ExonerarModal" // <- importar novo modal
import { AlertTriangle } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"; // importe o hook

export default function HierarquiaRow({ agente, onClick }) {
  const { usuario } = useAuth(); // pega o usuário logado

  const podeEditar = ["Delegado", "Cordenador", "Corregedor", "Diretor", "Assesor Técnico", "Diretor-Geral"].includes(usuario?.cargo);
  const podeAdvertir = ["Delegado", "Cordenador", "Corregedor", "Diretor", "Assesor Técnico", "Diretor-Geral"].includes(usuario?.cargo);
  const [showAdvModal, setShowAdvModal] = useState(false)
  const [showExonModal, setShowExonModal] = useState(false)
  const [showDetalhes, setShowDetalhes] = useState(false)

  const promover = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/agentes/${id}/promover`, { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        alert(`Promovido para ${data.novoCargo}`);
        window.location.reload();
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error("Erro ao promover:", err);
    }
  };

  const rebaixar = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/agentes/${id}/rebaixar`, { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        alert(`Rebaixado para ${data.novoCargo}`);
        window.location.reload();
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error("Erro ao rebaixar:", err);
    }
  };

  const confirmarExoneracao = async ({ motivo, responsavel }) => {
    await fetch(`http://localhost:5000/agentes/${agente._id}/exonerar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ motivo, responsavel })
    })
    window.location.reload()
  }

  return (
    <>
      <tr className="border-b border-gray-700 hover:bg-gray-800 transition cursor-pointer"
        onClick={() => onClick(agente)}>
        <td className="px-4 py-2">
          <img src={agente.imagem} alt={agente.nome} className="w-10 h-10 rounded-full object-cover" />
        </td>
        <td className="px-4 py-2">{agente.nome}</td>
        <td className="px-4 py-2">{agente.idJogo}</td>
        <td className="px-4 py-2">{agente.cargo}</td>
        <td className="px-4 py-2">{agente.grupamento}</td>
        <td className="px-4 py-2 flex items-center gap-2">
          {agente.advertencias?.length || 0}/3
          {agente.advertencias?.length > 0 && (
            <button onClick={() => setShowDetalhes(true)} title="Ver detalhes">
              <AlertTriangle className="text-yellow-400" size={16} />
            </button>
          )}
        </td>
        <td className="px-4 py-2">{agente.dataIngresso?.split("T")[0]}</td>
        <td className="px-4 py-2">{agente.dataPromocao ? agente.dataPromocao.split("T")[0] : "-"}</td>
        <td className="px-4 py-2">{agente.edital}</td>
        <td className="px-4 py-2 flex gap-2">
  {podeEditar && (
    <>
      <button onClick={() => promover(agente._id)}><ArrowUp className="text-green-400" size={18} /></button>
      <button onClick={() => rebaixar(agente._id)}><ArrowDown className="text-yellow-400" size={18} /></button>
      <button onClick={() => setShowExonModal(true)}><Trash2 className="text-red-500" size={18} /></button>
    </>
  )}
  {podeAdvertir && (
    <button onClick={() => setShowAdvModal(true)}>
      <AlertTriangle className="text-blue-400 hover:text-blue-500" size={18} />
    </button>
  )}
</td>
      </tr>

      {showAdvModal && (
        <AdvertenciaModal
          agente={agente}
          onClose={() => setShowAdvModal(false)}
          onAdvertenciaAplicada={() => window.location.reload()}
        />
      )}
      {showExonModal && (
        <ExonerarModal
          agente={agente}
          onClose={() => setShowExonModal(false)}
          onConfirm={confirmarExoneracao}
        />
      )}

      {showDetalhes && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl w-full max-w-md space-y-4 shadow-xl">
            <h2 className="text-xl font-bold text-white">Advertências de {agente.nome}</h2>
            {agente.advertencias.map((adv, idx) => (
              <div key={idx} className="border border-gray-600 rounded p-2 text-sm text-gray-300">
                <p><strong>Motivo:</strong> {adv.motivo}</p>
                <p><strong>Tipo:</strong> {adv.tipo}</p>
                <p><strong>Responsável:</strong> {adv.responsavel}</p>
                <p><strong>Data:</strong> {new Date(adv.data).toLocaleDateString()}</p>
                <p><strong>Duração:</strong> {adv.duracaoDias ? `${adv.duracaoDias} dias` : "Indefinida"}</p>
              </div>
            ))}
            <div className="flex justify-end">
              <button
                onClick={() => setShowDetalhes(false)}
                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
