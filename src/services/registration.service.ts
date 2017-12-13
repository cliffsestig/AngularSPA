import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { environment } from '../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';

import { Registration } from '../shared/registration.model';

@Injectable()
export class RegistrationService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/registrations'; // URL to web api


  constructor(private http: Http) {}

	
	public getRegistrations(): Promise<Registration[]> {
		return this.http.get(this.serverUrl, { headers: this.headers })
			.toPromise()
			.then(response => {
				// console.dir(response.json());
				return response.json() as Registration[];
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
