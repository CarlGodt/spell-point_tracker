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
import { useHistory } from 'react-router-dom';

const Navigation: FunctionComponent = () => {
  const [isActive, setActive] = useState<boolean>(false);
  const history = useHistory();

  const navigate = useCallback((path: string) => {
    history.push(path);
    setActive(false);
  }, [history, setActive]);

  const toggleActive = useCallback(() => {
    setActive(!isActive);
  }, [isActive]);

  return (
    <Navbar className="has-shadow">
      <Container>
        <NavbarBrand>
          <NavbarItem onClick={() => navigate('/')}>Spellpoint Tracker</NavbarItem>
          <NavbarBurger isActive={isActive} onClick={toggleActive} />
        </NavbarBrand>
        <NavbarMenu isActive={isActive} className="navMenu">
          <NavbarEnd>
            <NavbarItem onClick={() => navigate('/')}>Character List</NavbarItem>
            <NavbarItem onClick={() => navigate('create')}>Create Character</NavbarItem>
            <NavbarItem>Exit</NavbarItem>
          </NavbarEnd>
        </NavbarMenu>
      </Container>
    </Navbar>
  );
}

export default Navigation;