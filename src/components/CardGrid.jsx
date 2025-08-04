import CardLink from "./CardLink"

export default function CardGrid() {
  return (
    <section className="mt-10 px-4">
      <h2 className="text-2xl font-semibold text-center text-luna-blue mb-6">Acesso Rápido</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <CardLink
          title="Cursos"
          description="Acesse os cursos e se torne um agente ainda mais preparado para as operações do GPI."
          to="/courses"
          buttonText="Realizar Cursos"
          icon="🎯"
        />
        <CardLink
          title="Certificados"
          description="Veja seus certificados de qualificação e registre seu progresso dentro da unidade."
          to="/certificados"
          buttonText="Verificar Certificados"
          icon="📜"
        />
        <CardLink
          title="Hierarquia"
          description="Visualize sua posição na hierarquia e entenda o funcionamento tático do GPI."
          to="/hierarquia"
          buttonText="Ver Hierarquia"
          icon="🏅"
        />
      </div>
    </section>
  )
}
