export const applyDiscount = (code, totalValue) => {
  let discountRate = 0;

  switch (code) {
    case "SAVE20":
      discountRate = 0.20;
      break;
    case "STUDENT30":
      discountRate = 0.30;
      break;
    case "RANDOM10":
      discountRate = 0.10;
      break;
    default:
      discountRate = 0;
      break;
  }

  const discountedTotal = totalValue * (1 - discountRate);
  return {
      originalTotal: totalValue,
      discountRate: discountRate,
      discountedTotal: discountedTotal
  };
};