import { useState } from "react";
import Logo from "./Logo";
import PropTypes from "prop-types";
import ClientController from "../controllers/clientController";

function AddClientModal(props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const clientController = new ClientController();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitClient = async (e) => {
    e.preventDefault();
    try {
      await clientController.addClient(formData);
    } catch (error) {
      console.error("Error to add client (modal):", error);
    }
    props.handleCloseModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1">
      <div className="bg-slate-200 rounded-xl p-10 py-20 w-1/2 h-3/4 shadow-lg flex justify-between items-center">
        <form className="flex flex-col h-full justify-evenly">
          <div>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="clientName"
                name="name"
                onChange={handleInputChange}
                className="border border-slate-400 bg-slate-200 font-josefin-light p-2 text-lg rounded-xl"
              />
            </div>
            <div className="mt-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="clientEmail"
                name="email"
                onChange={handleInputChange}
                className="border border-slate-400 bg-slate-200 font-josefin-light p-2 text-lg rounded-xl"
              />
            </div>
          </div>
          <div className="w-full grid grid-cols-2 gap-2 justify-between">
            <button
              type="submit"
              onClick={handleSubmitClient}
              className="bg-kx-orange text-white px-4 py-2 rounded-xl"
            >
              Add Client
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-xl"
              onClick={(e) => {
                e.preventDefault;
                props.handleCloseModal();
              }}
            >
              Cancel
            </button>
          </div>
        </form>
        <Logo heigh={"h-full py-10"} />
      </div>
    </div>
  );
}

AddClientModal.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
};

export default AddClientModal;
