import { Currency } from "~/types/model";

export default () => {
  const RMBToTEDExchange = 4.5
  function toTWD(currence:Currency, price:number, ammount:number){
    let result = 0
    switch(currence){
        case Currency.RMB:
            return price*RMBToTEDExchange*ammount
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