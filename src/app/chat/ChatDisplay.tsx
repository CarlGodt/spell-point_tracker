import { Button, Content, Field, Input, Section } from 'bloomer';
import React, {
  FormEvent,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
  useRef,
} from 'react';
import $Message from '../../domain/chat/Message';
import { useChat } from './ChatContext';
import styles from './chatDisplay.module.scss';
import { useRxEffect } from '@reonomy/reactive-hooks';

interface $Props {
  author: string;
}

const ChatDisplay: FunctionComponent<$Props> = ({ author }) => {
  const chat = useChat();
  const [message, setMessage] = useState<string>();
  const [messages, setMessages] = useState<Array<$Message>>([]);
  const messageAnchor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageAnchor && messageAnchor.current) {
      messageAnchor.current.scrollIntoView({ behavior: 'smooth' });
    }
  });

  useEffect(() => {
    chat.init('localhost:8080');
    return () => {
      chat.disconnect();
    };
  }, [chat]);

  useRxEffect(chat.onMessage(), (m: $Message) => {
    setMessages([...messages, m]);
  });

  const onChangeMessage = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      setMessage(event.currentTarget.value);
    },
    [setMessage]
  );

  const sendMessage = useCallback(() => {
    if (!message || message === '') return;
    chat.send({
      author,
      message,
    });
  }, [message, chat, author]);

  return (
    <>
      <Content className={styles.chatHistory}>
        {messages.map((m, i) => {
          const msgClass = m.author !== author; // for demo purposes, format every other msg
          return (
            <p
              style={{
                padding: '.25em',
                textAlign: msgClass ? 'left' : 'right',
                overflowWrap: 'normal',
              }}
              className={styles.message}
            >
              <span
                key={i}
                className={`tag is-medium ${
                  msgClass ? 'is-success' : 'is-info'
                }`}
              >
                {m.message}
              </span>
            </p>
          );
        })}
        <div ref={messageAnchor}></div>
      </Content>
      <Section className={styles.chatInput}>
        <Field isGrouped>
          <Input onChange={onChangeMessage} />
          <Button onClick={sendMessage}>Send</Button>
        </Field>
      </Section>
    </>
  );
};

export default ChatDisplay;
