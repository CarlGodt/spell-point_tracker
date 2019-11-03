import { Button as Btn } from "bloomer";
import { Bulma } from "bloomer/lib/bulma";
import { Button } from "bloomer/lib/elements/Button";
import React, { FunctionComponent, ReactNode, ReactNodeArray, useCallback, useState, useRef } from "react";
import useInterval from "../hooks/IntervalHook";

interface $Props extends Button<HTMLButtonElement | HTMLAnchorElement>, Bulma.Helpers {
  children: string | ReactNode | ReactNodeArray;
}

const ConfirmButton: FunctionComponent<$Props> = ({ children, onClick, ...props }) => {
  const [awaitConfirm, setAwaitConfirm] = useState<boolean>(false);
  const [count, setCount] = useState<number>(3);
  const [active, setActive] = useState<boolean>(false);
  const timeoutId = useRef<NodeJS.Timeout | null>();

  useInterval(() => {
    if (count > 0) {
      setCount(count - 1);
      return;
    }
    setActive(false);
  }, active ? 1000 : null);

  const clickHandler = useCallback((event) => {
    if (awaitConfirm) {
      onClick && onClick(event);
      setAwaitConfirm(false);
      timeoutId.current && clearTimeout(timeoutId.current);
      return;
    }
    setAwaitConfirm(true);
    setCount(3);
    setActive(true);
    timeoutId.current = setTimeout(() => {
      setAwaitConfirm(false);
    }, 3500);
  }, [awaitConfirm, onClick, setAwaitConfirm, setCount, setActive, timeoutId]);

  return (
    <Btn {...props} isColor={awaitConfirm ? 'success' : ''} onClick={clickHandler}>
      {!awaitConfirm && children}
      {awaitConfirm && <span>({count})</span>}
    </Btn>
  );
}

export default ConfirmButton;