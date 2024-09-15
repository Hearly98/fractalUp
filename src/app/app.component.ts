import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainContentComponent } from './main-content/main-content.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, MainContentComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'fractalUp_prueba_tecnica';
}
