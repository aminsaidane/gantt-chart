import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GanttComponent } from './components/gant/gant.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,GanttComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
})
export class AppComponent {
  title = 'intro-gant';
}
