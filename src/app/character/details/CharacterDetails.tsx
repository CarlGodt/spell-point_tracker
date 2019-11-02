import React, { FunctionComponent } from "react";
import { useHistory } from "react-router";
import Character from "../../../domain/character/Character";
import DisplayCard from "../../../infrastructure/components/DisplayCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Table } from "bloomer";

interface $Props {
  character: Character;
}

const CharacterDetails: FunctionComponent<$Props> = ({character}) => {
  const history = useHistory();

  return (
    <DisplayCard title={character.getName()} headerIcon={<FontAwesomeIcon icon={faTimes} onClick={() => history.push('/')} />}>
      <Table>
        <tbody>
          <tr><td><strong>Level:</strong></td><td>{character.getLevel()}</td></tr>
          <tr><td><strong>Max Spellpoints:</strong></td><td>{character.getMaxSpellPoints()}</td></tr>
          <tr><td><strong>Max Spellslot:</strong></td><td>{character.getMaxSpellSlot()}</td></tr>
        </tbody>
      </Table>
    </DisplayCard>
  );
}

export default CharacterDetails;