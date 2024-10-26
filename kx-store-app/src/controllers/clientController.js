import axios from "axios";

class ClientController {
  async addClient(client) {
    try {
      if (!client.name || !client.email) {
        console.log(client.name, client.email);
        throw new Error("Name and email are required!");
      }

      const data = {
        name: client.name,
        email: client.email,
      };

      const response = await axios.post(
        "http://localhost:3000/api/clients",
        data
      );
      console.log("Sucess to add client!", response.data);
    } catch (error) {
      console.error("Error to add client (controller):", error);
    }
  }

  async updateClient(client) {
    try {
      if (!client.id) {
        throw new Error("Client ID is required for update!");
      }

      const data = {
        id: client.id,
        name: client.name,
        email: client.email,
      };

      const response = await axios.put(
        `http://localhost:3000/api/clients/${client.id}`,
        data
      );
      console.log("Success to update client!", response.data);
    } catch (error) {
      console.error("Error to update client (controller):", error);
    }
  }

  async deleteClient(clientId) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/clients/${clientId}`
      );
      console.log("Success to delete client!", response.data);
    } catch (error) {
      console.error("Error to delete client (controller):", error);
    }
  }
}

export default ClientController;
