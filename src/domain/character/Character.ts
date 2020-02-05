import { $Entity } from '../../infrastructure/persistence/repository';
import CLASSES, { $ClassName } from '../class/Classes';
import { $SpellCost } from '../spell/SpellCost';
import SpellPoints, { $SpellPoints } from '../spell/SpellPoints';

export const MAX_CHARACTER_LEVEL = 20;

class Character implements $Entity {
  private classes: Map<$ClassName, number>;
  private casts: Array<number>;

  constructor(
    private name: string,
    private spellPoints: number,
    private image?: string,
    readonly id?: number
  ) {
    this.classes = new Map();
    this.casts = new Array(10);
    this.casts.fill(0);
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
    this.getClassesOrEmptyMap().set(className, level);
  }

  public getName(): string {
    return this.name;
  }

  public getLevel(): number {
    let level = 0;
    this.getClassesOrEmptyMap().forEach(value => (level += value));
    return level;
  }

  public getCasterLevel(): $SpellPoints {
    let casterLvl = 0;
    this.getClassesOrEmptyMap().forEach((value, key) => {
      if (key !== $ClassName.WARLOCK) {
        casterLvl += Math.floor(value / CLASSES[key].mc_divider);
      }
    });
    if (SpellPoints[casterLvl]) {
      return SpellPoints[casterLvl];
    }
    return {
      spellPoints: 0,
      level: 0,
      maxSpellLevel: 0,
    };
  }

  public getMaxSpellPoints(): number {
    let spellPoints = this.getCasterLevel().spellPoints;
    this.getClassesOrEmptyMap().forEach((value, key) => {
      if (key === $ClassName.WARLOCK) {
        spellPoints += CLASSES[key].spellPoints[value].spellPoints;
      }
    });
    return spellPoints;
  }

  public getCurrentSpellPoints(): number {
    return this.spellPoints | 0;
  }

  public getMaxSpellSlotClass(): { slotLevel: number; classLevel: number } {
    let maxSpellSlot = this.getCasterLevel().maxSpellLevel;
    let maxSpellSlotClass = {
      slotLevel: maxSpellSlot,
      classLevel: this.getLevel(),
    };
    this.getClassesOrEmptyMap().forEach((value, key) => {
      if (CLASSES[key].spellPoints[value].maxSpellLevel > maxSpellSlot) {
        maxSpellSlot = CLASSES[key].spellPoints[value].maxSpellLevel;
        maxSpellSlotClass = {
          slotLevel: CLASSES[key].spellPoints[value].maxSpellLevel,
          classLevel: this.getLevel(),
        };
      }
    });
    return maxSpellSlotClass;
  }

  public getCasts(): Array<number> {
    if (!this.casts) {
      this.casts = new Array(10);
      this.casts.fill(0);
    }
    return this.casts;
  }

  public cast(cost: $SpellCost): void {
    this.spellPoints = this.spellPoints - cost.pointCost;
    this.getCasts()[cost.spellLevel] = this.getCasts()[cost.spellLevel] + 1;
  }

  public getCastsForLevel(level: number): number {
    return this.getCasts()[level];
  }

  public longRest(): void {
    this.spellPoints = this.getMaxSpellPoints();
    this.getCasts().fill(0);
  }

  public shortRest(): void {
    let shortRestPoints = 0;
    this.classes.forEach((value, key) => {
      if (CLASSES[key].reset === 'SHORT_REST') {
        shortRestPoints += CLASSES[key].spellPoints[value].spellPoints;
      }
    });
    this.spellPoints += shortRestPoints;
    if (this.spellPoints > this.getMaxSpellPoints()) {
      this.spellPoints = this.getMaxSpellPoints();
    }
  }

  private getClassesOrEmptyMap(): Map<$ClassName, number> {
    if (!this.classes) this.classes = new Map();
    return this.classes;
  }

  public getClasses(): Array<[$ClassName, number]> {
    if (!this.classes) return [];
    const classes: Array<[$ClassName, number]> = [];
    this.classes.forEach((value, key) => classes.push([key, value]));
    return classes;
  }

  public getClassLevel(className: $ClassName): number {
    return this.getClassesOrEmptyMap().get(className) || 0;
  }

  public canLevel(): boolean {
    return MAX_CHARACTER_LEVEL - this.getLevel() > 0;
  }

  public clone(): Character {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }

  public setImage(image: string) {
    this.image = image;
  }

  public getImage() {
    return this.image || '';
  }
}

export default Character;
