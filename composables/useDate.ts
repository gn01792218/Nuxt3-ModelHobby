export default () => {
  const thisMonth = getThisMonth();
  function getThisMonth() {
    return new Date().getMonth() + 1;
  }
  function getMonth(date: string | Date) {
    return new Date(date).getMonth() + 1;
  }

  return {
    //data
    thisMonth,
    //methods
    getThisMonth,
    getMonth,
  };
};
