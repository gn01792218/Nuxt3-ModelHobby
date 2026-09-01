import { Currency } from "~/types/model";

export default () => {
  const RMBToTEDExchange = 4.5
  function toTWD(currence:Currency, price:number, ammount:number, exchangeRate?:number|null){
    switch(currence){
        case Currency.RMB:
            return price*(exchangeRate ?? RMBToTEDExchange)*ammount
        case Currency.TW:
            return price*ammount
    }
  }

  return {
    //data
    //methods
    toTWD,
  };
};