import {Injectable} from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';
import {ApiService} from './api.service';
import {catchError, finalize, map, Observable, of, switchMap, tap} from 'rxjs';

interface Storage {
  files: File[];
  isLoading: boolean;
}

const initialState: Storage = {
  files: [],
  isLoading: false,
};

@Injectable()
export class StorageService extends ComponentStore<Storage> {
  readonly isLoading$ = this.select(storage => storage.isLoading);
  readonly files$ = this.select(storage => storage.files);

  readonly setIsLoading = this.updater((storage, isLoading: boolean) => ({
    ...storage,
    isLoading: isLoading,
  }));

  readonly setFiles = this.updater((storage, files: File[]) => ({
    ...storage,
    files: files,
  }));

  readonly uploadFiles = this.effect((files$: Observable<File[]>) =>
    files$.pipe(
      tap(() => this.setIsLoading(true)),
      tap(files => this.setFiles(files)),
      switchMap(files =>
        this.apiService.uploadFiles(files).pipe(
          map(() => {
            this.showAlert('Файлы загружены успешно');
          }),
          catchError(() => {
            return of(this.showAlert('Ошибка загрузки'));
          }),
          finalize(() => this.setIsLoading(false)),
        )
      ),
    ),
  );

  readonly showAlert = this.effect((message$: Observable<string>) =>
    message$.pipe(
      tap<string>(message => {
        alert(message);
      }),
    ),
  );

  constructor(private readonly apiService: ApiService) {
    super(initialState);
  }
}
