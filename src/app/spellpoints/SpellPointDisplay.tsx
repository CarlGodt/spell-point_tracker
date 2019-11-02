import React, { FunctionComponent, useCallback, useMemo, ReactNodeArray, ReactNode } from "react"
import { Content, Button, Table, Progress } from "bloomer"
import Character from "../../domain/character/Character"
import useCharacterRepository from "../../domain/character/CharacterRepository"
import SPELL_COST, { $SpellCost } from "../../domain/spell/SpellCost"
import './spellPointDisplay.scss';

interface $Props {
  character: Character;
  onUpdate: (character: Character) => void;
}

const SpellPointDisplay: FunctionComponent<$Props> = ({ character, onUpdate }) => {
  const { update } = useCharacterRepository();

  const cast = useCallback((cost: $SpellCost) => {
    character.cast(cost);
    update(character);
    onUpdate(character.clone());
  }, [character, update, onUpdate])

  const spellSlots = useMemo<ReactNodeArray>(() => {
    const slots: Array<ReactNode> = [];
    for (let i = 1; i <= character.getMaxSpellSlot(); i++) {
      let level: string = `${i}th`;
      if (i === 1) {
        level = `${i}st`;
      } else if (i === 2) {
        level = `${i}nd`;
      } else if (i === 3) {
        level = `${i}rd`;
      }
      slots.push(
        <tr>
          <td>{level} Slot</td>
          <td>{SPELL_COST[i].pointCost} Points</td>
          <td>
            <Button isColor="primary" onClick={() => cast(SPELL_COST[i])}>Cast</Button>
          </td>
        </tr>
      );
    }
    return slots;
  }, [character, cast]);

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
    <Content>
      <Progress className="progressBar"
        isColor='primary'
        value={character.getCurrentSpellPoints()}
        max={character.getMaxSpellPoints()} />
      <div className="textLabel">
        Spellpoints: {character.getCurrentSpellPoints()} / {character.getMaxSpellPoints()}
      </div>
      <Content>
        <Table>
          <thead>
            <tr>
              <th>Level</th>
              <th>Cost</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {spellSlots}
          </tbody>
        </Table>
      </Content>
      <Content hasTextAlign="right">
        <Button onClick={onShortRest}>Short Rest</Button>
        <Button onClick={onLongRest}>Long Rest</Button>
      </Content>
    </Content>
  )
}

export default SpellPointDisplay;