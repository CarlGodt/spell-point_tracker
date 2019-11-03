import React, { FunctionComponent } from "react";
import { Table, Level, LevelItem, Button, Content } from "bloomer";
import Character from "../../domain/character/Character";
import CLASSES, { $ClassName } from "../../domain/class/Classes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

interface $Props {
  character: Character;
  onDelete: (className: $ClassName) => void;
  onEdit: (className?: $ClassName) => void;
}

const ClassList: FunctionComponent<$Props> = ({ character, onDelete, onEdit }) => (
  <Table isStriped isFullWidth>
    <thead>
      <tr>
        <th>Class</th>
        <th>Level</th>
        <th>
          <Content hasTextAlign="right">
            <Button title="Add class" isSize="small" onClick={() => onEdit()}>
              <span><FontAwesomeIcon icon={faPlus} /> Add</span>
            </Button>
          </Content>
        </th>
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
                  onClick={() => onEdit(className)}
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
);

export default ClassList;