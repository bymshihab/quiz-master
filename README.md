# QuizeMaster

"QuizMaster" is an Angular web app where admins can manage quizzes and view analytics, while users can browse, take quizzes, and track their progress. It features role-based routing, reactive forms for quiz management, and observables for fetching quiz data from a JSON Server backend.

### **Pages and Components Overview**

#### **Common Pages (For all users):**

1. **Home Page (Landing Page)**: This is the main page that all users will see when they visit the app.
2. **Login & Register**: Pages for users to log in or create a new account.

#### **Admin Pages (For Admin users only):**

1. **Dashboard**: This page allows the admin to manage quizzes and view results.
2. **Create/Edit Quiz Page**: A form that enables the admin to add new quizzes or edit existing ones.
3. **Quiz Analytics Page**: Displays data and analytics about the quizzes and results.

#### **Normal User Pages (For registered and non-registered users):**

1. **Quiz List**: A page where users can browse the available quizzes.
2. **Quiz Detail Page**: Users can take the quiz on this page.
3. **Result Page**: This page shows the user's results after taking a quiz.
4. **User Dashboard**: A dashboard for registered users to view their progress and past results.

---

### **Angular Concepts to Focus On:**

1. **Routing and Guards**: Use Angular's routing to navigate between different pages. Implement guards to restrict access to certain routes (e.g., admins accessing the quiz management section).
2. **Reactive Forms**: Use reactive forms for both quiz creation (by admins) and quiz-taking (by users), providing better validation and user input handling.

3. **Observables**: Fetch data from the **JSON Server** (such as quizzes and results) using Angular's observable-based HTTP services, allowing for asynchronous data loading and smooth UI updates.

---

### **Running Guide for QuizMaster**

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Start JSON Server**:

   ```bash
   json-server --watch db.json --port 3000
   ```

3. **Run Angular App**:

   ```bash
   ng serve
   ```

4. **Access**:  
   Visit `http://localhost:4200/`.

<details> <summary>Click to view screenshots</summary>
![Alt text](/imgs/Home.png)
</details>

<!-- # File structure -->

<!-- quiz-master/
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
└── README.md # Project documentation -->
