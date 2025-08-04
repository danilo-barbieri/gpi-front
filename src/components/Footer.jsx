export default function Footer() {
  return (
    <footer className="bg-black text-white text-center py-2 mx-20 rounded-t-2xl flex flex-row justify-between">
      <p className="text-sm px-6">© {new Date().getFullYear()} Todos direitos reservados à Grupo de Pronta Intervenção</p>
      <p className="text-sm px-6">Develop by Danilo Barbieri</p>
    </footer>
  )
}
