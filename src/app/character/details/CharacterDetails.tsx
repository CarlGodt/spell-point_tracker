import React, { FunctionComponent } from "react";
import Character from "../../../domain/character/Character";
import { Table, Content } from "bloomer";

interface $Props {
  character: Character;
}

const CharacterDetails: FunctionComponent<$Props> = ({ character }) => (
  <Content>
    <Table>
      <tbody>
        <tr><td><strong>Level:</strong></td><td>{character.getLevel()}</td></tr>
        <tr><td><strong>Max Spellpoints:</strong></td><td>{character.getMaxSpellPoints()}</td></tr>
        <tr><td><strong>Max Spellslot:</strong></td><td>{character.getMaxSpellSlot()}</td></tr>
      </tbody>
    </Table>
  </Content>
);

export default CharacterDetails;