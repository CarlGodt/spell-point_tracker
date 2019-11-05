import SocketService from '../../infrastructure/client/SocketService';
import $Message from '../../domain/chat/Message';
import React, {
  useContext,
  createContext,
  FunctionComponent,
  useState,
  ReactNodeArray,
  ReactNode,
} from 'react';

const ChatContext: React.Context<SocketService<$Message>> = createContext(
  new SocketService<$Message>()
);

interface $Props {
  children: ReactNode | ReactNodeArray;
}

const ChatContextProvider: FunctionComponent<$Props> = ({ children }) => {
  const [chat] = useState(new SocketService<$Message>());
  return <ChatContext.Provider value={chat}>{children}</ChatContext.Provider>;
};

const useChat = () => useContext(ChatContext);

export { ChatContextProvider, useChat };
