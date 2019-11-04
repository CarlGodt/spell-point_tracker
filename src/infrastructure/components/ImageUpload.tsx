import { Field, Label } from 'bloomer';
import React, { FunctionComponent, useCallback, useState } from 'react';
import DisplayModal from './DisplayModal';

interface $Props {
  isActive: boolean;
  onClose: () => void;
  onSaveFile: (file: string) => void;
}

const ImageUpload: FunctionComponent<$Props> = ({
  isActive,
  onClose,
  onSaveFile,
}) => {
  const [file, setFile] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const onSave = useCallback(() => {
    if (!file) return;
    onSaveFile(file);
    onClose();
  }, [file, onSaveFile, onClose]);

  const onUpload = useCallback(
    (event: ProgressEvent<FileReader>) => {
      if (!event.target) return;
      setFile(event.target.result as string);
      setLoading(false);
    },
    [setFile, setLoading]
  );

  const onChange = useCallback(
    event => {
      setLoading(true);
      let temp = event.currentTarget.files[0];
      const reader = new FileReader();
      reader.onload = onUpload;
      reader.readAsBinaryString(temp);
    },
    [onUpload, setLoading]
  );

  return (
    <DisplayModal
      title="Upload Avatar"
      isActive={isActive}
      onClose={onClose}
      onSave={onSave}
      loading={loading}
    >
      <Field>
        <Label>Image:</Label>
        <input type="file" onChange={onChange} capture />
      </Field>
    </DisplayModal>
  );
};

export default ImageUpload;
