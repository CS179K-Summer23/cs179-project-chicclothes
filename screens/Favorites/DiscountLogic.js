export const applyDiscount = (code, totalValue) => {
  let discountRate = 0;

  switch (code) {
    case "MEMBER25":
      discountRate = 0.25;
      break;
    case "STUDENT30":
      discountRate = 0.30;
      break;
    case "PROFESSOR50":
      discountRate = 0.50;
      break;
    case "BABY ALIVE":
      discountRate = 0.50;
      break;
    case "RANDOM10":
      discountRate = 0.10;
      break;
    case "EXERCISE20":
      discountRate = 0.20;
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