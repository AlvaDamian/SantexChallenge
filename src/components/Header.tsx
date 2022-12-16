import { useContext } from 'react';
import SubtotalContext from '../contexts/SubtotalContext';

export function Header() {

  const { subtotal, subtotalWithTaxes } = useContext(SubtotalContext);

  return (
    <header style={{ background: 'red' }}>
      <img
        src="https://santex.wpengine.com/wp-content/uploads/2019/02/logo-santex@3x.png"
        alt="logo"
      />
      <div>SubTotal $ {subtotal}</div>
      <div>SubTotal with taxes $ {subtotalWithTaxes}</div>
    </header>
  );
}
