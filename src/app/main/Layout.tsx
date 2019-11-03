import { Hero, HeroBody, HeroFooter, HeroHeader } from "bloomer";
import React, { FunctionComponent, ReactNode } from "react";
import Navigation from "../navigation/Navigation";
import styles from './layout.module.scss';

interface $Props {
  body: ReactNode;
  footer?: ReactNode;
}

const Layout: FunctionComponent<$Props> = ({body, footer}) => {
  return (
    <Hero isColor="dark" isSize='small' className={styles.fixedHero}>
    <HeroHeader>
      <Navigation/>
    </HeroHeader>

    <HeroBody>
      {body}
    </HeroBody>

    <HeroFooter>
      {footer}
    </HeroFooter>
  </Hero>
  );
}

export default Layout;