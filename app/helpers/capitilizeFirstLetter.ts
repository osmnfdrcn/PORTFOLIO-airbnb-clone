export const capitalizeFirstLetter = (value: string) => {
  if (value.length === 0) {
    return value;
  } else {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
};
