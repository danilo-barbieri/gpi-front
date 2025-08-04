import Layout from "../components/Layout"
import { useEffect, useState } from "react"
import HierarquiaRow from "../components/HierarquiaRow"
import { Modal } from "../components/Modal"
import { cargosOrdenados } from "../utils/cargos"
import { useAuth } from "../contexts/AuthContext";


export default function Hierarquia() {
  const { usuario } = useAuth();
  const podeAdicionar = ["Subcomandante", "Comandante"].includes(usuario?.cargo);

  const [agenteSelecionado, setAgenteSelecionado] = useState(null)
  const [modalEditarAberto, setModalEditarAberto] = useState(false)
  const [agentes, setAgentes] = useState([])
  const [modalAberto, setModalAberto] = useState(false)
  const [novoAgente, setNovoAgente] = useState({
    nome: "",
    idJogo: "",
    cargo: "",
    imagem: "",
    grupamento: "",
    dataIngresso: "",
    edital: "",
    status: "ativo",
  })


  useEffect(() => {
    fetch("http://localhost:5000/agentes")
      .then((res) => res.json())
      .then((data) => {
        const ordenados = data.sort(
          (a, b) =>
            cargosOrdenados.indexOf(a.cargo) - cargosOrdenados.indexOf(b.cargo)
        )
        setAgentes(ordenados)
      })
  }, [])

  const abrirModalEdicao = (agente) => {
    setAgenteSelecionado(agente)
    setModalEditarAberto(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await fetch("http://localhost:5000/agentes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoAgente),
    })

    setModalAberto(false)
    setNovoAgente({
      nome: "",
      idJogo: "",
      cargo: "",
      imagem: "",
      grupamento: "",
      dataIngresso: "",
      edital: "",
      status: "ativo",
    })

    const res = await fetch("http://localhost:5000/agentes")
    const data = await res.json()
    const ordenados = data.sort(
      (a, b) =>
        cargosOrdenados.indexOf(a.cargo) - cargosOrdenados.indexOf(b.cargo)
    )
    setAgentes(ordenados)
  }


  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-10 text-gray-300">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-100">Painel de Hierarquia - GPI</h1>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-100">Painel de Hierarquia</h1>
          {podeAdicionar && (
            <button
              onClick={() => setModalAberto(true)}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
            >
              + Adicionar Agente
            </button>
          )}
        </div>
        <div className="overflow-auto rounded-xl border border-gray-700">
          <table className="min-w-full text-sm text-left text-gray-300">
            <thead className="bg-gray-800 text-gray-200">
              <tr>
                <th className="px-4 py-3">Foto</th>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Cargo</th>
                <th className="px-4 py-3">Grupamento</th>
                <th className="px-4 py-3">Advertências</th>
                <th className="px-4 py-3">Data Entrada</th>
                <th className="px-4 py-3">Última Promoção</th>
                <th className="px-4 py-3">Edital</th>
                <th className="px-4 py-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {agentes.map((agente) => (
                <HierarquiaRow key={agente._id} agente={agente} onClick={abrirModalEdicao} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal isOpen={modalAberto} onClose={() => setModalAberto(false)} title="Adicionar Novo Agente">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            required
            placeholder="Nome"
            value={novoAgente.nome}
            onChange={(e) => setNovoAgente({ ...novoAgente, nome: e.target.value })}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white"
          />
          <input
            type="text"
            required
            placeholder="ID do Jogo"
            value={novoAgente.idJogo}
            onChange={(e) => setNovoAgente({ ...novoAgente, idJogo: e.target.value })}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white"
          />
          <select
            required
            value={novoAgente.cargo}
            onChange={(e) => setNovoAgente({ ...novoAgente, cargo: e.target.value })}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white"
          >
            <option value="">Selecione o Cargo</option>
            {cargosOrdenados.map((cargo) => (
              <option key={cargo} value={cargo}>
                {cargo}
              </option>
            ))}
          </select>
          <input
            type="text"
            required
            placeholder="Grupamento"
            value={novoAgente.grupamento}
            onChange={(e) => setNovoAgente({ ...novoAgente, grupamento: e.target.value })}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white"
          />
          <input
            type="url"
            placeholder="URL da Imagem"
            value={novoAgente.imagem}
            onChange={(e) => setNovoAgente({ ...novoAgente, imagem: e.target.value })}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white"
          />
          <input
            type="date"
            required
            value={novoAgente.dataIngresso}
            onChange={(e) => setNovoAgente({ ...novoAgente, dataIngresso: e.target.value })}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white"
          />
          <input
            type="text"
            placeholder="Edital de Entrada"
            required
            value={novoAgente.edital}
            onChange={(e) => setNovoAgente({ ...novoAgente, edital: e.target.value })}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
            >
              Salvar
            </button>
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={modalEditarAberto}
        onClose={() => setModalEditarAberto(false)}
        title={`Editar Agente: ${agenteSelecionado?.nome}`}
      >
        {agenteSelecionado && (
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              await fetch(`http://localhost:5000/agentes/${agenteSelecionado._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(agenteSelecionado),
              })
              setModalEditarAberto(false)

              // Atualiza lista
              const res = await fetch("http://localhost:5000/agentes")
              const data = await res.json()
              const ordenados = data.sort(
                (a, b) => cargosOrdenados.indexOf(a.cargo) - cargosOrdenados.indexOf(b.cargo)
              )
              setAgentes(ordenados)
            }}
            className="space-y-4"
          >
            <input
              type="text"
              required
              placeholder="Nome"
              value={agenteSelecionado.nome}
              onChange={(e) => setAgenteSelecionado({ ...agenteSelecionado, nome: e.target.value })}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            />
            <input
              type="text"
              required
              placeholder="ID do Jogo"
              value={novoAgente.idJogo}
              onChange={(e) => setNovoAgente({ ...novoAgente, idJogo: e.target.value })}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            />
            <select
              required
              value={novoAgente.cargo}
              onChange={(e) => setNovoAgente({ ...novoAgente, cargo: e.target.value })}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            >
              <option value="">Selecione o Cargo</option>
              {cargosOrdenados.map((cargo) => (
                <option key={cargo} value={cargo}>
                  {cargo}
                </option>
              ))}
            </select>
            <input
              type="text"
              required
              placeholder="Grupamento"
              value={novoAgente.grupamento}
              onChange={(e) => setNovoAgente({ ...novoAgente, grupamento: e.target.value })}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            />
            <input
              type="url"
              placeholder="URL da Imagem"
              value={novoAgente.imagem}
              onChange={(e) => setNovoAgente({ ...novoAgente, imagem: e.target.value })}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            />
            <input
              type="date"
              required
              value={novoAgente.dataIngresso}
              onChange={(e) => setNovoAgente({ ...novoAgente, dataIngresso: e.target.value })}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            />
            <input
              type="text"
              placeholder="Edital de Entrada"
              required
              value={novoAgente.edital}
              onChange={(e) => setNovoAgente({ ...novoAgente, edital: e.target.value })}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            />
            <input
              type="url"
              placeholder="URL da Imagem"
              value={agenteSelecionado.imagem}
              onChange={(e) => setAgenteSelecionado({ ...agenteSelecionado, imagem: e.target.value })}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
              >
                Salvar Alterações
              </button>
            </div>
          </form>
        )}
      </Modal>
    </Layout>
  )
}
