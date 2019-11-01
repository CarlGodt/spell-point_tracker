import { Entity } from "../../infrastructure/persistence/repository";

class Character extends Entity {
  name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }
}

export default Character;