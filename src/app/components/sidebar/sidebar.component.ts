import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import path from 'path';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  list_item = [
    {name: "Home", path: ''},
    {name: "Vista 1", path: 'vista1'},
    {name: "Vista 2", path: 'vista2'}
  ]

}
