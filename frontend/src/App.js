// --- FRONTEND: App.jsx ---
import { useState } from "react";
import axios from "axios";

export default function App() {
  const [form, setForm] = useState({
    nome_completo: "",
    cpf: "",
    email: "",
    senha_hash: "",
    salt: "",
    telefone: "",
    criado_por: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/usuarios", form);
      alert("Usuário criado com sucesso!");
    } catch (error) {
      alert("Erro ao criar usuário.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">Cadastro de Usuário</h2>
        {Object.keys(form).map((field) => (
          <div key={field} className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {field}
            </label>
            <input
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
