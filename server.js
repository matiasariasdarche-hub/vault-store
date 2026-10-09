const path = require("path");
const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Raíz del proyecto (esta carpeta js/ vive dentro de ella)
const ROOT = path.join(__dirname, "..");

// Sirve el frontend. Solo se exponen index.html, css/, img/ y los dos scripts
// del navegador: así no quedan públicos server.js, package.json ni la carpeta sql/.
app.get("/", (req, res) => res.sendFile(path.join(ROOT, "index.html")));
app.use("/css", express.static(path.join(ROOT, "css")));
app.use("/img", express.static(path.join(ROOT, "img")));

const PUBLIC_SCRIPTS = ["/app.js", "/cart.js"];

app.use("/js", (req, res, next) => {
    if (!PUBLIC_SCRIPTS.includes(req.path)) return res.status(404).end();
    next();
}, express.static(__dirname));

// Conexión a SQL Server con autenticación SQL (usuario y contraseña).
// Para la instancia por defecto (MSSQLSERVER) NO se usa instanceName: se conecta por puerto.
const config = {
    server: "localhost",
    port: 1433,
    database: "VAULT_DB",
    user: process.env.DB_USER || "sa",
    password: process.env.DB_PASSWORD || "TU_PASSWORD",
    options: {
        trustServerCertificate: true,
        encrypt: false
    }
};

// Ruta de prueba
app.get("/api", (req, res) => {
    res.send("Servidor funcionando");
});

// Obtener productos
app.get("/productos", async (req, res) => {
    try {
        const resultado = await sql.query("SELECT * FROM Productos");
        res.json(resultado.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los productos" });
    }
});

// Arranca el servidor solo si la base de datos conectó
async function iniciar() {
    try {
        await sql.connect(config);
        console.log("✅ Base de datos conectada");
    } catch (err) {
        console.error("❌ No se pudo conectar a la base de datos:", err.message);
    }

    app.listen(3000, () => {
        console.log("Servidor iniciado en http://localhost:3000");
    });
}

iniciar();
