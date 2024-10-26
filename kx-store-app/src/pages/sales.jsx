import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { SquarePlus } from "lucide-react";
import AddSaleModal from "../components/AddSaleModal";
import SalesList from "../components/SalesList";

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [error, setError] = useState(null);
  const [isAddingSale, setIsAddingSale] = useState(false);

  const fetchSales = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/sales");
      if (!response.ok) {
        throw new Error("Error to find sales");
      }
      const data = await response.json();
      setSales(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  function handleCloseModal() {
    setIsAddingSale(false);
    fetchSales();
  }

  if (error) return <div>{error}</div>;

  return (
    <div>
      <NavBar />
      <section className="p-8 px-14">
        <div className="flex w-full justify-between">
          <h1 className="text-4xl text-kx-orange mb-4">Sales</h1>
          <button onClick={() => setIsAddingSale(true)}>
            <SquarePlus color="#D87607" />
          </button>
        </div>
        <SalesList sales={sales} refresh={fetchSales} />
      </section>

      {isAddingSale && <AddSaleModal handleCloseModal={handleCloseModal} />}
    </div>
  );
};

export default Sales;
