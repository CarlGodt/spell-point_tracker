import React, { FunctionComponent, useCallback } from "react";
import DisplayCard from "../../infrastructure/components/DisplayCard";
import { Table, Level, LevelItem } from "bloomer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import CLASSES, { $ClassName } from "../../domain/class/Classes";
import Character from "../../domain/character/Character";
import { useHistory } from "react-router";
import useCharacterRepository from "../../domain/character/CharacterRepository";

interface $Props {
  character: Character;
  onUpdateCharacter: (character: Character) => void;
}

const ClassDisplay: FunctionComponent<$Props> = ({character, onUpdateCharacter}) => {
  const history = useHistory();
  const { update } = useCharacterRepository();

  const onDelete = useCallback((klass: $ClassName) => {
    if (!character) return;
    character.removeClass(klass);
    update(character);
    onUpdateCharacter(character.clone())
  }, [update, character, onUpdateCharacter]);
  
  return (
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
  );
}

export default ClassDisplay;