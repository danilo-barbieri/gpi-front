import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../components/Layout";
import logoPf from "../assets/logo-pf.png";
import logoGpi from "../assets/logo-gpi.png";

export default function Registro() {
    const [form, setForm] = useState({
        nome: "",
        idJogo: "",
        imagem: "",
        email: "",
        senha: "",
        cargo: "",
        grupamento: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:5000/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const data = await res.json();
        if (res.ok) {
            alert("Cadastro realizado com sucesso!");
            navigate("/login");
        } else {
            alert(data.error || "Erro ao registrar");
        }
    };

    return (
        <Layout>
            <div className="flex max-w-5xl mx-auto mt-16 bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Lado Esquerdo - Imagens e Título */}
                <div className="w-1/2 bg-gray-900 text-white flex flex-col justify-center items-center p-4">
                    {/* Texto acima */}
                    <h2 className="text-2xl font-bold mb-6">Faça seu Cadastro</h2>

                    {/* Logos lado a lado */}
                    <div className="flex items-center space-x-4">
                        <img src={logoPf} alt="Logo PF" className="h-24" />
                        <img src={logoGpi} alt="Logo GPI" className="h-24" />
                    </div>
                </div>

                {/* Lado Direito - Formulário de Registro */}
                <div className="w-1/2 p-10 overflow-y-auto">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">Preencha os dados</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text" name="nome" placeholder="Nome" onChange={handleChange} className="w-full border border-gray-300 rounded px-4 py-2" required />
                        <input type="text" name="idJogo" placeholder="ID do Jogo" onChange={handleChange} className="w-full border border-gray-300 rounded px-4 py-2" required />
                        <input type="text" name="imagem" placeholder="URL da Imagem" onChange={handleChange} className="w-full border border-gray-300 rounded px-4 py-2" />
                        <input type="email" name="email" placeholder="E-mail" onChange={handleChange} className="w-full border border-gray-300 rounded px-4 py-2" required />
                        <input type="password" name="senha" placeholder="Senha" onChange={handleChange} className="w-full border border-gray-300 rounded px-4 py-2" required />
                        <input type="text" name="cargo" placeholder="Cargo" onChange={handleChange} className="w-full border border-gray-300 rounded px-4 py-2" />
                        <input type="text" name="grupamento" placeholder="Grupamento" onChange={handleChange} className="w-full border border-gray-300 rounded px-4 py-2" />
                        <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-blue-800">
                            Registrar
                        </button>
                    </form>
                    <p className="text-sm text-gray-600 mt-4 text-center">
                        Já tem conta?{" "}
                        <Link to="/login" className="text-luna-blue hover:underline">
                            Faça login
                        </Link>
                    </p>
                </div>
            </div>
        </Layout>
    );
}
