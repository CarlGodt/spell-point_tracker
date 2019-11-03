import { Button, Control, Field, Input, Label, Level, Section, Title } from "bloomer";
import React, { FormEvent, FunctionComponent, useCallback, useState } from "react";
import { useHistory } from "react-router";
import useCharacterRepository from "../../domain/character/CharacterRepository";

const CharacterCreator: FunctionComponent = () => {
  const [name, setName] = useState<string>('');
  const { add } = useCharacterRepository();
  const history = useHistory();

  const onNameChange = useCallback((event: FormEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value)
  }, []);

  const onSubmit = useCallback(() => {
    add({name});
    history.push("/");
  }, [add, name, history]);

  const onCancel = useCallback(() => {
    history.push("/");
  }, [history]);

  return (
    <Section>
      <Level isMobile>
          <Title>Create Character</Title>
      </Level>
      <Field>
        <Label>Name</Label>
        <Control>
          <Input type="text"
            placeholder="Name"
            value={name}
            onChange={onNameChange} />
        </Control>
      </Field>
      <Field isGrouped>
        <Control>
          <Button isColor="primary" onClick={onSubmit}>Create</Button>
        </Control>
        <Control>
          <Button isLink onClick={onCancel}>Cancel</Button>
        </Control>
      </Field>
    </Section>
  );
}

export default CharacterCreator;