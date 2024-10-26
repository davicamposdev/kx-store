require("dotenv").config();
const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: console.log,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Conectado ao banco de dados!");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err);
    setTimeout(() => {
      sequelize
        .authenticate()
        .then(() => {
          console.log("Conectado ao banco de dados após retry!");
        })
        .catch((err) => {
          console.error("Erro persistente:", err);
        });
    }, 5000);
  });

//Models
const Client = sequelize.define(
  "Client",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false,
    schema: "kx_store_schema",
  }
);

const Sale = sequelize.define(
  "Sale",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ownerName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    productName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    saleAmount: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    schema: "kx_store_schema",
  }
);

sequelize
  .sync()
  .then(() => {
    console.log("Modelo sincronizado com o banco de dados!");
  })
  .catch((err) => {
    console.error("Erro ao sincronizar o modelo:", err);
  });

// Relacionamento entre Client e Sale (exemplo)
// Client.hasMany(Sale);
// Sale.belongsTo(Client);

//Middleware
app.use(cors());
app.use(express.json());

//Clients Routes
app.post("/api/clients", async (req, res) => {
  try {
    console.log("Dados recebidos:", req.body);
    const newClient = await Client.create(req.body);
    res.status(201).json({ newClient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar cliente" });
  }
});

app.get("/api/clients", async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.status(200).json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar clientes" });
  }
});

app.put("/api/clients/:id", async (req, res) => {
  try {
    const clientId = req.params.id;
    const updatedData = req.body;

    const client = await Client.findByPk(clientId);
    console.log("Cliente encontrado:", client);

    if (!client) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }

    await client.update(updatedData);

    res.status(200).json({ message: "Cliente atualizado com sucesso", client });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar cliente" });
  }
});

app.delete("/api/clients/:id", async (req, res) => {
  try {
    const clientId = req.params.id;
    const deletedClient = await Client.destroy({
      where: { id: clientId },
    });

    if (!deletedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error to delete client" });
  }
});

//Sales Routes
app.post("/api/sales", async (req, res) => {
  try {
    console.log("Dados recebidos:", req.body);
    const newSale = await Sale.create(req.body);
    res.status(201).json({ newSale });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar venda" });
  }
});

app.get("/api/sales", async (req, res) => {
  try {
    const sales = await Sale.findAll();
    res.status(200).json(sales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar venda" });
  }
});

app.put("/api/sales/:id", async (req, res) => {
  try {
    const saleId = req.params.id;
    const updatedData = req.body;

    const sale = await Sale.findByPk(saleId);
    console.log("Venda encontrada:", sale);

    if (!sale) {
      return res.status(404).json({ message: "Venda não encontrada" });
    }

    await sale.update(updatedData);

    res.status(200).json({ message: "Venda atualizada com sucesso", sale });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar venda" });
  }
});

app.delete("/api/sales/:id", async (req, res) => {
  try {
    const saleId = req.params.id;
    const deletedSale = await Sale.destroy({
      where: { id: saleId },
    });

    if (!deletedSale) {
      return res.status(404).json({ message: "Venda nao encontrada" });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar venda" });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
