import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  filesUploaded(componentId: number, files: File[]) {
    console.log(`Event from uploader #${componentId}, ${files.length} active files`);
  }
}
