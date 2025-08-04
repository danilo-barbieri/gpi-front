import Layout from "../components/Layout"
import CursoCard from "../components/CursoCard"

const cursos = [
  {
    nome: "Curso de Intervenção em Ambiente Confinado - CIAC",
    data: "04/08/2025",
    responsavel: "Delegada Heloísa Sampaio - GPI",
    imagem: "Foto-CIAC.png",
    pdf: "/pdf/Mdulos-CIAC.pdf",
    video: "/videos/CIAC.mp4",
    formulario: "https://forms.gle/jMYfzuzWfnP8RLa19"
  },
  // outros cursos...
]

export default function Courses() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {cursos.map((curso, index) => (
        <CursoCard key={index} curso={curso} />
      ))}
    </div>
    </Layout>
  )
}