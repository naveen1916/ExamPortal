import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'src/app/custom_modules/dialogModule';
import { IConfirmModel } from 'src/app/shared/class/IConfirmModel';
import { MangeQuestionsService } from '../Services/mange-questions.service';
import { Questions } from '../modals/Questions';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent extends DialogComponent<IConfirmModel, boolean> implements IConfirmModel, OnInit {
  option: any;
  title: string;
  message: string;
  showFooter: boolean;
  errorMessage;
  options = [
    // { name: 'OptionA', value: '1', checked: false },
    // { name: 'OptionB', value: '2', checked: true },
    // { name: 'OptionC', value: '3', checked: false }
  ];
  question = new Questions();
  competancty: any;
  selectedCompetancy = '';
  technologies: any;
  selectedTechnology: String;
  yearOfExperience = [{ exp: '1-2', description: '1 to 2 year experience' },
  { exp: '3-5', description: '3 to 5 year experience' },
  { exp: '5-8', description: '5 to 8 year experience' },
  { exp: '8-12', description: '8 to 12 year experience' },
  { exp: '12-20', description: '12 to 20 year experience' }];
  selectedYearOfExperience = this.yearOfExperience[0].exp;

  constructor(dialogService: DialogService, private manageQuestion: MangeQuestionsService) {
    super(dialogService);

  }
  ngOnInit() {
    this.getAllCompetancy();
    this.getAllTechnology();
  }

  confirm() {
    this.result = true;
    this.close();
  }
  get selectedOptions() { // right now: ['1','3']
    return this.options
      .filter(opt => opt.checked)
      .map(opt => opt.value);
  }
  onSave() {

    // this.question.question = 'Which of the following assemblies can be stored in Global Assembly Cache?';
    // this.question.competancy = 'C2';
    // this.question.yearOfExp = '1-2';
    // this.question.options = [
    //   {
    //     'id': 1055,
    //     'questionId': 1010,
    //     'name': 'Exception',
    //     'isAnswer': false
    //   },
    //   {
    //     'id': 1056,
    //     'questionId': 1010,
    //     'name': 'Code-behind',
    //     'isAnswer': true
    //   },
    //   {
    //     'id': 1057,
    //     'questionId': 1010,
    //     'name': 'Code-front',
    //     'isAnswer': false
    //   },
    //   {
    //     'id': 1058,
    //     'questionId': 1010,
    //     'name': 'None of the above',
    //     'isAnswer': false
    //   }
    // ];
    this.question.competancy = this.selectedCompetancy;
    this.question.technology = this.selectedTechnology;
    this.question.options = this.options;
    this.question.yearOfExp = this.selectedYearOfExperience;
    this.manageQuestion.AddQuestions(this.question);
  }
  getAllCompetancy() {
    this.manageQuestion.getAllCompetancy().subscribe(res => {
      this.competancty = res;
      this.selectedCompetancy = this.competancty[0].level;
    });
  }
  getAllTechnology() {
    this.manageQuestion.getAllTechnology().subscribe(res => {
      this.technologies = res;
      console.log(this.technologies);
      this.selectedTechnology = this.technologies[0].name;
    });
  }

  addOptions() {
    if (this.options.length <= 4) {
      if (this.option != null && this.option !== undefined && this.option !== '') {
        this.errorMessage = '';

        // tslint:disable-next-line:triple-equals
        if (!this.options.some((item) => item.name == this.option)) {
          this.options.push(
            { name: this.option, value: (this.options.length + 1).toString(), isAnswer: false }
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
    const index = this.options.indexOf(questionOption);
    this.options.splice(index, 1);
  }
  onSelectionChange(entry) {
    this.options.forEach(function (item) {
      item.isAnswer = false;
      if (item.value === entry.value) {
        item = entry;
        entry.isAnswer = true;
      }
    });
  }
  selectChangeYearHandler(event: any) {

    this.question.yearOfExp = event.target.value;
  }

  selectChangeTechnologyHandler(event: any) {

    this.selectedTechnology = event.target.value;
  }
  selectChangeCompetancyHandler(event: any) {

    this.selectedCompetancy = event.target.value;
  }
}
