import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { LoginService } from '../services/loginService.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from '../services/registerService.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  theme: string = 'light';
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private registerService: RegisterService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      dni: new FormControl('', Validators.required),
      nombre: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      apellido: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.email]),
      contrasenia: new FormControl('', [Validators.required]),
      contrasenia2: new FormControl('', Validators.required)
    }, { validators: this.contraseniaIgual });
  }

  dniValidator(control: FormControl) {
    const dniRegex = /^[0-9]{8}[a-zA-Z]$/;
    if (control.value && !dniRegex.test(control.value)) {
      return { invalidDni: true };
    }
    return null;
  }

  contraseniaValidator(control: FormControl) {
    const contraseniaRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
    if (control.value && !contraseniaRegex.test(control.value)) {
      return { invalidContrasenia: true };
    }
    return null;
  }

  contraseniaIgual() {
    return (control: FormControl) => {
      if (control.value !== this.registerForm.get('contrasenia')!.value) {
        return { invalidContrasenia: true };
      }
      return null;
    }
  }

  combinedValidators(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const errors: ValidationErrors = {};

      const dniControl = control.get('dni');
      if (dniControl instanceof FormControl) {
        const dniError = this.dniValidator(dniControl);
        if (dniError) {
          Object.assign(errors, dniError);
        }
      }

      const contraseniaControl = control.get('contrasenia');
      if (contraseniaControl instanceof FormControl) {
        const contraseniaError = this.contraseniaValidator(contraseniaControl);
        if (contraseniaError) {
          Object.assign(errors, contraseniaError);
        }
      }

      const contrasenia2Control = control.get('contrasenia2');
      if (contrasenia2Control instanceof FormControl) {
        const contraseniaIgualError = this.contraseniaIgual()(contrasenia2Control);
        if (contraseniaIgualError) {
          Object.assign(errors, contraseniaIgualError);
        }
      }

      return Object.keys(errors).length ? errors : null;
    };
  }


  register() {
    if (this.registerForm.valid) {
      const dni = this.registerForm.get('dni')!.value;
      const nombre = this.registerForm.get('nombre')!.value;
      const apellido = this.registerForm.get('apellido')!.value;
      const email = this.registerForm.get('email')!.value;
      const contrasenia = this.registerForm.get('contrasenia')!.value;

      this.registerService.register(dni, nombre, apellido, email, contrasenia).subscribe(
        () => {
          this.toastr.success('Usuario creado con éxito', 'Éxito');
          this.router.navigate(['/login']);
        },
        error => {
          this.toastr.error('Error al registrar usuario: ' + error.message, 'Error');
        }
      );
    } else {
      console.log("ERROR")
      this.toastr.error('Por favor, complete todos los campos correctamente', 'Error');
    }
  }
}
