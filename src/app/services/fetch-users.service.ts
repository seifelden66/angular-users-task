// // fetch-UsersComponent.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class FetchUsersService {
//   apiUrl = 'https://reqres.in/api/users';

//   constructor(private http: HttpClient) {}

//   getUsers(page: number) {
//     return this.http.get(`${this.apiUrl}?page=${page}`);
//   }
//   getUserById(id: number): Observable<any> {
//     return this.http.get(`${this.apiUrl}/${id}`);
//   }
// }



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FetchUsersService {
  apiUrl = 'https://reqres.in/api/users';
  private userCache = new BehaviorSubject<Map<number, any> | null>(null);
  private userByIdCache = new BehaviorSubject<Map<number, any> | null>(null);

  constructor(private http: HttpClient) {}

  getUsers(page: number): Observable<any> {
    const cachedData = this.userCache.getValue();

    if (cachedData && cachedData.has(page)) {
      // Return data from cache if available
      return this.userCache.asObservable().pipe(
        map((cache) => cache!.get(page))
      );
    } else {
      // Fetch data from API if not cached
      return this.http.get(`${this.apiUrl}?page=${page}`).pipe(
        map((data) => {
          // Update cache with new data
          const updatedCache = new Map(cachedData);
          updatedCache.set(page, data);
          this.userCache.next(updatedCache);
          return data;
        })
      );
    }
  }

  getUserById(id: number): Observable<any> {
    const cachedData = this.userByIdCache.getValue();
  
    if (cachedData && cachedData.has(id)) {
      // Return data from cache if available
      return this.userByIdCache.asObservable().pipe(
        map((cache) => cache!.get(id))
      );
    } else {
      // Fetch data from API if not cached
      return this.http.get(`${this.apiUrl}/${id}`).pipe(
        map((data) => {
          // Update cache with new data
          const updatedCache = new Map(cachedData);
          updatedCache.set(id, data);
          this.userByIdCache.next(updatedCache);
          return data;
        })
      );
    }
  }
}
