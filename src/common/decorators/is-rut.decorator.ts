import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { RutValidator } from '../validators/rut-validator';

@ValidatorConstraint({ async: false })
export class IsRutConstraint implements ValidatorConstraintInterface {
  validate(rut: any, args: ValidationArguments) {
    return typeof rut === 'string' && RutValidator.validaRut(rut);
  }

  defaultMessage(args: ValidationArguments) {
    return 'El RUT ingresado no es válido, debe tener este formato 1000000-9';
  }
}

export function IsRut(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsRutConstraint,
    });
  };
}
