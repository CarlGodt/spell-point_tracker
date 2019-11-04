import React, { useMemo, ReactNodeArray } from 'react';
import SPELL_COST, { $SpellCost } from '../../domain/spell/SpellCost';
import { Content, Button } from 'bloomer';
import Character from '../../domain/character/Character';

const getLevels = (maxLevel: number): Array<number> =>
  Array.from(Array(maxLevel).keys());

const useSpellSlots = (
  character: Character,
  cast: (cost: $SpellCost) => void
): ReactNodeArray => {
  return useMemo<ReactNodeArray>(() => {
    const { classLevel, slotLevel } = character.getMaxSpellSlotClass();
    const slots: Array<number> = getLevels(slotLevel);
    return slots.map(i => {
      const lvl = i + 1;
      const maxCast = SPELL_COST[lvl].maxCast(classLevel);
      const canAffort =
        SPELL_COST[lvl].pointCost <= character.getCurrentSpellPoints();
      const hasCharges = character.getCastsForLevel(lvl) < maxCast;
      const canCast = canAffort && (maxCast === 0 || hasCharges);

      let level: string = `${lvl}th`;
      if (lvl === 1) {
        level = `${lvl}st`;
      } else if (lvl === 2) {
        level = `${lvl}nd`;
      } else if (lvl === 3) {
        level = `${lvl}rd`;
      }
      return (
        <tr key={lvl}>
          <td>{level} Slot</td>
          <td>{SPELL_COST[lvl].pointCost} Points</td>
          <td>
            {character.getCastsForLevel(lvl)}
            {maxCast !== 0 && `/${maxCast}`}
          </td>
          <td>
            <Content hasTextAlign="right">
              <Button
                isColor={`${canCast && 'primary'}`}
                isSize="small"
                disabled={!canCast}
                onClick={() => cast(SPELL_COST[lvl])}
              >
                Cast
              </Button>
            </Content>
          </td>
        </tr>
      );
    });
  }, [character, cast]);
};

export default useSpellSlots;
