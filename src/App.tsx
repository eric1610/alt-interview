import { useState } from "react";
import ProductCard, { ProductType } from "./ProductCard";
import ProductModal from "./ProductModal";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import "./styles.css";

const App = () => {
  const [recentSearch, setRecentSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<ProductType[]>([]);
  const [maxPages, setMaxPages] = useState<number>(0);
  const [currPage, setCurrPage] = useState<number>(0);
  const [modalInfo, setModalInfo] = useState<ProductType>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const onSearch = (searchText: string, page: number) => {
    const reqOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-algolia-api-key": "cf0df355324891a712c5c43d83383f17",
        "x-algolia-application-id": "B1DNT5RUEF",
      },
      body: JSON.stringify({ query: searchText, page }),
    };

    const reqURL =
      "https://B1DNT5RUEF-dsn.algolia.net/1/indexes/prod_listing_grouped/query";
    const retryFetch = async (
      reqOptions: any,
      reqURL: string,
      retry: number
    ) => {
      try {
        const data = await (await fetch(reqURL, reqOptions)).json();
        setSearchResults(data.hits);
        setMaxPages(data.nbPages);
        setRecentSearch(searchText);
      } catch (error) {
        if (retry < 5) {
          retryFetch(reqOptions, reqURL, retry + 1);
        } else {
          console.log("Repeated requests 5 times. Error is due to: ", error);
        }
      }
    };
    retryFetch(reqOptions, reqURL, 0);
  };

  const onCardClickHandler = (info: ProductType) => {
    setModalInfo(info);
    setModalVisible(true);
  };

  const onCloseHandler = () => {
    setModalVisible(false);
    setModalInfo(undefined);
  };

  const nextPageHandler = () => {
    setCurrPage((prev) => {
      const res = prev + 1;
      onSearch(recentSearch, res);
      return res;
    });
  };

  const prevPageHandler = () => {
    setCurrPage((prev) => {
      const res = prev - 1;
      onSearch(recentSearch, res);
      return res;
    });
  };

  const hideMainContent = modalVisible ? "display-none" : "";
  return (
    <div>
      <div>
        {modalVisible && modalInfo && (
          <ProductModal info={modalInfo} onClose={onCloseHandler} />
        )}
      </div>
      <div className={hideMainContent}>
        <h1>ALT Product Search</h1>
        <SearchBar search={onSearch} />
        <h2>Products Gallery</h2>
        <div className="gallery">
          {searchResults?.length <= 0 ? (
            <h3>Current no search results</h3>
          ) : (
            searchResults?.map((info: ProductType) => (
              <ProductCard
                key={info.objectID}
                info={info}
                onCardClick={onCardClickHandler}
              />
            ))
          )}
        </div>
        {maxPages > 0 && (
          <Pagination
            prevPageHandler={prevPageHandler}
            currPage={currPage}
            maxPages={maxPages}
            nextPageHandler={nextPageHandler}
          />
        )}
      </div>
    </div>
  );
};

export default App;
