import { $Entity } from "../../infrastructure/persistence/repository";

interface $Character extends $Entity {
  name: string;
}

export default $Character;