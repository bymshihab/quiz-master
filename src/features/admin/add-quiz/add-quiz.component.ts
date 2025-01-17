import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../../core/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-quiz',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.css',
})
export class AddQuizComponent {
  quizForm: FormGroup;

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.quizForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      subcategory: ['', Validators.required],
      takeTime: [0, [Validators.required, Validators.min(1)]],
      coverImage: ['', Validators.required],
      isActive: [true, Validators.required],
      registered: [false],
      questions: this.fb.array([]),
    });
  }

  get questions() {
    return this.quizForm.get('questions') as FormArray;
  }

  // Question related methods

  addQ() {
    const questionGroup = this.fb.group({
      text: ['', Validators.required],
      options: this.fb.array([
        this.createOption(),
        this.createOption(),
        this.createOption(),
      ]),
    });
    this.questions.push(questionGroup);
  }

  removeQ(index: number) {
    this.questions.removeAt(index);
  }

  createOption(): FormControl {
    return this.fb.control('', Validators.required);
  }

  getOptions(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('options') as FormArray;
  }

  addOption(questionIndex: number) {
    this.getOptions(questionIndex).push(this.createOption());
  }

  removeOption(questionIndex: number, optionIndex: number) {
    this.getOptions(questionIndex).removeAt(optionIndex);
  }

  // end of the Question related methods

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.quizForm.patchValue({ coverImage: file.name });
    }
  }

  onSubmit() {
    if (this.quizForm.valid) {
      this.apiService.create('quizzes', this.quizForm.value).subscribe({
        next: (response) => {
          console.log('Quiz created successfully:', response);
        },
        error: (error) => {
          console.error('Error occurred while creating quiz:', error);
        },
        complete: () => {
          console.log('Quiz creation process completed.');
        },
      });
    }
  }
}
