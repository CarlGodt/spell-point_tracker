import { $Entity } from "../../infrastructure/persistence/repository";
import CLASSES, { $ClassName } from "../class/Classes";

export const MAX_CHARACTER_LEVEL = 20;

class Character implements $Entity {
  private classes: Map<$ClassName, number>;

  constructor(
    private name: string,
    readonly id?: number
  ) {
    this.classes = new Map();
  }

  public addClass(className: $ClassName): void {
    if (!this.classes) this.classes = new Map();
    else if (this.classes.get(className)) return;
    this.classes.set(className, 1);
  }

  public removeClass(className: $ClassName): void {
    if (!this.classes || !this.classes.get(className)) return;
    this.classes.delete(className);
  }

  public setClassLevel(className: $ClassName, level: number): void {
    if (!this.classes) this.classes = new Map();
    this.classes.set(className, level);
  }

  public getName(): string {
    return this.name;
  }

  public getLevel(): number {
    let level = 0;
    this.classes.forEach((value) => level += value)
    return level;
  }

  public getMaxSpellPoints(): number {
    let maxSpellPoints = 0;
    this.classes.forEach((value, key) => {
      maxSpellPoints += CLASSES[key].spellPoints[value].spellPoints;
    });
    return maxSpellPoints;
  }

  public getMaxSpellSlot(): number {
    let maxSpellSlot = 0;
    this.classes.forEach((value, key) => {
      if (CLASSES[key].spellPoints[value].maxSpellLevel > maxSpellSlot) {
        maxSpellSlot = CLASSES[key].spellPoints[value].maxSpellLevel;
      }
    });
    return maxSpellSlot;
  }

  public getClasses(): Array<[$ClassName, number]> {
    if (!this.classes) return [];
    const classes: Array<[$ClassName, number]> = [];
    this.classes.forEach((value, key) => classes.push([key, value]));
    return classes;
  }

  public getClassLevel(className: $ClassName): number {
    return this.classes.get(className) || 0;
  }

  public canLevel(): boolean {
    return MAX_CHARACTER_LEVEL - this.getLevel() > 0;
  }

  public clone(): Character {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }
}

export default Character;