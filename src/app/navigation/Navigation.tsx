import React, { FunctionComponent, useState, useCallback } from 'react';
import {
  NavbarBrand,
  Navbar,
  Container,
  NavbarItem,
  NavbarBurger,
  NavbarMenu,
  NavbarEnd
} from 'bloomer';
import './navigation.scss';

const Navigation: FunctionComponent = () => {
  const [isActive, setActive] = useState<boolean>(false);

  const toggleActive = useCallback(() => {
    setActive(!isActive);
  }, [isActive]);

  return (
    <Navbar className="has-shadow">
      <Container>
        <NavbarBrand>
          <NavbarItem>Spellpoint Tracker</NavbarItem>
          <NavbarBurger isActive={isActive} onClick={toggleActive} />
        </NavbarBrand>
        <NavbarMenu isActive={isActive} className="navMenu has-background-grey-dark">
          <NavbarEnd>
            <NavbarItem>Create Character</NavbarItem>
            <NavbarItem>Exit</NavbarItem>
          </NavbarEnd>
        </NavbarMenu>
      </Container>
    </Navbar>
  );
}

export default Navigation;