import { createContext, useState } from "react";

export const CustomerContext = createContext();

export function CustomerProvider({ children }) {
  const [customer, setCustomer] = useState(
    JSON.parse(localStorage.getItem("customer"))
  );

  const login = (user) => {
    localStorage.setItem(
      "customer",
      JSON.stringify(user)
    );
    setCustomer(user);
  };

  const logout = () => {
    localStorage.removeItem("customer");
    setCustomer(null);
  };

  return (
    <CustomerContext.Provider
      value={{
        customer,
        login,
        logout,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}