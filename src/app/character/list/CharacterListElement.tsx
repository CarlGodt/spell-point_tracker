import { faAddressCard, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FunctionComponent, useState } from 'react';
import { useHistory } from 'react-router';
import Character from '../../../domain/character/Character';
import DisplayModal from '../../../infrastructure/components/DisplayModal';
import { Content } from 'bloomer';
import styles from './characterList.module.scss';

interface $Props {
  character: Character;
  onDelete: (character: Character) => void;
}

const CharacterListElement: FunctionComponent<$Props> = ({
  character,
  onDelete,
}) => {
  const [isDeleteConfirmActive, setDeleteConfirmActive] = useState<boolean>(
    false
  );
  const history = useHistory();

  return (
    <tr>
      <td>{character.getName()}</td>
      <td>{character.getLevel()}</td>
      <td>
        {character.getCurrentSpellPoints()} / {character.getMaxSpellPoints()}
      </td>
      <td>
        <DisplayModal
          isActive={isDeleteConfirmActive}
          title="Delete Character"
          onClose={() => setDeleteConfirmActive(false)}
          onDelete={() => onDelete(character)}
        >
          <span>Delete {character.getName()} permanently?</span>
        </DisplayModal>
        <Content hasTextAlign="right">
          <FontAwesomeIcon
            icon={faAddressCard}
            className={styles.actionIcon}
            onClick={() => history.push(`character/${character.id}/SPELL`)}
            title="Details"
          />
          <FontAwesomeIcon
            icon={faTrash}
            className={styles.actionIcon}
            onClick={() => setDeleteConfirmActive(true)}
            title="Delete"
          />
        </Content>
      </td>
    </tr>
  );
};

export default CharacterListElement;
