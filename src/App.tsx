import { useState } from 'react';
import { Header } from './components/Header';
import ProductList from './components/ProductList/ProductList';
import SubtotalContext from './contexts/SubtotalContext';

function App() {

  const [ subtotal, setSubtotal ] = useState(0);
  const [ subtotalWithTaxes, setSubtotalWithTaxes ] = useState(0);

  const addSale = (saleSubtotal:number, saleSubtotalWithTaxes:number) => {
    console.log('called add sale', saleSubtotal, saleSubtotalWithTaxes);
    setSubtotal(prev => prev + saleSubtotal);
    setSubtotalWithTaxes(prev => prev + saleSubtotalWithTaxes);
  }

  return (
    <SubtotalContext.Provider value={{
      subtotal,
      subtotalWithTaxes,
      addSale
    }}>
      <Header></Header>
      <div>
        <ProductList></ProductList>
      </div>
    </SubtotalContext.Provider>
  );
}

export default App;
