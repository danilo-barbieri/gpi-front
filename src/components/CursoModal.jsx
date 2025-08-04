export default function CursoModal({ open, setOpen, curso }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl max-w-xl w-full space-y-4 text-black relative max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-2 right-4 text-xl"
          onClick={() => setOpen(false)}
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-2">{curso.nome}</h2>

        {/* 📘 Material Escrito ou PDF */}
        <div>
          <h3 className="font-semibold">📘 Material Escrito</h3>

          {curso.pdf ? (
            <>
              <iframe
                src={curso.pdf}
                className="w-full h-96 border rounded"
                title="Resumo em PDF"
              ></iframe>
              <a
                href={curso.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-2 text-blue-600 underline"
              >
                Abrir PDF em nova aba
              </a>
            </>
          ) : (
            <p>{curso.textoResumo || "Conteúdo em texto ou PDF não disponível."}</p>
          )}
        </div>

        {/* 🎥 Vídeo */}
        {curso.video && (
          <div>
            <h3 className="font-semibold mt-4">🎥 Vídeo</h3>
            <video controls className="w-full rounded">
              <source src={curso.video} type="video/mp4" />
              Seu navegador não suporta vídeos.
            </video>
          </div>
        )}

        {/* 📝 Formulário */}
        <div>
          <h3 className="font-semibold mt-4">📝 Formulário</h3>
          <a
            href={curso.formulario}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Fazer Avaliação
          </a>
        </div>
      </div>
    </div>
  )
}
