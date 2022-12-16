import { useContext } from 'react';
import styled from 'styled-components';
import SubtotalContext from '../contexts/SubtotalContext';

const HeaderComponent = styled.header`
  background-color: #ffa500;
`;

const ValuesContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const Value = styled.span`
  margin: 0px 24px;
  color: white;
  font-size: 20px;
`;

export function Header() {

  const { subtotal, subtotalWithTaxes } = useContext(SubtotalContext);

  return (
    <HeaderComponent>
      <img
        src="https://santex.wpengine.com/wp-content/uploads/2019/02/logo-santex@3x.png"
        alt="logo"
      />
      <ValuesContainer>
        <Value>SubTotal $ {subtotal}</Value>
        <Value>SubTotal with taxes $ {subtotalWithTaxes}</Value>
      </ValuesContainer>
    </HeaderComponent>
  );
}
