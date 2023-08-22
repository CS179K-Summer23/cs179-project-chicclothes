export const validateZipcode = (zip) => {
    const regex = /^\d{5}$/;
    if (!regex.test(zip)) {
      return "Only 5 digits are allowed for zipcode.";
    }
    return "";
  };


  export const validatePhoneNumber = (number) => {
    const regex = /^\d{10}$/;
    if (!regex.test(number)) {
        return "Only 10 digits are allowed for phone number.";
    }
    return "";
}
