import React, { FunctionComponent, useEffect, useState, useCallback } from "react";
import { useParams, useHistory } from "react-router";
import useCharacterRepository from "../../../domain/character/CharacterRepository";
import Character from "../../../domain/character/Character";
import DisplayCard from "../../../infrastructure/components/DisplayCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import CLASSES, { $ClassName } from "../../../domain/class/Classes";
import { Table, LevelItem, Level } from "bloomer";

interface $Params {
  id: string;
}

const CharacterDetails: FunctionComponent = () => {
  const { id } = useParams<$Params>();
  const history = useHistory();

  const { get, update } = useCharacterRepository();
  const [character, setCharacter] = useState<Character>();

  useEffect(() => {
    (async () => {
      const data = await get(parseInt(id, 10));
      if (data) {
        setCharacter(data);
      }
    })();
  }, [get, id, setCharacter]);

  const onDelete = useCallback((klass: $ClassName) => {
    if (!character) return;
    character.removeClass(klass);
    update(character);
    setCharacter(character.clone())
  }, [update, character, setCharacter]);

  if (!character) return null

  return (
    <>
      <DisplayCard title={character.getName()} headerIcon={<FontAwesomeIcon icon={faTimes} onClick={() => history.push('/')} />}>
        <Table>
          <tbody>
            <tr><td><strong>Level:</strong></td><td>{character.getLevel()}</td></tr>
            <tr><td><strong>Max Spellpoints:</strong></td><td>{character.getMaxSpellPoints()}</td></tr>
            <tr><td><strong>Max Spellslot:</strong></td><td>{character.getMaxSpellSlot()}</td></tr>
          </tbody>
        </Table>
      </DisplayCard>
      <DisplayCard title="Classes" headerIcon={character.canLevel() && <FontAwesomeIcon icon={faPlus} onClick={() => history.push(`addClass`)} />}>
        <Table isStriped isFullWidth>
          <thead>
            <tr>
              <th>Class</th>
              <th>Level</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {character.getClasses().map(([className, level], key) => (
              <tr key={key}>
                <td>{CLASSES[className].name}</td>
                <td>{level}</td>
                <td>
                  <Level isMobile>
                    <LevelItem>
                      <FontAwesomeIcon icon={faEdit}
                        onClick={() => history.push(`addClass?klass=${className}&level=${level}`)}
                        title="Edit" />
                    </LevelItem>
                    <LevelItem>
                      <FontAwesomeIcon icon={faTrash}
                        onClick={() => onDelete(className)}
                        title="Delete" />
                    </LevelItem>
                  </Level>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </DisplayCard>
    </>
  );
}

export default CharacterDetails;