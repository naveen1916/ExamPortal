import { Component, OnInit } from '@angular/core';

import { DialogService, DialogComponent } from '../../../../custom_modules/dialogModule';
import { IQuestions } from '../modals/IQuestions';
import { MangeQuestionsService } from '../Services/mange-questions.service';
import { Questions } from '../modals/Questions';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent extends DialogComponent<IQuestions, boolean> implements IQuestions {

  IOptions: any;
  title: string;
  message: string;
  showFooter: boolean;
  questionName: string;
  id: string;
  option: any;
  competancy: string;
  technology: string;
  errorMessage;
  // options = [];
  question = new Questions();
  competancies: any;
  selectedCompetancy: string;
  technologies: any;
  selectedTechnology: string;
  yearOfExperience = [{ exp: '1-2', description: '1 to 2 year experience' },
  { exp: '3-5', description: '3 to 5 year experience' },
  { exp: '5-8', description: '5 to 8 year experience' },
  { exp: '8-12', description: '8 to 12 year experience' },
  { exp: '12-20', description: '12 to 20 year experience' }];
  selectedYearOfExperience = this.yearOfExperience[0].exp;

  constructor(dialogService: DialogService, private manageQuestion: MangeQuestionsService) {
    super(dialogService);
    this.getAllCompetancy();
    this.getAllTechnology();
  }
  confirm() {
    this.result = true;
    this.close();
  }
  get selectedOptions() { // right now: ['1','3']
    return this.IOptions
      .filter(opt => opt.checked)
      .map(opt => opt.value);
  }
  addOptions() {
    if (this.IOptions.length <= 4) {
      if (this.option != null && this.option !== undefined && this.option !== '') {
        this.errorMessage = '';

        // tslint:disable-next-line:triple-equals
        if (!this.IOptions.some((item) => item.name == this.option)) {
          this.IOptions.push(
            { name: this.option, value: (this.IOptions.length + 1).toString(), isAnswer: false }
          );
          this.option = '';
        } else {
          this.errorMessage = 'Same option is avaialble ';
        }
      } else {
        this.errorMessage = 'Please Enter Option value';
      }
    } else {
      this.errorMessage = 'You can add max of 5 options';
    }

  }
  removeOption(questionOption) {
    const index = this.IOptions.indexOf(questionOption);
    this.IOptions.splice(index, 1);
  }
  onSave() {
    this.question.question = this.questionName;
    this.question.options = this.IOptions;
    this.question.id = this.id;
    this.question.competancy = this.competancy;
    this.question.technology = this.technology;
    this.manageQuestion.updateQuestion(this.question).subscribe(res => {
      console.log(res);
    });
  }
  onSelectionChange(entry) {
    this.IOptions.forEach(function (item) {
      item.isAnswer = false;
      if (item.value === entry.value) {
        item = entry;
        entry.isAnswer = true;
      }
    });
  }
  getAllCompetancy() {
    this.manageQuestion.getAllCompetancy().subscribe(res => {
      this.competancies = res;
      this.selectedCompetancy = this.competancy;
    });
  }
  getAllTechnology() {
    this.manageQuestion.getAllTechnology().subscribe(res => {
      this.technologies = res;
      console.log(this.technologies);
      this.selectedTechnology = this.technology;
    });
  }


}
