import { ReactNode, ReactNodeArray, FunctionComponent } from "react";
import React from "react";
import { Card, CardHeader, CardHeaderTitle, CardContent } from "bloomer";

interface $Props {
  title: string;
  children: ReactNode | ReactNodeArray;
}

const DisplayCard: FunctionComponent<$Props> = ({ title, children }) => (
  <Card>
    <CardHeader>
      <CardHeaderTitle>
        {title}
      </CardHeaderTitle>
    </CardHeader>
    <CardContent>
      {children}
    </CardContent>
  </Card>
);

export default DisplayCard;