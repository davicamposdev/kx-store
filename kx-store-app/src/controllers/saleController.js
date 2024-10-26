import axios from "axios";

class SaleController {
  async addSale(sale) {
    try {
      if (!sale.ownerName || !sale.productName || !sale.saleAmount) {
        console.log(sale.ownerName, sale.productName, sale.saleAmount);
        throw new Error(
          "Owner name, product name and sale amount are required!"
        );
      }

      const data = {
        ownerName: sale.ownerName,
        productName: sale.productName,
        saleAmount: sale.saleAmount,
      };

      const response = await axios.post(
        "http://localhost:3000/api/sales",
        data
      );
      console.log("Sucess to add sale!", response.data);
    } catch (error) {
      console.error("Error to add sale (controller):", error);
    }
  }

  async updateSale(sale) {
    try {
      if (!sale.id) {
        throw new Error("sale ID is required for update!");
      }

      const data = {
        id: sale.id,
        ownerName: sale.ownerName,
        productName: sale.productName,
        saleAmount: sale.saleAmount,
      };

      const response = await axios.put(
        `http://localhost:3000/api/sales/${sale.id}`,
        data
      );

      console.log("Success to update sale!", response.data);
    } catch (error) {
      console.error("Error to update sale (controller):", error);
    }
  }

  async deleteSale(saleId) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/sales/${saleId}`
      );
      console.log("Success to delete sale!", response.data);
    } catch (error) {
      console.error("Error to delete sale (controller):", error);
    }
  }
}

export default SaleController;
