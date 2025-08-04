import { useState } from "react"

export default function NovoAgenteForm({ onCadastrado }) {
  const [form, setForm] = useState({
    nome: "",
    id: "",
    fotoUrl: "",
    cargo: "",
    grupamento: "",
    dataEntrada: "",
    dataUltimaPromocao: "",
    editalEntrada: ""
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch("http://localhost:5000/agentes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
    if (res.ok) {
      onCadastrado()
      setForm({
        nome: "",
        id: "",
        fotoUrl: "",
        cargo: "",
        grupamento: "",
        dataEntrada: "",
        dataUltimaPromocao: "",
        editalEntrada: ""
      })
    } else {
      alert("Erro ao cadastrar")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-xl space-y-4 text-gray-100">
      <h2 className="text-xl font-bold">Cadastrar Novo Agente</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="p-2 rounded bg-gray-900" name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} />
        <input className="p-2 rounded bg-gray-900" name="id" placeholder="ID do jogo" value={form.id} onChange={handleChange} />
        <input className="p-2 rounded bg-gray-900" name="fotoUrl" placeholder="URL da Foto" value={form.fotoUrl} onChange={handleChange} />
        <input className="p-2 rounded bg-gray-900" name="cargo" placeholder="Cargo" value={form.cargo} onChange={handleChange} />
        <input className="p-2 rounded bg-gray-900" name="grupamento" placeholder="Grupamento" value={form.grupamento} onChange={handleChange} />
        <input className="p-2 rounded bg-gray-900" name="dataEntrada" placeholder="Data de Entrada" value={form.dataEntrada} onChange={handleChange} />
        <input className="p-2 rounded bg-gray-900" name="dataUltimaPromocao" placeholder="Data Última Promoção" value={form.dataUltimaPromocao} onChange={handleChange} />
        <input className="p-2 rounded bg-gray-900" name="editalEntrada" placeholder="Edital" value={form.editalEntrada} onChange={handleChange} />
      </div>

      <button className="bg-luna-blue px-4 py-2 rounded text-white">Cadastrar</button>
    </form>
  )
}
