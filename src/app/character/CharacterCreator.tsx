import React, { useState, useCallback, FunctionComponent, FormEvent } from "react";
import { Box, Title, Label, Field, Control, Input, Button } from "bloomer";
import useCharacterRepository from "../../domain/character/CharacterRepository";

interface $Props {
  onSave?: () => void;
  onClose?: () => void;
}

const CharacterCreator: FunctionComponent<$Props> = ({onClose, onSave}) => {
  const [name, setName] = useState<string>('');
  const { add } = useCharacterRepository();

  const onNameChange = useCallback((event: FormEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value)
  }, []);

  const onSubmit = useCallback(() => {
    add({name});
    onSave && onSave();
  }, [add, onSave, name]);

  const onCancel = useCallback(() => {
    setName('');
    onClose && onClose();
  }, [setName, onClose]);

  return (
    <Box>
      <Title>Create Character</Title>
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
    </Box>
  );
}

export default CharacterCreator;