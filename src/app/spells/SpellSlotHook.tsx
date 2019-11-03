import React, { useMemo, ReactNodeArray, ReactNode } from "react";
import SPELL_COST, { $SpellCost} from "../../domain/spell/SpellCost";
import { Content, Button } from "bloomer";
import Character from "../../domain/character/Character";

const useSpellSlots = (character: Character, cast: (cost: $SpellCost) => void): ReactNodeArray => {
  return useMemo<ReactNodeArray>(() => {
    const slots: Array<ReactNode> = [];
    for (let i = 1; i <= character.getMaxSpellSlot(); i++) {
      const canCast = SPELL_COST[i].pointCost <= character.getCurrentSpellPoints();

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
              <Button isColor={`${canCast && 'primary'}`}
                isSize="small"
                disabled={!canCast}
                onClick={() => cast(SPELL_COST[i])}>
                Cast
              </Button>
            </Content>
          </td>
        </tr>
      );
    }
    return slots;
  }, [character, cast]);
}

export default useSpellSlots;