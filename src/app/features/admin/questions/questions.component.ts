import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../exam/exam/exam.service';
import { Router } from '@angular/router';
import { AddQuestionComponent } from './add-question/add-question.component';
import { DialogService } from '../../../custom_modules/dialogModule';
import { debug } from 'util';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { MangeQuestionsService } from './Services/mange-questions.service';
import { Questions } from './modals/Questions';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  questions;
  constructor(private _examService: ExamService, private _manageQuestionService: MangeQuestionsService,
    private router: Router, private dialogService: DialogService) { }

  ngOnInit() {
    const exames = this._examService.getAll();
    const examName = exames[3].id;
    this.loadExam(examName);
  }

  loadExam(examName: string) {
    this._manageQuestionService.GetAllQuestions().subscribe(res => {
      this.questions = res;
      console.log(res);
    });
  }

  addNewQuestion() {
    const disposable = this.dialogService.addDialog(AddQuestionComponent, {
      title: 'Add Questions',
      message: 'Once submitted, you can no longer view/modify this test. Are you sure you wish to submit this test?',
      showFooter: true,
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        // this.onSubmit();
      } else {

      }
    });
  }
  questionClick(question) {


    const disposable = this.dialogService.addDialog(EditQuestionComponent, {
      title: 'Edit Questions',
      message: 'Once submitted, you can no longer view/modify this test. Are you sure you wish to submit this test?',
      id: question._id,
      questionName: question.question,
      showFooter: true,
      IOptions: question.options,
      competancy: question.competancy,
      technology: question.technology
    }).subscribe((isConfirmed) => {

    });
  }

}
