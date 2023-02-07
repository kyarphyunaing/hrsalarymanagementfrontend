import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../model/employee';
import { EmployeeService } from '../service/employee.service';
 
@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {
  message: string = "Are you sure want to delete?"
  confirmButtonText = "Yes"
  cancelButtonText = "Cancel"
  ngOnInit(): void {
  }
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,	private dialogRef: MatDialogRef<ConfirmationDialogComponent>) {
		if(data){
			this.message = data.message || this.message;
			if (data.buttonText) {
				this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
				this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
			}
		}
	}

	onConfirmClick(): void {
		this.dialogRef.close(true);
	}


}
