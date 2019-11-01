import { ReactNode, ReactNodeArray, FunctionComponent } from "react";
import React from "react";
import { Card, CardHeader, CardHeaderTitle, CardContent, CardHeaderIcon } from "bloomer";

interface $Props {
  title: string;
  children: ReactNode | ReactNodeArray;
  headerIcon?: ReactNode;
}

const DisplayCard: FunctionComponent<$Props> = ({ title, headerIcon, children }) => (
  <Card>
    <CardHeader>
      <CardHeaderTitle>
        {title}
      </CardHeaderTitle>
      {headerIcon && (
        <CardHeaderIcon>
          {headerIcon}
        </CardHeaderIcon>
      )}
    </CardHeader>
    <CardContent>
      {children}
    </CardContent>
  </Card>
);

export default DisplayCard;