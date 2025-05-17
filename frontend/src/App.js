// This example includes both frontend and backend (Node.js with Express) integration with a PostgreSQL database

// --- BACKEND: server.js ---
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "your_db_name",
  password: "your_password",
  port: 5432,
});

// Example route: create user
app.post("/api/usuarios", async (req, res) => {
  const {
    nome_completo,
    cpf,
    email,
    senha_hash,
    salt,
    telefone,
    criado_por,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO Usuarios (nome_completo, cpf, email, senha_hash, salt, telefone, criado_por)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [nome_completo, cpf, email, senha_hash, salt, telefone, criado_por]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar usuário." });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

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
