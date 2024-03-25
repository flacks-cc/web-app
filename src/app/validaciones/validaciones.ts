import { AbstractControl, ValidationErrors } from '@angular/forms';
import * as moment from 'moment';

function noNegativos(control: AbstractControl): ValidationErrors | null {
    const campo = control.value;

    if (campo < 0) {
        return { noNegativos: true };
    }

    return null;
}

function noCero(control: AbstractControl): ValidationErrors | null {
    const campo = control.value;

    if (campo === 0) {
        return { noCero: true };
    }

    return null;
}

function noDecimales(control: AbstractControl): ValidationErrors | null {
    const campo = control.value;

    if (campo % 1 !== 0) {
        return { noDecimales: true };
    }

    return null;
}

function trimValue(control: AbstractControl): void {
    const value = control.value;

    if (value && typeof value === 'string') {
        control.setValue(value.trim());
    }
}

function fechaActualValidator(control: AbstractControl): ValidationErrors | null {
    const fechaIngresada = moment(control.value, 'YYYY-MM-DD', true);
    const fechaActual = moment().startOf('day'); // Solo la fecha, sin la hora
  
    if (fechaIngresada.isValid() && fechaIngresada.isBefore(fechaActual)) {
      return { fechaPasada: true };
    }
  
    return null;
  }

export { noNegativos, noCero, noDecimales, trimValue, fechaActualValidator };
