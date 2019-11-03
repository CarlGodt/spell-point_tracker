import React, { FunctionComponent, useState, useCallback } from 'react';
import {
  NavbarBrand,
  Navbar,
  Container,
  NavbarItem,
  Content,
} from 'bloomer';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';

const Navigation: FunctionComponent = () => {
  const history = useHistory();

  return (
    <Navbar className="has-shadow">
      <Container isDisplay="flex" style={{alignItems: 'center', justifyContent: 'space-between'}}>
        <NavbarBrand isDisplay="inline-flex">
          <NavbarItem onClick={() => history.push('/')}>Spellpoint Tracker</NavbarItem>
        </NavbarBrand>
        <Content isDisplay="inline-block" hasTextAlign="right">
          <NavbarItem onClick={() => history.push('/')}>
            <FontAwesomeIcon icon={faList} />
          </NavbarItem>
        </Content>
      </Container>
    </Navbar>
  );
}

export default Navigation;