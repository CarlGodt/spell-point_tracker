import { Hero, HeroBody, HeroFooter, HeroHeader } from "bloomer";
import React, { FunctionComponent, ReactNode } from "react";
import Navigation from "../navigation/Navigation";

interface $Props {
  body: ReactNode;
  footer?: ReactNode;
}

const Layout: FunctionComponent<$Props> = ({body, footer}) => {
  return (
    <Hero isColor="dark" isSize='small'>
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