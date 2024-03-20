export default () => {
  const thisYear = getThisYear()
  const thisMonth = getThisMonth();

  //取得當下的日期
  function getThisYear() {
    return new Date().getFullYear();
  }
  function getThisMonth() {
    return new Date().getMonth() + 1;
  }

  //取得給定的日期之年月日
   function getYear(date: string | Date) {
    return new Date(date).getFullYear();
  }
  function getMonth(date: string | Date) {
    return new Date(date).getMonth() + 1;
  }

  //各種判定
  function isThisMoth(sorceDate:string | Date){
    return getYear(sorceDate) === thisYear && getMonth(sorceDate) === thisMonth
  }

  return {
    //data
    thisYear,
    thisMonth,
    //methods
    getYear,
    getMonth,
    getThisMonth,
    isThisMoth,
  };
};
