import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Content } from 'bloomer';
import React, { FunctionComponent } from 'react';
import CLASSES, { $ClassName } from '../../../domain/class/Classes';
import styles from './classList.module.scss';

interface $Props {
  level: number;
  className: $ClassName;
  onEdit: (className: $ClassName) => void;
  onDelete: (className: $ClassName) => void;
}

const ClassListElement: FunctionComponent<$Props> = ({
  level,
  className,
  onEdit,
  onDelete,
}) => (
  <tr>
    <td>{CLASSES[className].name}</td>
    <td>{level}</td>
    <td>
      <Content hasTextAlign="right">
        <FontAwesomeIcon
          icon={faEdit}
          className={styles.actionIcon}
          onClick={() => onEdit(className)}
          title="Edit"
        />
        <FontAwesomeIcon
          icon={faTrash}
          className={styles.actionIcon}
          onClick={() => onDelete(className)}
          title="Delete"
        />
      </Content>
    </td>
  </tr>
);

export default ClassListElement;
