# QuizeMaster

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.12.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

# Pages and Components

## Common:

Home Page (Landing Page for all users).
Login & Register.

## Admin:

Dashboard (Manage Quizzes, View Results).
Create/Edit Quiz Page (Form for adding quizzes).
Quiz Analytics Page.

## Normal Users:

Quiz List (Browse available quizzes).
Quiz Detail Page (Take quiz).
Result Page (View results).
Dashboard (For registered users to view progress).

# Unique Learning Goals

## Admin Side:

CRUD operations using JSON Server for quizzes and results.
Role-based routing and authentication.

## User Side:

Conditional functionality for registered vs. non-registered users.
Data binding and handling quiz logic (e.g., score calculation).

## Angular Concepts:

Routing and guards for admin vs. user access.
Reactive forms for quiz creation and taking quizzes.
Observables for fetching data from JSON Server.

# File structure

quiz-master/
│
├── src/
│ ├── app/
│ │ ├── core/ # Core module for singleton services
│ │ │ ├── guards/ # Route guards
│ │ │ │ └── auth.guard.ts
│ │ │ ├── interceptors/ # HTTP interceptors
│ │ │ │ └── auth.interceptor.ts
│ │ │ ├── services/ # Shared services
│ │ │ │ ├── auth.service.ts # Authentication service
│ │ │ │ ├── api.service.ts # API service
│ │ │ │ └── user.service.ts # User-specific service
│ │ │ └── core.module.ts # Core module declaration
│ │ │
│ │ ├── shared/ # Shared module for reusable components and utilities
│ │ │ ├── components/ # Shared UI components
│ │ │ │ ├── header/ # Header component
│ │ │ │ │ ├── header.component.ts
│ │ │ │ │ ├── header.component.html
│ │ │ │ │ └── header.component.css
│ │ │ │ ├── footer/ # Footer component
│ │ │ │ │ ├── footer.component.ts
│ │ │ │ │ ├── footer.component.html
│ │ │ │ │ └── footer.component.css
│ │ │ ├── directives/ # Custom directives
│ │ │ ├── pipes/ # Custom pipes
│ │ │ └── shared.module.ts # Shared module declaration
│ │ │
│ │ ├── modules/ # Feature modules
│ │ │ ├── admin/ # Admin feature module
│ │ │ │ ├── pages/ # Admin pages
│ │ │ │ │ ├── dashboard/ # Admin dashboard
│ │ │ │ │ │ ├── dashboard.component.ts
│ │ │ │ │ │ ├── dashboard.component.html
│ │ │ │ │ │ └── dashboard.component.css
│ │ │ │ │ ├── quiz-form/ # Add/Edit quiz form
│ │ │ │ │ │ ├── quiz-form.component.ts
│ │ │ │ │ │ ├── quiz-form.component.html
│ │ │ │ │ │ └── quiz-form.component.css
│ │ │ │ │ └── results/ # Results analytics
│ │ │ │ │ ├── results.component.ts
│ │ │ │ │ ├── results.component.html
│ │ │ │ │ └── results.component.css
│ │ │ │ ├── admin-routing.module.ts
│ │ │ │ └── admin.module.ts
│ │ │ │
│ │ │ ├── user/ # User feature module
│ │ │ │ ├── pages/ # User pages
│ │ │ │ │ ├── dashboard/ # User dashboard
│ │ │ │ │ │ ├── dashboard.component.ts
│ │ │ │ │ │ ├── dashboard.component.html
│ │ │ │ │ │ └── dashboard.component.css
│ │ │ │ │ ├── quiz-list/ # Quiz list page
│ │ │ │ │ │ ├── quiz-list.component.ts
│ │ │ │ │ │ ├── quiz-list.component.html
│ │ │ │ │ │ └── quiz-list.component.css
│ │ │ │ │ ├── quiz-detail/ # Quiz attempt page
│ │ │ │ │ │ ├── quiz-detail.component.ts
│ │ │ │ │ │ ├── quiz-detail.component.html
│ │ │ │ │ │ └── quiz-detail.component.css
│ │ │ │ │ └── result/ # Result view page
│ │ │ │ │ ├── result.component.ts
│ │ │ │ │ ├── result.component.html
│ │ │ │ │ └── result.component.css
│ │ │ │ ├── user-routing.module.ts
│ │ │ │ └── user.module.ts
│ │ │
│ │ ├── auth/ # Authentication module
│ │ │ ├── login/ # Login page
│ │ │ │ ├── login.component.ts
│ │ │ │ ├── login.component.html
│ │ │ │ └── login.component.css
│ │ │ ├── register/ # Register page
│ │ │ │ ├── register.component.ts
│ │ │ │ ├── register.component.html
│ │ │ │ └── register.component.css
│ │ │ ├── auth-routing.module.ts
│ │ │ └── auth.module.ts
│ │ │
│ │ ├── app-routing.module.ts # App routing module
│ │ ├── app.component.ts # Root component
│ │ ├── app.component.html
│ │ ├── app.component.css
│ │ └── app.module.ts # Root module
│ │
│ ├── assets/ # Static assets (images, JSON files, etc.)
│ ├── environments/ # Environment-specific configurations
│ │ ├── environment.ts # Development environment
│ │ └── environment.prod.ts # Production environment
│ │
│ ├── index.html # Main HTML file
│ ├── styles.css # Global styles
│ └── main.ts # Main entry point
│
├── angular.json # Angular CLI configuration
├── package.json # Project dependencies
└── README.md # Project documentation
