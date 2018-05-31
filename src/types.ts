/* tslint:disable:max-classes-per-file */
export class Workout {
  constructor(
    public id: string,
    public name: string,
    public type: string,
    public date: Date,
    public imageUri: string | null
  ) {}
}
