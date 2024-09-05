import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
const ClubsContext = createContext();
export const ClubsProvider = ({ children }) => {
  const [clubs, setClubs] = useState([]);
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/auth/clubs"
        );
        if (response.data.success) {
          setClubs(response.data.clubs);
        }
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };
    fetchClubs();
  }, []);

  return (
    <ClubsContext.Provider value={{ clubs, setClubs }}>
      {children}
    </ClubsContext.Provider>
  );
};

export default ClubsContext;
