import React, { useCallback, FunctionComponent, useEffect, useState, FormEvent, useMemo } from "react";
import { Label, Field, Control, Button, Select } from "bloomer";
import { useHistory, useParams, useLocation } from "react-router";
import Character, { MAX_CHARACTER_LEVEL } from "../../domain/character/Character";
import CLASSES, { $ClassName, CLASS_NAMES } from "../../domain/class/Classes";
import useCharacterRepository from "../../domain/character/CharacterRepository";
import DisplayCard from "../../infrastructure/components/DisplayCard";

interface $Params {
  id: string;
}

const getLevels = (maxLevel: number): Array<number> => Array.from(Array(maxLevel).keys());

const ClassAdd: FunctionComponent = () => {
  const { update, get } = useCharacterRepository();
  const { id } = useParams<$Params>();
  const history = useHistory();
  const { search } = useLocation();

  const [character, setCharacter] = useState<Character>();
  const [klass, setKlass] = useState<$ClassName>(CLASS_NAMES[0]);
  const [level, setLevel] = useState<number>(1);
  const levels = useMemo<Array<number>>(() => {
    if (!character) return getLevels(20);
    return getLevels(MAX_CHARACTER_LEVEL - character.getLevel());
  }, [character]);
  const isEdit = useMemo<boolean>(() => {
    return !!search;
  }, [search]);

  useEffect(() => {
    const urlParams = new URLSearchParams(search);
    if (urlParams) {
      const urlKlass = urlParams.get('klass');
      if (urlKlass) {
        setKlass(urlKlass as $ClassName);
      }
      const urlLevel = urlParams.get('level');
      if (urlLevel) {
        setLevel(parseInt(urlLevel, 10));
      }
    }
  }, [search, setKlass, setLevel])

  useEffect(() => {
    (async () => setCharacter(await get(parseInt(id, 10))))();
  }, [id, get, setCharacter]);

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
    history.push(`/character/${character.id}/`);
  }, [update, character, history, klass, level]);

  const onCancel = useCallback(() => {
    history.push(`/character/${id}/`);
  }, [history, id]);

  return (
    <DisplayCard title={`${isEdit ? 'Edit' : 'Add'} Class`}>
      <Field>
        <Label>Class</Label>
        <Control>
          <Select onChange={onChangeClass} value={klass}>
            {CLASS_NAMES.map((className, key) => (
              <option key={key} value={className}>{CLASSES[className].name}</option>
            ))}
          </Select>
        </Control>
      </Field>
      <Field>
        <Label>Level</Label>
        <Control>
          <Select onChange={onChangeLevel} value={level}>
            {levels.map(level => (
              <option key={level}>{level + 1}</option>
            ))}
          </Select>
        </Control>
      </Field>
      <Field isGrouped>
        <Control>
          <Button isColor="primary" onClick={onSubmit}>{`${isEdit ? 'Save' : 'Add'}`}</Button>
        </Control>
        <Control>
          <Button isLink onClick={onCancel}>Cancel</Button>
        </Control>
      </Field>
    </DisplayCard>
  );
}

export default ClassAdd;