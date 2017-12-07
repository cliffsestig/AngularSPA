import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { environment } from '../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Sport } from '../shared/sport.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SportService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/sport'; // URL to web api
  private sports: Sport[] = [];


  constructor(private http: Http) {}

	public getSports(): Promise<Sport[]> {
		return this.http.get(this.serverUrl, { headers: this.headers })
			.toPromise()
			.then(response => {
				// console.dir(response.json());
				return response.json() as Sport[];
			})
			.catch(error => {
				return this.handleError(error);
			}
		);
	}

  public getSport(id: number) {
    return this.http.get(this.serverUrl + "/" + id, { headers: this.headers })
      .toPromise()
      .then(response => {
       // console.dir(response.json());
        return response.json() as Sport[];
      })
      .catch(error => {
        return this.handleError(error);
      });
  }
	private handleError(error: any): Promise<any> {
	    console.log('handleError');
	    return Promise.reject(error.message || error);
	  }
}
