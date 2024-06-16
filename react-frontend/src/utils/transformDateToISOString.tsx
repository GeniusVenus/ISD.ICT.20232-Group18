const transformDateToISOString = (date: string) => {
  if (date) {
    const isoString = `${date}T00:00:00Z`;
    return isoString;
  }
  return "";
};

export default transformDateToISOString;
