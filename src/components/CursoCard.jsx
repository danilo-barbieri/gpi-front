import { useState } from "react"
import CursoModal from "./CursoModal"

export default function CursoCard({ curso }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="bg-black border border-white rounded-xl overflow-hidden shadow-lg hover:shadow-white transition">
        <img src={curso.imagem} alt={curso.nome} className="w-full h-40 object-cover" />
        <div className="p-4 space-y-2 text-white">
          <h3 className="text-xl font-bold">{curso.nome}</h3>
          <p className="text-sm text-gray-300">📅 {curso.data}</p>
          <p className="text-sm text-gray-300">👤 {curso.responsavel}</p>
          <button
            onClick={() => setIsOpen(true)}
            className="mt-2 bg-white text-black font-semibold px-4 py-2 rounded hover:bg-gray-200"
          >
            Iniciar Curso
          </button>
        </div>
      </div>

      <CursoModal open={isOpen} setOpen={setIsOpen} curso={curso} />
    </>
  )
}
