import { useCallback, useState } from "react";
import "./styles.css";
import emptyStar from "./star-empty.svg";
import filledStar from "./star-filled.svg";

type ImageType = {
  url: string;
  position: string;
};

export type ProductType = {
  objectID: "d39b2a50-d577-4d70-b63e-c531ed05cf10-BGS-10.5";
  grade: string;
  gradingCompany: string;
  images: ImageType[];
  itemName: string;
  lowestListingPrice: number;
  name: string;
  subject: string;
  year: number;
};

type ProductCardType = {
  info: ProductType;
  onCardClick: (info: ProductType) => void;
};

const ProductCard = ({ info, onCardClick }: ProductCardType) => {
  const {
    objectID,
    grade,
    gradingCompany,
    images,
    itemName,
    lowestListingPrice,
    name,
    subject,
    year,
  } = info;
  const [favourite, setFavourite] = useState<boolean>(
    window.localStorage.getItem(objectID) === "fave"
  );
  const onCardClickHandler = useCallback(() => {
    onCardClick({
      objectID,
      grade,
      gradingCompany,
      images,
      itemName,
      lowestListingPrice,
      name,
      subject,
      year,
    });
  }, [
    objectID,
    grade,
    gradingCompany,
    images,
    itemName,
    lowestListingPrice,
    name,
    subject,
    year,
    onCardClick,
  ]);

  const onFavouriteHandler = () => {
    setFavourite((prev) => {
      window.localStorage.setItem(objectID, prev ? "" : "fave");
      return !prev;
    });
  };
  return (
    <div className="card">
      <div className="favorite-bar">
        <button
          type="button"
          className="action-button"
          onClick={onFavouriteHandler}
        >
          <img
            src={favourite ? filledStar : emptyStar}
            className="icon"
            alt={favourite ? "favourite" : "not favourite"}
          />
        </button>
      </div>
      <button
        type="button"
        className="card-image-wrapper"
        onClick={onCardClickHandler}
      >
        <img src={images[0].url} className="card-image" alt={itemName} />
      </button>
      <div className="card-details">
        <div>
          <p className="card-text-info">
            {itemName}
            <br />
            {subject} {year}
            <br />
            {gradingCompany} {grade}
          </p>
        </div>
        <div>
          <p>
            Lowest listing price:
            <br />
            {lowestListingPrice}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
