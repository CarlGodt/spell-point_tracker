import React, { useState, useCallback, FunctionComponent, FormEvent } from "react";
import { Label, Field, Control, Input, Button } from "bloomer";
import useCharacterRepository from "../../domain/character/CharacterRepository";
import DisplayCard from "../../infrastructure/components/DisplayCard";
import { useHistory } from "react-router";

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
    <DisplayCard title="Create Character">
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
    </DisplayCard>
  );
}

export default CharacterCreator;