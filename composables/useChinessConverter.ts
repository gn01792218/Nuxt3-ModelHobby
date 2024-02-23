import * as OpenCC from 'opencc-js';
export default () => {
  const tradictionalToSimpleConverter = OpenCC.Converter({ from: 'hk', to: 'cn' });
  function converTradictionalToSimple(str:string){
    return tradictionalToSimpleConverter(str)
  }

  return {
    //data
    //methods
    converTradictionalToSimple,
  };
};