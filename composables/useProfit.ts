import type { PurchaseInfo } from "~/types/purchaseInfo";
import type { Model } from "~/types/model";
import useExchange from "./useExchange";

export default () => {
  const { toTWD } = useExchange();

  function getProfit(purchaseInfo: PurchaseInfo, withAmount = false) {
    if (!purchaseInfo.price || !purchaseInfo.sellingPrice) return null
    const amount = withAmount ? purchaseInfo.amount : 1
    const sellingPriceTWD = toTWD(purchaseInfo.sellingCurrency, purchaseInfo.sellingPrice, amount, purchaseInfo.sellingExchangeRate)!
    const priceTWD = toTWD(purchaseInfo.currency, purchaseInfo.price, amount, purchaseInfo.exchangeRate)!
    return Math.round(sellingPriceTWD - priceTWD)
  }
  // 單一模型所有購買資訊（乘上數量）的毛利加總；全部算不出毛利時回傳 null
  function getModelProfit(model: Model) {
    const profits = (model.purchase_infos ?? [])
      .map(info => getProfit(info, true))
      .filter((profit): profit is number => profit !== null)
    if (!profits.length) return null
    return profits.reduce((total, profit) => total + profit, 0)
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
    getModelProfit,
    profitText,
    profitClass,
  };
};
