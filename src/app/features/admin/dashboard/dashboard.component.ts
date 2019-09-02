import { Component, OnInit } from '@angular/core';
import { Question, Exam } from '../../exam/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  exames: any[];
  exam: Exam ;
  // = new Exam(null);
  examName: string;
  constructor() {
    console.log(this.exam);
  }

  ngOnInit() {
  }
  showResult(examResult: any): any {
    console.log('exam result');
    console.log(examResult);
    this.exam = examResult;
  }
  isCorrect(question: Question) {
    return question.options.every(x => x.selected === x.isAnswer) ? 'correct' : 'wrong';
  }


}
