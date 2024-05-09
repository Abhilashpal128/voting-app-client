export const SetDataOnLocalStorage = (data) => {
  const userData = JSON.stringify(data);
  localStorage.setItem("UserData", userData);
};

export const getDataFromLocalStorage = () => {
  const data = JSON.parse(localStorage.getItem("UserData"));
  return data;
};
