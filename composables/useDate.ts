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
  function isThisMoth(sorceDate:string | Date, targetDate:string| Date){
    const formateSorce = formateDateYYYYMM(sorceDate,'-')
    const formatTargetDate = formateDateYYYYMM(targetDate,'-')
    console.log('轉換過後的來源', formateSorce, '轉換後的目標日期', formatTargetDate)
    return getYear(formateSorce) === getYear(formatTargetDate) && getMonth(formateSorce) === getMonth(formatTargetDate)
  }

  //日期排序
  function sortDateArray(arr:string[] | Date[]){
    return arr.sort((a,b)=>{
      return new Date(a).getTime() - new Date(b).getTime()})
  }

  //各種格式化
  function formateDateYYYYMM(date:Date | string, symbol:'-' | '/'){ //2024-3 || 2024/3
    if(!date) return ''
    return `${getYear(date)}${symbol}${getMonth(date)}`
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
    sortDateArray,
    formateDateYYYYMM
  };
};
