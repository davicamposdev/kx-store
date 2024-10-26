import { useState } from "react";
import Logo from "./Logo";
import PropTypes from "prop-types";
import SaleController from "../controllers/saleController";

function AddSaleModal(props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const saleController = new SaleController();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitSale = async (e) => {
    e.preventDefault();
    try {
      await saleController.addSale(formData);
    } catch (error) {
      console.error("Error to add sale (modal):", error);
    }
    props.handleCloseModal();
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1">
      <div className="bg-slate-200 rounded-xl p-10 py-20 w-1/2 h-3/4 shadow-lg flex justify-between">
        <form className="flex flex-col justify-between h-full">
          <div>
            <div>
              <label>Owner name</label>
              <input
                type="text"
                id="ownerName"
                name="ownerName"
                onChange={handleInputChange}
                className="border border-slate-400 bg-slate-200 font-josefin-light p-2 text-lg rounded-xl"
              />
            </div>
            <div>
              <label>Product name</label>
              <input
                type="text"
                id="productName"
                name="productName"
                onChange={handleInputChange}
                className="border border-slate-400 bg-slate-200 font-josefin-light p-2 text-lg rounded-xl"
              />
            </div>
            <div>
              <label>Sale amount</label>
              <input
                type="number"
                id="saleAmount"
                name="saleAmount"
                onChange={handleInputChange}
                className="border border-slate-400 bg-slate-200 font-josefin-light p-2 text-lg rounded-xl"
              />
            </div>
          </div>
          <div className="w-full grid grid-cols-3 gap-2 justify-between">
            <button
              type="submit"
              onClick={handleSubmitSale}
              className="bg-kx-orange text-white px-4 py-2 rounded-xl"
            >
              Add Sale
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-xl">
              Delete
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-xl"
              onClick={(e) => {
                e.preventDefault;
                props.handleCloseModal();
              }}
            >
              Close
            </button>
          </div>
        </form>
        <Logo heigh={"h-full py-10"} />
      </div>
    </div>
  );
}

AddSaleModal.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
};

export default AddSaleModal;
