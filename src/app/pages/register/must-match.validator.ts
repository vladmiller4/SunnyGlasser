import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string, controlName2: string, matchingControlName2: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        const control2 = formGroup.controls[controlName2];
        const matchingControl2 = formGroup.controls[matchingControlName2];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }
        if (matchingControl2.errors && !matchingControl2.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
        if (control2.value !== matchingControl2.value) {
            matchingControl2.setErrors({ mustMatch: true });
        } else {
            matchingControl2.setErrors(null);
        }
    }
}