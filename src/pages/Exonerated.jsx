import Layout from "../components/Layout"
import { useEffect, useState } from "react"

export default function Exonerados() {
  const [exonerados, setExonerados] = useState([])

  useEffect(() => {
    fetch("https://gpi-backend.onrender.com/agentes/exonerados")
      .then((res) => res.json())
      .then(setExonerados)
  }, [])

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-10 text-gray-300">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-100">Agentes Exonerados</h1>

        <div className="overflow-x-auto rounded-xl border border-gray-700 shadow">
          <table className="min-w-full text-sm text-left text-gray-300">
            <thead className="bg-gray-800 text-gray-200">
              <tr>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Cargo</th>
                <th className="px-4 py-3">Motivo</th>
                <th className="px-4 py-3">Responsável</th>
                <th className="px-4 py-3">Data</th>
              </tr>
            </thead>
            <tbody>
              {exonerados.map((item) => (
                <tr key={item._id} className="border-b border-gray-700 hover:bg-gray-800 transition">
                  <td className="px-4 py-2">{item.nome}</td>
                  <td className="px-4 py-2">{item.cargo}</td>
                  <td className="px-4 py-2">{item.motivo}</td>
                  <td className="px-4 py-2">{item.responsavel}</td>
                  <td className="px-4 py-2">{new Date(item.dataExoneracao).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}
