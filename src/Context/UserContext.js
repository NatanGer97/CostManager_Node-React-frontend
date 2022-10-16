import React from "react";
const UserContext = React.createContext({
  decodedToken: "empty",
  decodeToken: (token) => {},
  getDecodedToken: () => {},
});

export default UserContext;
