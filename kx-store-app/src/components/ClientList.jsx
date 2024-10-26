import { useState } from "react";
import { Image, UserPen } from "lucide-react";
import PropTypes from "prop-types";
import EditClientModal from "./EditClientModal";

function ClientList(props) {
  const [isEditingClient, setIsEditingClient] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  function handleCloseModal() {
    setIsEditingClient(false);
  }

  function handleEditClient(client) {
    setSelectedClient(client);
    setIsEditingClient(true);
  }

  return (
    <div>
      <ul className="bg-kx-orange rounded-xl p-3 flex flex-col gap-3">
        {props.clients.map((client) => (
          <li
            key={client.id}
            className="bg-kx-beige p-2 rounded-xl flex justify-between items-center px-5 text-lg"
          >
            <div className="flex items-center gap-4">
              <Image />
              <div>
                <h1 className="text-orange-500">{client.name}</h1>
                <p className="font-josefin-lightitalic text-lg">
                  {client.email}
                </p>
              </div>
            </div>
            <button onClick={() => handleEditClient(client)}>
              <UserPen />
            </button>
          </li>
        ))}
      </ul>

      {isEditingClient && (
        <EditClientModal
          client={selectedClient}
          handleCloseModal={handleCloseModal}
          refresh={props.refresh}
        />
      )}
    </div>
  );
}

ClientList.propTypes = {
  clients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ).isRequired,
  refresh: PropTypes.func,
};

export default ClientList;
