import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { LoginService } from '../services/loginService.service';
import { Router } from '@angular/router';

import { RegisterService } from '../services/registerService.service';
import Swal from 'sweetalert2';
import { EncryptionService } from '../services/encriptarService.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  theme: string = 'light';
  registerForm!: FormGroup;
  imagen: any = '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private registerService: RegisterService,
    private router: Router,
    private encryptionService: EncryptionService
  )
  {
    this.registerForm = this.fb.group({
      dni: ['', [Validators.required, this.dniValidator]],
      nombre: ['', [Validators.required, Validators.maxLength(20)]],
      apellido: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.maxLength(50), Validators.email]],
      contrasenia: ['', [Validators.required, this.contraseniaValidator]],
      contrasenia2: ['', Validators.required],
      foto: ['','']
    }, { validator: this.contraseniaIgual });
  }

  dniValidator(control: AbstractControl) {
    const dniRegex = /^[0-9]{8}[a-zA-Z]$/;
    if (control.value && !dniRegex.test(control.value)) {
      return { invalidDni: true };
    }
    return null;
  }

  contraseniaValidator(control: AbstractControl) {
    const contraseniaRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
    if (control.value && !contraseniaRegex.test(control.value)) {
      return { invalidContrasenia: true };
    }
    return null;
  }

  contraseniaIgual(group: FormGroup): any {
    const contrasenia = group.controls['contrasenia'].value;
    const contrasenia2 = group.controls['contrasenia2'].value;
    return contrasenia === contrasenia2 ? null : {notSame: true}
  }

  onFileChanged(event: any) {
    this.imagen = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      this.imagen = reader.result;
      console.log(this.imagen);
    };

    if(this.imagen ){
      reader.readAsDataURL(this.imagen );
    }
  }

  register() {
    if (this.registerForm.valid) {
      const dni = this.registerForm.get('dni')!.value;
      const nombre = this.registerForm.get('nombre')!.value;
      const apellido = this.registerForm.get('apellido')!.value;
      const email = this.registerForm.get('email')!.value;
      const contrasenia = this.registerForm.get('contrasenia')!.value;
      const encriptedPasswd = this.encryptionService.encryptPassword(contrasenia);
      console.log(this.imagen);

      this.registerService.register(dni, nombre, apellido, email, encriptedPasswd, this.imagen).subscribe(
        (response) => {
          const statusCode = +response;
          if (statusCode === 0) {
            // Registro exitoso
            Swal.fire({
              icon: 'success',
              title: 'Usuario creado',
              text: '¡Usuario creado con éxito!',
              confirmButtonText: 'Cerrar'
            });
            this.router.navigate(['/login']);
          } else {
            // Otro tipo de error no esperado
            Swal.fire({
              icon: 'error',
              title: 'Registro incorrecto',
              text: 'Ha ocurrido un error al crear el usuario',
              confirmButtonText: 'Cerrar'
            });
          }
        },
        (error) => {
          if (error.status === 400) {
            // Error de usuario existente
            Swal.fire({
              icon: 'error',
              title: 'Registro incorrecto',
              text: 'El usuario ya existe',
              confirmButtonText: 'Cerrar'
            });
          } else {
            // Otro tipo de error no esperado
            Swal.fire({
              icon: 'error',
              title: 'Registro incorrecto',
              text: 'Ha ocurrido un error al crear el usuario',
              confirmButtonText: 'Cerrar'
            });
          }
        }
      );
    }
  }
}
