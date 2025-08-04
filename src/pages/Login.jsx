import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../components/Layout";
import logoPf from "../assets/logo-pf.png";
import logoGpi from "../assets/logo-gpi.png";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    const data = await res.json();
    if (res.ok) {
      login(data.token);
      navigate("/");
    } else {
      alert(data.error);
    }
  };

  return (
    <Layout>
      <div className="flex max-w-5xl mx-auto mt-16 bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Lado Esquerdo - Imagens e Título */}
        <div className="w-1/2 bg-gray-900 text-white flex flex-col justify-center items-center p-4">
          {/* Texto acima */}
          <h2 className="text-2xl font-bold mb-6">Faça seu Login</h2>

          {/* Logos lado a lado */}
          <div className="flex items-center space-x-4">
            <img src={logoPf} alt="Logo PF" className="h-24" />
            <img src={logoGpi} alt="Logo GPI" className="h-24" />
          </div>
        </div>

        {/* Lado Direito - Formulário */}
        <div className="w-1/2 p-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Bem-vindo de volta!</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            />
            <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-blue-800">
              Entrar
            </button>
          </form>
          <p className="text-sm text-gray-600 mt-4 text-center">
            Não tem cadastro?{" "}
            <Link to="/registro" className="text-black hover:underline">
              Cadastre-se aqui
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
