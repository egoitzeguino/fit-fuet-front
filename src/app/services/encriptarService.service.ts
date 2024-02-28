import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  constructor() { }

  encryptPassword(input: string): string {
    return CryptoJS.MD5(input).toString();
  }
}
