import { ValidatorFn } from "@angular/forms";

export function matchPasswordsValidator(passwordControlName: string, rePasswordControlName: string): ValidatorFn{
    return (control) => {
        debugger
        const passwordFormControl = control.get(passwordControlName)
        const rePasswordFormControl = control.get(rePasswordControlName)
        debugger
        const passwordsAreMatching = 
            passwordFormControl?.value === rePasswordFormControl?.value;
        debugger
            return passwordsAreMatching ? null : { matchPasswordsValidator: true }
    }
}