import React, { FunctionComponent, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faTrash } from '@fortawesome/free-solid-svg-icons'
import Character from '../../../domain/character/Character';
import DisplayModal from '../../../infrastructure/components/DisplayModal';
import { LevelLeft, LevelItem, LevelRight, Level } from 'bloomer';
import { useHistory } from 'react-router';

interface $Props {
  character: Character;
  onDelete: (character: Character) => void;
}

const CharacterListElement: FunctionComponent<$Props> = ({ character, onDelete }) => {
  const [isDeleteConfirmActive, setDeleteConfirmActive] = useState<boolean>(false);
  const history = useHistory();

  return (
    <>
      <DisplayModal isActive={isDeleteConfirmActive}
        title="Delete Character"
        onClose={() => setDeleteConfirmActive(false)}
        onDelete={() => onDelete(character)}>
        <span>Willst du {character.getName()} wirklich löschen?</span>
      </DisplayModal>
      <Level isMobile>
        <LevelLeft>
          <LevelItem>
            {character.getName()}
          </LevelItem>
        </LevelLeft>
        <LevelRight>
          <LevelItem>
            <FontAwesomeIcon icon={faAddressCard}
              onClick={() => history.push(`character/${character.id}/`)}
              title="Details" />
          </LevelItem>
          <LevelItem>
            <FontAwesomeIcon icon={faTrash}
              onClick={() => setDeleteConfirmActive(true)}
              title="Delete" />
          </LevelItem>
        </LevelRight>
      </Level>
    </>
  );
}

export default CharacterListElement;
