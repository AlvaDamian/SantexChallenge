import { Header } from './components/Header';
import ProductList from './components/ProductList/ProductList';
import SubtotalContext from './contexts/SubtotalContext';
import useStateWithStorage from './hooks/useStateWithStorage';

function App() {

  const [ subtotal, setSubtotal ] = useStateWithStorage("subtotal", 0);
  const [ subtotalWithTaxes, setSubtotalWithTaxes ] = useStateWithStorage("subtotalWithTaxes", 0);

  const addSale = (saleSubtotal:number, saleSubtotalWithTaxes:number) => {
    console.log('called add sale', saleSubtotal, saleSubtotalWithTaxes);
    setSubtotal((prev:string | null) => (prev ? +prev : 0) + saleSubtotal);
    setSubtotalWithTaxes((prev:string | null) => "" + ((prev ? +prev : 0) + saleSubtotalWithTaxes));
  }

  return (
    <SubtotalContext.Provider value={{
      subtotal: +subtotal,
      subtotalWithTaxes: +subtotalWithTaxes,
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
