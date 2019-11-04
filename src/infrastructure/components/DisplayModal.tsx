import React, { FunctionComponent, ReactNodeArray, ReactNode } from 'react';
import {
  Modal,
  ModalBackground,
  ModalCard,
  ModalCardHeader,
  ModalCardTitle,
  Delete,
  ModalCardBody,
  ModalCardFooter,
  Button,
} from 'bloomer';

interface $Props {
  isActive: boolean;
  title: string;
  children: ReactNode | ReactNodeArray;
  onSave?: () => void;
  onSaveText?: string;
  onDelete?: () => void;
  onDeleteText?: string;
  onClose: () => void;
  onCloseText?: string;
  loading?: boolean;
}

const DisplayModal: FunctionComponent<$Props> = ({
  isActive,
  title,
  children,
  onClose,
  onCloseText,
  onSave,
  onSaveText,
  onDelete,
  onDeleteText,
  loading,
}) => (
  <Modal isActive={isActive}>
    <ModalBackground />
    <ModalCard>
      <ModalCardHeader>
        <ModalCardTitle>{title}</ModalCardTitle>
        <Delete onClick={onClose} disabled={loading} />
      </ModalCardHeader>
      <ModalCardBody>{children}</ModalCardBody>
      <ModalCardFooter>
        {onSave && (
          <Button
            isColor="success"
            onClick={onSave}
            isLoading={loading}
            disabled={loading}
          >
            {onSaveText ? onSaveText : 'Save'}
          </Button>
        )}
        {onDelete && (
          <Button isColor="danger" onClick={onDelete} disabled={loading}>
            {onDeleteText ? onDeleteText : 'Delete'}
          </Button>
        )}
        <Button onClick={onClose} disabled={loading}>
          {onCloseText ? onCloseText : 'Cancel'}
        </Button>
      </ModalCardFooter>
    </ModalCard>
  </Modal>
);

export default DisplayModal;
