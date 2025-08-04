import Layout from "../components/Layout"
import CardGrid from "../components/CardGrid"

export default function Home() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-10 text-gray-300 space-y-10">
        <h1 className="text-4xl font-bold text-center text-gray-100">Bem-vindo ao GPI</h1>

        <section>
          <h2 className="text-2xl font-semibold text-luna-blue mb-2">GPI em Linhas Gerais</h2>
          <p className="text-justify">
            O <strong>Grupo de Pronta Intervenção (G.P.I)</strong> é uma unidade especializada da Polícia Federal, voltada para ações rápidas, de impacto e alto risco.
            Atua com foco em garantir a pronta resposta em situações críticas, como rebeliões em presídios federais, escoltas de alto risco, contra-terrorismo,
            captura de criminosos perigosos e intervenções emergenciais.
          </p>
          <p className="mt-4 text-justify">
            Criado para ser o braço imediato da força tática federal, o G.P.I mantém seus operadores em constante estado de prontidão, com treinamento intenso e contínuo,
            buscando excelência em combate urbano, gerenciamento de crises e manobras de alta complexidade.
          </p>
          <p className="mt-4 text-justify">
            O ingresso no G.P.I exige não apenas preparo físico e psicológico, mas também disciplina, respeito à hierarquia e domínio das normas de conduta.
            O agente deve estar pronto para agir com precisão, discrição e responsabilidade, representando o topo da pirâmide operacional da Polícia Federal no Roleplay.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-luna-blue mb-2">Conduta esperada dos membros do G.P.I:</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Apresentar postura profissional e exemplar, dentro e fora de serviço;</li>
            <li>Seguir estritamente a hierarquia do grupo e acatar ordens superiores sem questionamento público;</li>
            <li>Manter sigilo sobre operações, estratégias e protocolos internos;</li>
            <li>Utilizar equipamentos e uniformes regulamentares apenas em ações autorizadas;</li>
            <li>Preservar o bom nome do G.P.I, respeitando os demais órgãos e seus integrantes.</li>
          </ul>
        </section>

        <section>
          <p className="mt-4 text-justify">
            O G.P.I não é um grupo para quem busca apenas status. Ser parte da unidade é uma honra que exige responsabilidade, comprometimento e preparo constante.
            Somente os que demonstram conduta impecável, lealdade e eficiência têm lugar entre os operadores do G.P.I.
          </p>
        </section>
        <CardGrid />
      </div>
    </Layout>
  )
}

