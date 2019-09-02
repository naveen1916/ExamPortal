
import { Question } from './question';
import { ExamConfig } from './exam-config';

export class Exam {
    id: number;
    name: string;
    description: string;
    config: ExamConfig;
    questions: Question[];

    constructor(data: any) {
        if (data) {
            this.id = data.id;
            this.name = data.name;
            this.description = data.description;
            this.config = new ExamConfig(data.config);
            this.questions = [];
            data.questions.forEach(q => {
                this.questions.push(new Question(q));
            });
        }
    }
}
