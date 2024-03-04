import { AbstractControl } from '@angular/forms';

export class CustomValidators {
  static arrayMinLength(minLength: number) {
    return (control: AbstractControl) => {
      const array = control.value as string[];
      return array.length >= minLength ? null : { minLengthViolation: true };
    };
  }

  static numberMinLength(minLength: number) {
    return (control: AbstractControl) => {
      const value = control.value as number;
      return value && value.toString().length >= minLength
        ? null
        : { minLengthViolation: true };
    };
  }

  static numberMaxLength(maxLength: number) {
    return (control: AbstractControl) => {
      const value = control.value as number;
      return value && value.toString().length <= maxLength
        ? null
        : { maxLengthViolation: true };
    };
  }

  static numberLength(length: number) {
    return (control: AbstractControl) => {
      const value = control.value as number;
      return value && value.toString().length === length
        ? null
        : { lengthViolation: true };
    };
  }
}
