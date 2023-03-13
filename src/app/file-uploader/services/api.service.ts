import {Injectable} from '@angular/core';
import {Observable, of, switchMap, throwError, timer} from 'rxjs';

@Injectable()
export class ApiService {
  /**
   * This is an abstract API service which emulates the uploading process with 1s delay and generate and error in half on cals.
   * You can simply replace it with HttpClient call with real API endpoint.
   * @param files
   */
  uploadFiles(files: File[]): Observable<any> {
    return timer(1000).pipe(
      switchMap(() => {
        return Math.random() > 0.5 ? of(true) : throwError('error');
      }),
    );
  }
}
