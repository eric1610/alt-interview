import { useCallback } from "react";
import { ProductType } from "./ProductCard";
import cancel from "./cancel.svg";
import "./styles.css";

type ProductModalType = {
  info: ProductType;
  onClose: () => void;
};
const ProductModal = ({ info, onClose }: ProductModalType) => {
  const {
    grade,
    gradingCompany,
    images,
    itemName,
    lowestListingPrice,
    name,
    subject,
    year,
  } = info;
  const onClickHandler = useCallback(() => {
    onClose();
  }, []);
  return (
    <div className="display-grid">
      <div>
        <button
          type="button"
          className="action-button"
          onClick={onClickHandler}
        >
          <img src={cancel} className="icon" />
        </button>
      </div>
      <div className="modal-contents">
        <div>
          <img src={images[0].url} className="modal-image" alt={itemName} />
        </div>
        <div>
          <div>
            <p>
              Item name: {itemName}
              <br />
              Name: {name}
              <br />
              Subject: {subject}
              <br />
              Year: {year}
              <br />
              Grading Company: {gradingCompany}
              <br />
              Grade: {grade}
              <br />
              Lowest listing price: {lowestListingPrice}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
