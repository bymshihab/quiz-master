import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  loggedInCheck: boolean | null = null;

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.loggedInCheck = localStorage.getItem('isLoggedIn') !== null;
    }
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
      localStorage.clear();
      alert('User logged out successfully');
    }
  }
}
