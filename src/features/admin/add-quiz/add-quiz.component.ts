import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
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
import { Quiz } from '../../user/quizzes';

@Component({
  selector: 'app-add-quiz',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.css',
})
export class AddQuizComponent implements OnInit {
  quizForm: FormGroup;
  data: any;
  isEditMode: boolean = false;

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.quizForm = this.fb.group({
      id: [''],
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

  ngOnInit() {
    this.addQ();
    this.addOption(0);
    this.getQuizData();
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
  generateGUID(): string {
    return uuidv4();
  }

  editQuiz(quiz: Quiz) {
    this.isEditMode = true;
    console.log('Edit Quiz:', quiz);

    // Populate the form with the quiz data
    this.quizForm.patchValue({
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
      category: quiz.category,
      subcategory: quiz.subcategory,
      takeTime: quiz.takeTime,
      coverImage: quiz.coverImage,
      isActive: quiz.isActive,
      registered: quiz.registered,
    });

    // Handle questions separately
    this.questions.clear(); // Clear existing questions
    quiz.questions.forEach((question) => {
      const questionGroup = this.fb.group({
        text: [question.text, Validators.required],
        options: this.fb.array(
          question.options.map((option) =>
            this.fb.control(option, Validators.required)
          )
        ),
      });
      this.questions.push(questionGroup);
    });

    // Open the modal
    const modal = document.getElementById('addQuiz') as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  }

  onSubmit() {
    if (this.quizForm.valid) {
      const quizData = this.quizForm.value;

      if (this.isEditMode) {
        console.log('Update Quiz:', quizData);

        // Edit existing quiz
        this.apiService.update('quizzes', quizData.id, quizData).subscribe({
          next: (response) => {
            console.log('Quiz updated successfully:', response);
            this.getQuizData(); // Refresh the quiz list
            this.quizForm.reset(); // Reset the form after update
            this.isEditMode = false; // Reset edit mode
            this.closeModal();
          },
          error: (error) => {
            console.error('Error occurred while updating quiz:', error);
          },
        });
      } else {
        // Create new quiz
        const newQuizData = {
          ...quizData,
          id: this.generateGUID(), // Generate and assign GUID
        };
        this.apiService.create('quizzes', newQuizData).subscribe({
          next: (response) => {
            console.log('Quiz created successfully:', response);
            this.getQuizData(); // Refresh the quiz list
            this.quizForm.reset(); // Reset the form after creation
            this.closeModal();
          },
          error: (error) => {
            console.error('Error occurred while creating quiz:', error);
          },
        });
      }
    }
  }

  getQuizData(): void {
    this.apiService.getAll<Quiz>('quizzes').subscribe({
      next: (response) => {
        this.data = response;
        console.log('data', this.data);
      },
      error: (error) => {
        console.error('Error occurred while fetching categories:', error);
      },
      complete: () => {
        console.log('Categories fetching process completed.');
      },
    });
  }

  deleteQuiz(quiz: Quiz) {
    if (confirm('Are you sure you want to delete this quiz?')) {
      this.apiService.delete('quizzes', quiz.id).subscribe({
        next: (response) => {
          console.log('Quiz deleted successfully:', response);
          this.getQuizData(); // Refresh the quiz list
        },
        error: (error) => {
          console.error('Error occurred while deleting quiz:', error);
        },
      });
    }
  }

  closeModal() {
    this.quizForm.reset();
    this.isEditMode = false; // Reset edit mode
    const modal = document.getElementById('addQuiz') as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  }
}
