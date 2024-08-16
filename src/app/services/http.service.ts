import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import { APIResponse, Game } from '../models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getGameList(
    ordering: string,
    search?: string
  ): Observable<APIResponse<Game>> {
    let params = new HttpParams().set('ordering', ordering);

    if (search) {
      params = new HttpParams().set('ordering', ordering).set('search', search);
    }

    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {
      params,
    });
  }

  getGameDetails(id: string): Observable<Game> {
    return this.http.get<Game>(`${env.BASE_URL}/games/${id}`);

    //   const gameTrailersRequest = this.http.get(
    //     `${env.BASE_URL}/games/${id}/movies`
    //   );
    //   const gameScreenshotRequests = this.http.get(
    //     `${env.BASE_URL}/games/${id}/screenshots`
    //   );

    //   return forkJoin([
    //     gameInfoRequest,
    //     gameTrailersRequest,
    //     gameScreenshotRequests,
    //   ]).pipe(
    //     map((res: any) => {
    //       return {
    //         ...res['gameInfoRequest'],
    //         screenshots: res['gameScreenshotRequests']?.results,
    //         trailers: res['gameTrailersRequest']?.results,
    //       };
    //     })
    //   );
    // }
  }
}
