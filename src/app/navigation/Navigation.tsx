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
import { Link } from 'react-router-dom';

const Navigation: FunctionComponent = () => {
  const [isActive, setActive] = useState<boolean>(false);

  const toggleActive = useCallback(() => {
    setActive(!isActive);
  }, [isActive]);

  return (
    <Navbar className="has-shadow">
      <Container>
        <NavbarBrand>
          <NavbarItem><Link to="/">Spellpoint Tracker</Link></NavbarItem>
          <NavbarBurger isActive={isActive} onClick={toggleActive} />
        </NavbarBrand>
        <NavbarMenu isActive={isActive} className="navMenu has-background-grey-dark">
          <NavbarEnd>
            <NavbarItem><Link to="/">Character List</Link></NavbarItem>
            <NavbarItem><Link to="create">Create Character</Link></NavbarItem>
            <NavbarItem>Exit</NavbarItem>
          </NavbarEnd>
        </NavbarMenu>
      </Container>
    </Navbar>
  );
}

export default Navigation;