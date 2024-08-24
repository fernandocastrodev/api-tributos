export const validationMessages = {
    isEmail: 'El correo electrónico no es válido.',
    isNotEmpty: 'Este campo no puede estar vacío.',
    isString: 'Este campo debe ser una cadena de texto.',
    isInt: 'Este campo debe ser un número entero.',
    isBoolean: 'Este campo debe ser un valor booleano (verdadero o falso).',
    isDate: 'Este campo debe ser una fecha válida.',
    minLength: (min: number) => `Este campo debe tener al menos ${min} caracteres.`,
    maxLength: (max: number) => `Este campo no puede tener más de ${max} caracteres.`,
    // Agrega más mensajes personalizados según sea necesario
  };