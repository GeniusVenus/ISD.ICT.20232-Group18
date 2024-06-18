const transformISOToDateString = (date: string) => {
  if (date) {
    return date.split("T")[0];
  }
  return "";
};

export default transformISOToDateString;
