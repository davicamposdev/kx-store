import { Pencil } from "lucide-react";
import { useState } from "react";
import PropTypes from "prop-types";
import EditSaleModal from "./EditSaleModal";

function SalesList(props) {
  const [isEditingSales, setIsEditingSales] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);

  function handleCloseModal() {
    setIsEditingSales(false);
  }

  function handleEditClick(sale) {
    setSelectedSale(sale);
    setIsEditingSales(true);
  }

  return (
    <div>
      <ul className="bg-kx-orange rounded-xl p-3 flex flex-col gap-3">
        {props.sales.map((sale) => (
          <li
            key={sale.id}
            className="bg-kx-beige p-2 rounded-xl flex justify-between items-center px-5 text-lg"
          >
            <div>
              <p className="text-kx-orange">{sale.ownerName}</p>
              <p className="font-josefin-lightitalic">{sale.productName}</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-2xl mt-1">$ {sale.saleAmount}</p>
              <button onClick={() => handleEditClick(sale)}>
                <Pencil />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {isEditingSales && (
        <EditSaleModal
          sale={selectedSale}
          handleCloseModal={handleCloseModal}
          refresh={props.refresh}
        />
      )}
    </div>
  );
}

SalesList.propTypes = {
  sales: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      ownerName: PropTypes.string.isRequired,
      productName: PropTypes.string.isRequired,
      saleAmount: PropTypes.number.isRequired,
    })
  ).isRequired,
  refresh: PropTypes.func,
};

export default SalesList;
