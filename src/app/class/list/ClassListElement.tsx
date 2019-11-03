import React, { FunctionComponent } from "react";
import CLASSES, { $ClassName } from "../../../domain/class/Classes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Level, LevelItem } from "bloomer";

interface $Props {
  level: number;
  className: $ClassName;
  onEdit: (className: $ClassName) => void;
  onDelete: (className: $ClassName) => void;
}

const ClassListElement: FunctionComponent<$Props> = ({level, className, onEdit, onDelete}) => (
  <tr>
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
);

export default ClassListElement;