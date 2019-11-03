import React, { FunctionComponent, useCallback } from "react"
import { Content, Table } from "bloomer"
import Character from "../../domain/character/Character"
import useCharacterRepository from "../../domain/character/CharacterRepository"
import { $SpellCost } from "../../domain/spell/SpellCost"
import useSpellSlots from "./SpellSlotHook"

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

  const spellSlots = useSpellSlots(character, cast);

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