import React, { useCallback, FunctionComponent, useState, FormEvent, useMemo, useEffect } from "react";
import { Label, Field, Control, Button, Select, Content, FieldLabel, FieldBody } from "bloomer";
import Character, { MAX_CHARACTER_LEVEL } from "../../domain/character/Character";
import CLASSES, { $ClassName, CLASS_NAMES } from "../../domain/class/Classes";
import useCharacterRepository from "../../domain/character/CharacterRepository";

interface $Props {
  character: Character;
  klassToEdit?: $ClassName;
  onUpdate: (character: Character) => void;
  onClose: () => void;
}

const getLevels = (maxLevel: number): Array<number> => Array.from(Array(maxLevel).keys());

const ClassAdd: FunctionComponent<$Props> = ({ character, klassToEdit, onUpdate, onClose }) => {
  const { update } = useCharacterRepository();

  const [klass, setKlass] = useState<$ClassName>(CLASS_NAMES[0]);
  const [level, setLevel] = useState<number>(1);

  const levels = useMemo<Array<number>>(() => {
    if (!character) return getLevels(20);
    if (klassToEdit) {
      const currentClassLevel = character.getClassLevel(klassToEdit);
      return getLevels(MAX_CHARACTER_LEVEL - (character.getLevel() - currentClassLevel));
    }
    return getLevels(MAX_CHARACTER_LEVEL - character.getLevel());
  }, [character, klassToEdit]);

  useEffect(() => {
    if (klassToEdit) {
      setKlass(klassToEdit);
      setLevel(character.getClassLevel(klassToEdit));
    }
  }, [character, klassToEdit, setKlass, setLevel]);

  const onChangeClass = useCallback((event: FormEvent<HTMLSelectElement>) => {
    setKlass(event.currentTarget.value as $ClassName);
  }, [setKlass]);

  const onChangeLevel = useCallback((event: FormEvent<HTMLSelectElement>) => {
    setLevel(parseInt(event.currentTarget.value, 10));
  }, [setLevel]);

  const onSubmit = useCallback(() => {
    if (!character || !klass || !level) return;
    character.setClassLevel(klass, level);
    update(character);
    onUpdate(character.clone())
    onClose();
  }, [update, onUpdate, onClose, character, klass, level]);

  return (
    <Content>
      <Field isHorizontal>
        <FieldLabel isNormal>
          <Label>Class</Label>
        </FieldLabel>
        <FieldBody>
          <Field>
            <Control isExpanded>
              <Select onChange={onChangeClass} value={klass}>
                {CLASS_NAMES.map((className, key) => (
                  <option key={key} value={className}>{CLASSES[className].name}</option>
                ))}
              </Select>
              <Select onChange={onChangeLevel} value={level}>
                {levels.map(level => (
                  <option key={level}>{level + 1}</option>
                ))}
              </Select>
            </Control>
          </Field>
        </FieldBody>
      </Field>
      <Field isHorizontal>
        <FieldLabel />
        <FieldBody>
          <Field isGrouped>
            <Control>
              <Button isColor="primary" onClick={onSubmit}>Save</Button>
            </Control>
            <Control>
              <Button isLink onClick={onClose}>Cancel</Button>
            </Control>
          </Field>
        </FieldBody>
      </Field>
    </Content>
  );
}

export default ClassAdd;