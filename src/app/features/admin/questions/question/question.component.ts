import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  competency;
  technology;
  question;
  option: any;

  options = [
    { name: 'OptionA', value: '1', checked: false },
    { name: 'OptionB', value: '2', checked: true },
    { name: 'OptionC', value: '3', checked: false }
  ];
  constructor() { }

  ngOnInit() {
  }
  get selectedOptions() { // right now: ['1','3']
    return this.options
      .filter(opt => opt.checked)
      .map(opt => opt.value);
  }
  addOptions() {
    this.options.push(
      { name: this.option, value: (this.options.length + 1).toString(), checked: false }
    );

  }
  onSelectionChange(entry) {
    this.options.forEach(function (item) {
      item.checked = false;
      if (item.value === entry.value) {
        item = entry;
        entry.checked = true;
      }
    });
  }
  onSave() {
    console.log(this.options);
  }

}
