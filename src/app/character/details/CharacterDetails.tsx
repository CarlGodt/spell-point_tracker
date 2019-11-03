import React, { FunctionComponent, useState, useCallback, useMemo } from "react";
import Character from "../../../domain/character/Character";
import { Table, Content, Button, Image } from "bloomer";
import ImageUpload from "../../../infrastructure/components/ImageUpload";
import useCharacterRepository from "../../../domain/character/CharacterRepository";

interface $Props {
  character: Character;
  onUpdate: (character: Character) => void;
}

const CharacterDetails: FunctionComponent<$Props> = ({ character, onUpdate }) => {
  const { update } = useCharacterRepository();
  const hasImage = useMemo<boolean>(() => !!character.getImage(), [character]);

  const [showUpload, setShowUpload] = useState<boolean>(false);

  const onSaveFile = useCallback((file: string) => {
    if (!character) return;
    character.setImage(file);
    update(character);
    onUpdate(character.clone())
  }, [character, update, onUpdate]);

  return (
    <Content>
      <Content hasTextAlign="centered">
        {hasImage &&<Image src={`data:image/jpeg;base64,${btoa(character.getImage())}`}/>}
        {!hasImage && <Button onClick={() => setShowUpload(true)}>Upload Image</Button>}
      </Content>
      <ImageUpload isActive={showUpload}
        onSaveFile={onSaveFile}
        onClose={() => setShowUpload(false)} />
      <Table>
        <tbody>
          <tr><td><strong>Level:</strong></td><td>{character.getLevel()}</td></tr>
          <tr><td><strong>Max Spellpoints:</strong></td><td>{character.getMaxSpellPoints()}</td></tr>
          <tr><td><strong>Max Spellslot:</strong></td><td>{character.getMaxSpellSlotClass().slotLevel}</td></tr>
        </tbody>
      </Table>
    </Content>
  );
}

export default CharacterDetails;