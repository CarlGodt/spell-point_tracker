import { Hero, HeroBody, HeroFooter, HeroHeader, Container } from 'bloomer';
import React, { FunctionComponent, ReactNode } from 'react';
import Navigation from '../navigation/Navigation';
import styles from './layout.module.scss';

interface $Props {
  body: ReactNode;
  footer?: ReactNode;
}

const Layout: FunctionComponent<$Props> = ({ body, footer }) => {
  return (
    <Hero isColor="dark" isSize="small" className={styles.fixedHero}>
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
