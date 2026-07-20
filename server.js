const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
const config = {
    server: "localhost",
    database: "VAULT_DB",
    options: {
        instanceName: "MSSQLSERVER",
        trustServerCertificate: true,
        encrypt: false
    }
};

// Conectar a SQL
sql.connect(config)
.then(() => console.log("✅ Base de datos conectada"))
.catch(err => console.log(err));

// Ruta principal
app.get("/", (req,res)=>{

    res.send("Servidor funcionando");

});

// Obtener productos
app.get("/productos", async(req,res)=>{

    try{

        const resultado = await sql.query("SELECT * FROM Productos");

        res.json(resultado.recordset);

    }catch(error){

        console.log(error);

        res.status(500).send("Error");

    }

}); 

app.listen(3000,()=>{

    console.log("Servidor iniciado en puerto 3000");

});