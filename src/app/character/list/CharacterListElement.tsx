import React, { FunctionComponent, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faTrash } from '@fortawesome/free-solid-svg-icons'
import Character from '../../../domain/character/Character';
import DisplayModal from '../../../infrastructure/components/DisplayModal';
import { Columns, Column } from 'bloomer';
import { useHistory } from 'react-router';
import './characterListElement.scss';

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
        <span>Willst du {character.name} wirklich löschen?</span>
      </DisplayModal>
      <Columns isGapless isMobile>
        <Column>
          {character.name}
        </Column>
        <Column isSize="narrow">
          <div className="icon">
            <FontAwesomeIcon icon={faAddressCard}
              onClick={() => history.push(`character/${character.id}`)}
              title="Details" />
          </div>
          <div className="icon">
            <FontAwesomeIcon icon={faTrash}
              onClick={() => setDeleteConfirmActive(true)}
              title="Delete" />
          </div>
        </Column>
      </Columns>
    </>
  );
}

export default CharacterListElement;
