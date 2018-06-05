// tslint:disable:max-classes-per-file

// ============ Union types
type MyUnion = string | null;

const getUnion = (): MyUnion => {
  return 'BriCly';
};

const maybe = getUnion();

maybe && maybe.concat('eJon');
// ============

// ============ Intersection types
interface DefinitionA {
  propA: string;
}

interface DefinitionB {
  propB: string;
}

interface DefinitionC {
  propC: string;
}

type MyIntersection = DefinitionA & DefinitionB;

class IntersectionImpl implements MyIntersection {
  propA = 'BriCly';
  propB = 'eJon';
  propC = 'AndyP';
}

const getIntersection = (): MyIntersection => {
  return new IntersectionImpl();
};

const intersection = getIntersection();
// ============

// ============ Discriminated Union
enum CoolEnum {
  cold = 'Cold',
  cool = 'Cool',
  hot = 'Hot',
}

interface DiscriminatedUnion<T> {
  readonly temp: CoolEnum;
  otherThing: T;
}

interface Class1 extends DiscriminatedUnion<number> {
  temp: CoolEnum.cold;
  otherThing: 45;
  propA: {};
}

interface Class2 extends DiscriminatedUnion<string> {
  temp: CoolEnum.cool;
  otherThing: 'BriCly';
  propB: number;
}

interface Class3 extends DiscriminatedUnion<{}> {
  temp: CoolEnum.hot;
  otherThing: { food: 'pizza' };
  propC: string;
}

type DiscriminatedUnionOption = Class1 | Class2 | Class3;

// Just exists so I can actually create a new class.
class Class1Impl implements Class1 {
  temp!: CoolEnum.cold;
  otherThing!: 45;
  propA!: {};
}

const getDiscriminatedUnion = (): DiscriminatedUnionOption => {
  return new Class1Impl();
};

const myDiscriminatedUnion: DiscriminatedUnionOption = getDiscriminatedUnion();

switch (myDiscriminatedUnion.temp) {
  case CoolEnum.cold:
    
  case CoolEnum.cool:

  case CoolEnum.hot:

}
// ============