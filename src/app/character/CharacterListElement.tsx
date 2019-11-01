import React, { FunctionComponent, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import $Character from '../../domain/character/Character';
import DisplayModal from '../../infrastructure/components/DisplayModal';
import { Columns, Column } from 'bloomer';

interface $Props {
  character: $Character;
  onDelete: (character: $Character) => void;
}

const CharacterListElement: FunctionComponent<$Props> = ({ character, onDelete }) => {
  const [isDeleteConfirmActive, setDeleteConfirmActive] = useState<boolean>(false);

  return (
    <>
      <DisplayModal isActive={isDeleteConfirmActive}
        title="Delete Character"
        onClose={() => setDeleteConfirmActive(false)}
        onDelete={() => onDelete(character)}>
        <span>Willst du {character.name} wirklich löschen?</span>
      </DisplayModal>
      <Columns isGapless isMobile>
        <Column>
          {character.name}
        </Column>
        <Column isSize="narrow">
          <FontAwesomeIcon icon={faTrash}
            onClick={() => setDeleteConfirmActive(true)} title="Delete" />
        </Column>
      </Columns>
    </>
  );
}

export default CharacterListElement;
