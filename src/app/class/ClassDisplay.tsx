import React, { FunctionComponent, useCallback, useState } from 'react';
import { Content } from 'bloomer';
import { $ClassName } from '../../domain/class/Classes';
import Character from '../../domain/character/Character';
import useCharacterRepository from '../../domain/character/CharacterRepository';
import ClassList from './list/ClassList';
import ClassAdd from './add/ClassAdd';

interface $Props {
  character: Character;
  onUpdate: (character: Character) => void;
}

const ClassDisplay: FunctionComponent<$Props> = ({ character, onUpdate }) => {
  const { update } = useCharacterRepository();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [className, setClassName] = useState<$ClassName>();

  const onDelete = useCallback(
    (klass: $ClassName) => {
      if (!character) return;
      character.removeClass(klass);
      update(character);
      onUpdate(character.clone());
    },
    [update, character, onUpdate]
  );

  const onEdit = useCallback(
    (className?: $ClassName) => {
      setClassName(className);
      setEditMode(true);
    },
    [setClassName, setEditMode]
  );

  const onClose = useCallback(() => {
    setClassName(undefined);
    setEditMode(false);
  }, [setClassName, setEditMode]);

  return (
    <Content>
      {!editMode && (
        <ClassList character={character} onDelete={onDelete} onEdit={onEdit} />
      )}
      {editMode && (
        <ClassAdd
          character={character}
          klassToEdit={className}
          onUpdate={onUpdate}
          onClose={onClose}
        />
      )}
    </Content>
  );
};

export default ClassDisplay;
