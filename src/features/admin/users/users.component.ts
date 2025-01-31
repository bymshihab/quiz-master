import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/api.service';
import { IUser } from '../../user/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  generalUsers: IUser[] = [];
  filteredUsers: IUser[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  totalUsers: number = 0;
  usersPerPage: number = 10;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.apiService.getAll<IUser>('users').subscribe({
      next: (users) => {
        console.log('Users:', users);

        // Use .filter() to get users with the role 'user'
        this.generalUsers = users.filter((user) => user.role === 'user');

        console.log('General Users:', this.generalUsers);
      },
      error: (error) => {
        console.error('Error occurred while fetching users:', error);
      },
    });
  }

  updateUser(user: IUser) {
    // Check if the ID is valid
    if (!user.id) {
      console.error('User ID is missing');
      return;
    }

    // Toggle the registered status (true to false or false to true)
    user.registered = !user.registered;

    // Now update the user status in the API
    this.apiService.update<IUser>('users', user.id, user).subscribe({
      next: (updatedUser) => {
        console.log('User updated successfully:', updatedUser);
        // Optionally, update the user in your local list (e.g., generalUsers)
        const index = this.generalUsers.findIndex((u) => u.id === user.id);
        if (index !== -1) {
          this.generalUsers[index] = updatedUser;
        }
      },
      error: (error) => {
        console.error('Error occurred while updating user:', error);
      },
    });
  }

  deleteUser(userId: string) {
    console.log('Deleting user with ID:', userId);
    if (confirm('Are you sure you want to delete this user?')) {
      // Implement delete logic
    }
  }
}
