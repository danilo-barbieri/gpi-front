import Banner from './Banner'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <div className="bg-current flex flex-col min-h-screen">
    <Navbar />
      <Banner />
      <main className="flex-grow py-3">
        <div className="bg-black rounded-2xl shadow-md p-6 mx-20">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}
