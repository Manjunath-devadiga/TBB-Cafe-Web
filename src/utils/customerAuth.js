export const getCustomer = () => {

  const customer =
    localStorage.getItem("customer");

  return customer
    ? JSON.parse(customer)
    : null;
};

export const getToken = () => {

  return localStorage.getItem(
    "customerToken"
  );
};

export const logoutCustomer = () => {

  localStorage.removeItem(
    "customer"
  );

  localStorage.removeItem(
    "customerToken"
  );
};