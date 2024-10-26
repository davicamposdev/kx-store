import { useState } from "react";
import PropTypes from "prop-types";
import Logo from "./Logo";
import ClientController from "../controllers/clientController";

function EditClientModal(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [clientSelected, setClientSelected] = useState(props.client);

  const clientController = new ClientController();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientSelected((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCloseClick = (e) => {
    e.preventDefault();
    props.handleCloseModal();
  };

  const handleDeleteClick = async (e) => {
    e.preventDefault();
    try {
      await clientController.deleteClient(clientSelected.id);
    } catch (error) {
      console.error("Error to delete client (front-end):", error);
    }
    setIsEditing(false);
    props.handleCloseModal();
    props.refresh();
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    try {
      await clientController.updateClient(clientSelected);
    } catch (error) {
      console.error("Error to update client (front-end):", error);
    }
    setIsEditing(false);
    props.refresh();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1">
      <div className="bg-slate-200 rounded-xl p-10 py-20 w-1/2 h-3/4 shadow-lg flex justify-between">
        <div className="flex flex-col justify-between">
          <h2 className="text-2xl text-kx-orange">User control</h2>
          <div className="flex gap-5 flex-col">
            <div>
              <p>Name</p>
              <input
                type="text"
                name="name"
                value={clientSelected.name}
                disabled={!isEditing}
                onChange={handleInputChange}
                className="border border-slate-400 bg-slate-200 font-josefin-light p-2 text-lg rounded-xl"
              />
            </div>
            <div>
              <p>Email</p>
              <input
                type="email"
                name="email"
                value={clientSelected.email}
                disabled={!isEditing}
                onChange={handleInputChange}
                className="border border-slate-400 bg-slate-200 font-josefin-light p-2 text-lg rounded-xl"
              />
            </div>
          </div>
          <div className="w-full grid grid-cols-3 gap-2 justify-between">
            {isEditing ? (
              <button
                className="bg-kx-orange text-white px-4 py-2 rounded-xl"
                onClick={handleSaveClick}
              >
                Save
              </button>
            ) : (
              <button
                className="bg-kx-orange text-white px-4 py-2 rounded-xl"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            )}
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-xl"
              onClick={handleDeleteClick}
            >
              Delete
            </button>
            <button
              onClick={handleCloseClick}
              className="bg-gray-500 text-white px-4 py-2 rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
        <Logo heigh={"h-full py-10"} />
      </div>
    </div>
  );
}
EditClientModal.propTypes = {
  client: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  refresh: PropTypes.func,
};

export default EditClientModal;
