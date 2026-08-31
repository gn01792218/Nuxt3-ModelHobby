import type { PurchaseInfo } from "~/types/purchaseInfo";

export default () => {
  const { toTWD } = useExchange();

  function getProfit(purchaseInfo: PurchaseInfo, withAmount = false) {
    if (!purchaseInfo.price || !purchaseInfo.sellingPrice) return null
    const amount = withAmount ? purchaseInfo.amount : 1
    const sellingPriceTWD = toTWD(purchaseInfo.sellingCurrency, purchaseInfo.sellingPrice, amount)!
    const priceTWD = toTWD(purchaseInfo.currency, purchaseInfo.price, amount)!
    return Math.round(sellingPriceTWD - priceTWD)
  }
  function profitText(profit: number) {
    return profit > 0 ? `+${profit}` : `${profit}`
  }
  function profitClass(profit: number) {
    if (profit > 0) return 'text-red-500'
    if (profit < 0) return 'text-green-500'
    return ''
  }

  return {
    //methods
    getProfit,
    profitText,
    profitClass,
  };
};
