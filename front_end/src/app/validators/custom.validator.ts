import { AbstractControl } from "@angular/forms";

export class CustomValidators {

  static arrayMinLength(minLength: number) {
    return (control: AbstractControl) => {
      const array = control.value as string[];
      return array.length >= minLength ? null : { minLengthViolation: true };
    };
  }
}
