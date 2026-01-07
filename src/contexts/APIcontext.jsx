import PropTypes from "prop-types";
import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import { NASA_METEORITE_API } from "../constants/urls";

const ApiContext = createContext();

const NUMBER = 5000; // Number of items to load initially

export function useApiContext() {
  return useContext(ApiContext);
}

export function ApiContextProvider({ children }) {
  const [meteoriteData, setMeteoriteData] = useState([]);
  const [filteredSearchInput, setFilteredSearchInput] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from local JSON
  const getMeteoriteData = async () => {
    try {
      const response = await axios.get(NASA_METEORITE_API);
      const data = response.data.slice(0, NUMBER);
      setMeteoriteData(data);
      setFilteredSearchInput(data);
    } catch (error) {
      console.error("Failed to fetch meteorite data:", error);
      setMeteoriteData([]);
      setFilteredSearchInput([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMeteoriteData();
  }, []);

  return (
    <ApiContext.Provider
      value={{
        meteoriteData,
        filteredSearchInput,
        setFilteredSearchInput,
        loading,
        setLoading,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
}

ApiContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
