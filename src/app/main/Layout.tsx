import { Hero, HeroBody, HeroFooter, HeroHeader, Container } from 'bloomer';
import React, { FunctionComponent, ReactNode } from 'react';
import Navigation from '../navigation/Navigation';

interface $Props {
  body: ReactNode;
  footer?: ReactNode;
}

const Layout: FunctionComponent<$Props> = ({ body, footer }) => {
  return (
    <Hero isColor="dark" isSize="small">
      <HeroHeader>
        <Navigation />
      </HeroHeader>
      <HeroBody>
        <Container>{body}</Container>
      </HeroBody>
      <HeroFooter>
        <Container>{footer}</Container>
      </HeroFooter>
    </Hero>
  );
};

export default Layout;
