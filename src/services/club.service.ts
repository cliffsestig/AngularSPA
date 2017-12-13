import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { environment } from '../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';

import { Club } from '../shared/club.model';

@Injectable()
export class ClubService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/club'; // URL to web api


  constructor(private http: Http) {}

	
	public getClubs(): Promise<Club[]> {
		return this.http.get(this.serverUrl, { headers: this.headers })
			.toPromise()
			.then(response => {
				// console.dir(response.json());
				return response.json() as Club[];
			})
			.catch(error => {
				return this.handleError(error);
			}
		);
	}

	private handleError(error: any): Promise<any> {
		console.log('handleError');
		return Promise.reject(error.message || error);
	  }
}
