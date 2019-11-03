import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Content, Table } from "bloomer";
import React, { FunctionComponent } from "react";
import Character from "../../../domain/character/Character";
import { $ClassName } from "../../../domain/class/Classes";
import ClassListElement from "./ClassListElement";

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
        <ClassListElement className={className}
          onEdit={onEdit}
          onDelete={onDelete}
          level={level}
          key={key} />
      ))}
    </tbody>
  </Table>
);

export default ClassList;