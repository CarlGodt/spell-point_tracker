import React, { FunctionComponent, ReactNodeArray, ReactNode } from "react"
import { Modal, ModalBackground, ModalCard, ModalCardHeader, ModalCardTitle, Delete, ModalCardBody, ModalCardFooter, Button } from "bloomer"

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
  onDeleteText
}) => (
    <Modal isActive={isActive}>
      <ModalBackground />
      <ModalCard>
        <ModalCardHeader>
          <ModalCardTitle>{title}</ModalCardTitle>
          <Delete onClick={onClose} />
        </ModalCardHeader>
        <ModalCardBody>
          {children}
        </ModalCardBody>
        <ModalCardFooter>
          {onSave && (
            <Button isColor='success' onClick={onSave}>
              {onSaveText ? onSaveText : 'Save'}
            </Button>
          )}
          {onDelete && (
            <Button isColor='danger' onClick={onDelete}>
              {onDeleteText ? onDeleteText : 'Delete'}
            </Button>
          )}
          <Button onClick={onClose}>
            {onCloseText ? onCloseText : 'Cancel'}
          </Button>
        </ModalCardFooter>
      </ModalCard>
    </Modal>
  );

export default DisplayModal;