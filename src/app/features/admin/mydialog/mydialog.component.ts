import { Component, OnInit ,Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material'
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-mydialog',
  templateUrl: './mydialog.component.html',
  styleUrls: ['./mydialog.component.css']
})

export class MydialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MydialogComponent>,@Inject(MAT_DIALOG_DATA) public data:DialogData) { }
  Courses=['PGDCA','DTP','TALLY','PHOTOSHOP','AUTOCAD','HARDWARE','C','C++','JAVA']
  Qualification=['BELOW TENTH','SSC','INTER/DIPLOMA/ITI','ANY DEGREE','ANY PG','ILLITERATE']
  ngOnInit() {
  }
  adduserDetails(data): void {
    if(data.valid){
      this.dialogRef.close(data);

    }
  }
  close(){
    this.dialogRef.close(false);
 }
 

}
