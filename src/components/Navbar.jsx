import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import logo from "../assets/GPI-logo.png";
import Button from "./Button";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);
  const menuRef = useRef(null);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    logout();
    setMenuAberto(false);
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    function handleClickFora(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAberto(false);
      }
    }
    document.addEventListener("mousedown", handleClickFora);
    return () => {
      document.removeEventListener("mousedown", handleClickFora);
    };
  }, []);

  return (
    <nav className="bg-black text-white shadow px-4 py-3 mx-20">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Link to="/">
          <img src={logo} alt="Logo GPI" className="h-10" />
        </Link>

        <div className="space-x-4 text-sm flex items-center relative">
          <Link to="/courses">Cursos</Link>
          <Link to="/hierarchy">Hierarquia</Link>
          <Link to="/exonerated">Exonerados</Link>

          {usuario ? (
            <div ref={menuRef} className="relative">
              <button
                onClick={toggleMenu}
                className="flex items-center space-x-2 cursor-pointer focus:outline-none"
              >
                <img
                  src={usuario.imagem || "https://via.placeholder.com/40"}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span>{usuario.nome}</span>
                <span>|</span>
                <span>{usuario.idJogo}</span>
              </button>

              {menuAberto && (
                <div className="absolute right-0 mt-2 bg-white text-black rounded shadow p-2 w-32 z-10">
                  <button
                    onClick={handleLogoutClick}
                    className="w-full text-left hover:bg-gray-200 px-2 py-1 rounded"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button onClick={handleLoginClick}>Login</Button>
          )}
        </div>
      </div>
    </nav>
  );
}
