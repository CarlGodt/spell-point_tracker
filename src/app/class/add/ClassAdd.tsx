import {
  Button,
  Content,
  Control,
  Field,
  Label,
  Level,
  LevelLeft,
  LevelRight,
  Select,
} from 'bloomer';
import React, {
  FormEvent,
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Character, {
  MAX_CHARACTER_LEVEL,
} from '../../../domain/character/Character';
import useCharacterRepository from '../../../domain/character/CharacterRepository';
import CLASSES, { $ClassName } from '../../../domain/class/Classes';
import styles from './classAdd.module.scss';

interface $Props {
  character: Character;
  klassToEdit?: $ClassName;
  onUpdate: (character: Character) => void;
  onClose: () => void;
}

const getLevels = (maxLevel: number): Array<number> =>
  Array.from(Array(maxLevel).keys());

const ClassAdd: FunctionComponent<$Props> = ({
  character,
  klassToEdit,
  onUpdate,
  onClose,
}) => {
  const { update } = useCharacterRepository();

  const [klass, setKlass] = useState<$ClassName>($ClassName.BARD);
  const [level, setLevel] = useState<number>(1);

  const levels = useMemo<Array<number>>(() => {
    if (!character) return getLevels(20);
    if (klassToEdit) {
      const currentClassLevel = character.getClassLevel(klassToEdit);
      return getLevels(
        MAX_CHARACTER_LEVEL - (character.getLevel() - currentClassLevel)
      );
    }
    return getLevels(MAX_CHARACTER_LEVEL - character.getLevel());
  }, [character, klassToEdit]);

  useEffect(() => {
    if (klassToEdit) {
      setKlass(klassToEdit);
      setLevel(character.getClassLevel(klassToEdit));
    }
  }, [character, klassToEdit, setKlass, setLevel]);

  const onChangeClass = useCallback(
    (event: FormEvent<HTMLSelectElement>) => {
      setKlass(event.currentTarget.value as $ClassName);
    },
    [setKlass]
  );

  const onChangeLevel = useCallback(
    (event: FormEvent<HTMLSelectElement>) => {
      setLevel(parseInt(event.currentTarget.value, 10));
    },
    [setLevel]
  );

  const onSubmit = useCallback(() => {
    if (!character || !klass || !level) return;
    character.setClassLevel(klass, level);
    update(character);
    onUpdate(character.clone());
    onClose();
  }, [update, onUpdate, onClose, character, klass, level]);

  return (
    <Content>
      <Level isMobile>
        <LevelLeft>
          <Label>Class</Label>
        </LevelLeft>
        <LevelRight>
          <Control isExpanded>
            <Select
              onChange={onChangeClass}
              value={klass}
              className={styles.classSelect}
            >
              {Object.keys($ClassName).map((key, i) => (
                <option key={i} value={key}>
                  {CLASSES[key].name}
                </option>
              ))}
            </Select>
            <Select
              onChange={onChangeLevel}
              value={level}
              className={styles.levelSelect}
            >
              {levels.map(level => (
                <option key={level}>{level + 1}</option>
              ))}
            </Select>
          </Control>
        </LevelRight>
      </Level>
      <Field isGrouped className="is-grouped-right">
        <Control>
          <Button isColor="primary" onClick={onSubmit}>
            Save
          </Button>
        </Control>
        <Control>
          <Button isLink onClick={onClose}>
            Cancel
          </Button>
        </Control>
      </Field>
    </Content>
  );
};

export default ClassAdd;
