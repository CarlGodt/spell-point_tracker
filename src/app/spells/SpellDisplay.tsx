import React, { FunctionComponent, useCallback, useMemo, ReactNodeArray, ReactNode } from "react"
import { Content, Button, Table } from "bloomer"
import Character from "../../domain/character/Character"
import useCharacterRepository from "../../domain/character/CharacterRepository"
import SPELL_COST, { $SpellCost } from "../../domain/spell/SpellCost"

interface $Props {
  character: Character;
  onUpdate: (character: Character) => void;
}

const SpellDisplay: FunctionComponent<$Props> = ({ character, onUpdate }) => {
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
        <tr key={i}>
          <td>{level} Slot</td>
          <td>{SPELL_COST[i].pointCost} Points</td>
          <td>
            <Content hasTextAlign="right">
              <Button isColor="primary" isSize="small" onClick={() => cast(SPELL_COST[i])}>Cast</Button>
            </Content>
          </td>
        </tr>
      );
    }
    return slots;
  }, [character, cast]);

  return (
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
  )
}

export default SpellDisplay;