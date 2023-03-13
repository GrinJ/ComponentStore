import {AsyncPipe, CommonModule} from '@angular/common';
import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TuiDestroyService, TuiLetModule} from '@taiga-ui/cdk';
import {TuiLoaderModule} from '@taiga-ui/core';
import {TuiInputFilesModule} from '@taiga-ui/kit';
import {Observable, takeUntil} from 'rxjs';

import {ApiService, StorageService} from './services';

@Component({
  selector: 'file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.less'],
  standalone: true,
  imports: [CommonModule, TuiInputFilesModule, FormsModule, AsyncPipe, TuiLetModule, TuiLoaderModule],
  providers: [StorageService, ApiService, TuiDestroyService],
})
export class FileUploaderComponent {
  @Output() onUpload = new EventEmitter<File[]>();

  readonly isLoading$: Observable<boolean> = this.storage$.isLoading$;
  readonly files$: Observable<File[]> = this.storage$.files$;

  uploadFiles(files: File[]): void {
    this.storage$.uploadFiles(files);
  }

  ngOnInit() {
    this.files$.pipe(takeUntil(this.destroy$)).subscribe(files => {
      this.onUpload.emit(files);
    });
  }

  constructor(private readonly storage$: StorageService, private readonly destroy$: TuiDestroyService) {}
}
