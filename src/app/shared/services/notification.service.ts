import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackBar: MatSnackBar) { }

  open(message: string, action = '', duration = 4000) {
    this.snackBar.open(message, action, { duration: duration, verticalPosition: 'top' });
  }

}
