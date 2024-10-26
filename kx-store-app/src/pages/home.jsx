import { SquarePlus } from "lucide-react";
import NavBar from "../components/NavBar";
import ClientList from "../components/ClientList";
import { useState, useEffect } from "react";
import AddClientModal from "../components/AddClientModal";

const Home = () => {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);
  const [isAddingClient, setIsAddingClient] = useState(false);

  const fetchClients = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/clients");
      if (!response.ok) {
        throw new Error("Error to find clients");
      }
      const data = await response.json();
      setClients(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  function handleCloseModal() {
    setIsAddingClient(false);
    fetchClients();
  }

  if (error) return <div>{error}</div>;

  return (
    <div>
      <NavBar />
      <section className="p-8 px-14">
        <div className="flex w-full justify-between">
          <h1 className="mb-4 text-4xl text-kx-orange">Clients</h1>
          <button onClick={() => setIsAddingClient(true)}>
            <SquarePlus color="#D87607" />
          </button>
        </div>
        <ClientList clients={clients} refresh={fetchClients} />
      </section>
      {isAddingClient && <AddClientModal handleCloseModal={handleCloseModal} />}
    </div>
  );
};

export default Home;
