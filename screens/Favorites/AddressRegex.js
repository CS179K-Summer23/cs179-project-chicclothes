export const validateZipcode = (zip) => {
    const regex = /^\d{5}$/;
    if (!regex.test(zip)) {
      return "Only 5 digits are allowed for zipcode.";
    }
    return "";
  };