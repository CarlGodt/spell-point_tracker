import { Progress, Content, Button, Title, Container } from "bloomer";
import { FunctionComponent, useCallback } from "react";
import Character from "../../../domain/character/Character";
import React from "react";
import styles from './characterHeader.module.scss';
import useCharacterRepository from "../../../domain/character/CharacterRepository";

interface $Props {
  character: Character;
  onUpdate: (character: Character) => void;
}

const CharacterHeader: FunctionComponent<$Props> = ({ character, onUpdate }) => {
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
          <Progress className={styles.progressBar}
            isColor='primary'
            value={character.getCurrentSpellPoints()}
            max={character.getMaxSpellPoints()} />
          <div className={styles.textLabel}>
            Spellpoints: {character.getCurrentSpellPoints()} / {character.getMaxSpellPoints()}
          </div>
        </div>
      </div>
      <Content hasTextAlign="right">
        <Button isSize="small" isFullWidth onClick={onShortRest}>Short Rest</Button>
        <Button isSize="small" isFullWidth onClick={onLongRest}>Long Rest</Button>
      </Content>
    </Container>
  );
}

export default CharacterHeader;