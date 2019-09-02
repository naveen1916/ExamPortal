import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ExamService } from './exam.service';
import { Option, Question, Exam, ExamConfig } from '../models/index';
import { Observable } from 'rxjs';
import { take, map, subscribeOn } from 'rxjs/operators';
import { DashboardComponent } from '../../admin/dashboard/dashboard.component';
import { Router } from '@angular/router';
import { DialogService } from '../../../custom_modules/dialogModule';
import { ConfirmModalComponent } from '../../../shared/confirm-modal/confirm-modal.component';
declare let d3: any;
@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css'],
})
export class ExamComponent implements OnInit, OnDestroy {
  correctAnswers = 0;
  wrongAnswers = 0;
  isAttempted = 0;
  isNotAttempted = 0;
  exames: any[];
  exam: Exam = new Exam(null);
  examName: string;
  mode = 'exam';
  config: ExamConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': true,  // if true, it will move to next question automatically when answered.
    'duration': 100,  // indicates the time in which quiz needs to be completed. 0 means unlimited.
    'pageSize': 1,
    'requiredAll': false,  // indicates if you must answer all the questions before submitting.
    'richText': false,
    'shuffleQuestions': false,
    'shuffleOptions': false,
    'showClock': false,
    'showPager': true,
    'theme': 'none'
  };
  timer: any = null;
  startTime: Date;
  endTime: Date;
  ellapsedTime = '00:00';
  duration = '';
  pager = {
    index: 0,
    size: 1,
    count: 1
  };

  constructor(private _examService: ExamService, private router: Router, private dialogService: DialogService) {
    // this.countDown = timer(0, 1000).pipe(
    //   take(this.count),
    //   map(() => this.callBack()),
    // );
  }
  // callBack(): any {
  //   if (this.count === 1) {
  //     const disposable = this.dialogService.addDialog(ConfirmModalComponent, {
  //       title: 'Contest time is over',
  //       message: 'Contest time is over, Please wait to see the result',
  //       showFooter: false,
  //     })
  //       .subscribe((isConfirmed) => {
  //         if (isConfirmed) {
  //           this.onSubmit();
  //         } else {
  //           alert('declined');
  //         }
  //       });
  //     setTimeout(() => {
  //       disposable.unsubscribe();
  //       this.onSubmit();
  //     }, 10000);
  //   }
  //   return --this.count;
  // }
  index=1
  ngOnInit() {
    this.exames = this._examService.getAll();
    this.examName = this.exames[3].id;
    this.loadExam(this.examName);
  }

  loadExam(examName: string) {
    this._examService.get(examName).subscribe(res => {
      this.exam = new Exam(res);
      this.pager.count = this.exam.questions.length;
      this.startTime = new Date();
      this.timer = setInterval(() => { this.tick(); }, 1000);
      this.duration = this.parseTime(this.config.duration);
      console.log('this.pager.count = ' + this.pager.count);
    },
      err => {
        console.log('error;');
      });
    this.mode = 'exam';
  }
  tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    if (diff >= this.config.duration) {
      this.onSubmit();
    }
    this.ellapsedTime = this.parseTime(diff);
  }
  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }


  get filteredQuestions() {
    return (this.exam.questions) ?
      this.exam.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  onSelect(question: Question, option: Option) {
    if (question.questionTypeId === 1) {
      question.options.forEach((x) => { if (x.id !== option.id) { x.selected = false; } });
    }

    if (this.config.autoMove) {
      this.goTo(this.pager.index + 1);
    }
  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'exam';
    }
  }

  isAnswered(question: Question) {
    return question.options.find(x => x.selected) ? 'A' : 'NA';
  }

  isCorrect(question: Question) {
    return question.options.every(x => x.selected === x.isAnswer) ? 'correct' : 'wrong';
  }
  formSubmit() {
    const disposable = this.dialogService.addDialog(ConfirmModalComponent, {
      title: 'Submit Test',
      message: 'Once submitted, you can no longer view/modify this test. Are you sure you wish to submit this test?',
      showFooter: true,
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.onSubmit();
      } else {

      }
    });
  }
  onSubmit() {
    const answers = [];
    this.exam.questions.forEach(x => answers.push({ 'quizId': this.exam.id, 'questionId': x.id, 'answered': x.answered }));
    this.correctAnswers = 0;
    this.wrongAnswers = 0;
    this.isNotAttempted = 0;
    this.isAttempted = 0;
    this.exam.questions.forEach(question => {
      const result = this.isAnswered(question);
      if (result === 'A') {
        this.isAttempted = this.isAttempted + 1;
        const output = this.isCorrect(question);
        if (output === 'correct') {
          this.correctAnswers = this.correctAnswers + 1;
        } else if (output === 'wrong') {
          this.wrongAnswers = this.wrongAnswers + 1;
        }
      } else if (result === 'NA') {
        this.isNotAttempted = this.isNotAttempted + 1;
      }
    });
    this.mode = 'result';
  }
  ngOnDestroy() {
    // this.countDown.unsubscribe();

  }
}

