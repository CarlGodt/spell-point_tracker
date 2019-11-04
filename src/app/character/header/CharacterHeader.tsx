import { Progress, Content, Title, Container } from 'bloomer';
import { FunctionComponent, useCallback } from 'react';
import Character from '../../../domain/character/Character';
import React from 'react';
import styles from './characterHeader.module.scss';
import useCharacterRepository from '../../../domain/character/CharacterRepository';
import ConfirmButton from '../../../infrastructure/components/ConfirmButton';

interface $Props {
  character: Character;
  onUpdate: (character: Character) => void;
}

const CharacterHeader: FunctionComponent<$Props> = ({
  character,
  onUpdate,
}) => {
  const { update } = useCharacterRepository();

  const onLongRest = useCallback(() => {
    character.longRest();
    update(character);
    onUpdate(character.clone());
  }, [character, update, onUpdate]);

  const onShortRest = useCallback(() => {
    character.shortRest();
    update(character);
    onUpdate(character.clone());
  }, [character, update, onUpdate]);

  return (
    <Container className={styles.container}>
      <div>
        <div>
          <Title isSize={4}>{character.getName()}</Title>
        </div>
        <div>
          <Progress
            className={styles.progressBar}
            isColor="primary"
            value={character.getCurrentSpellPoints()}
            max={character.getMaxSpellPoints()}
          />
          <div className={styles.textLabel}>
            Spellpoints: {character.getCurrentSpellPoints()} /{' '}
            {character.getMaxSpellPoints()}
          </div>
        </div>
      </div>
      <Content hasTextAlign="right">
        <ConfirmButton isSize="small" isFullWidth onClick={onShortRest}>
          Short Rest
        </ConfirmButton>
        <ConfirmButton isSize="small" isFullWidth onClick={onLongRest}>
          Long Rest
        </ConfirmButton>
      </Content>
    </Container>
  );
};

export default CharacterHeader;
