import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { environment } from '../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Sport } from '../shared/sport.model';
import { Club } from '../shared/club.model';
import { Registration } from '../shared/registration.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SportService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/sport'; // URL to web api
  private sports: Sport[] = [];
  private sport: Sport;
  private club: Club;
  private sportsChanged = new BehaviorSubject<Sport[]>(this.sports);
  sportsChanges = this.sportsChanged.asObservable();

  private clubsChanged = new BehaviorSubject<Sport>(this.sport);
  clubsChanges = this.clubsChanged.asObservable();

  private registrationsChanged = new BehaviorSubject<Club>(this.club);
  registrationChanges = this.registrationsChanged.asObservable();


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

	changeSport(sport) {
		this.sportsChanged.next(sport);
	}


	changeClub(sport) {
		this.clubsChanged.next(sport);
	}

	changeRegistration(club) {
		this.registrationsChanged.next(club);
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
	
	public getClub(id: number, cid: number) {
		return this.http.get(this.serverUrl + "/" + id + "/club/" + cid, { headers: this.headers })
		  .toPromise()
		  .then(response => {
		   // console.dir(response.json());
			return response.json() as Club[];
		  })
		  .catch(error => {
			return this.handleError(error);
		  });
	  }

	public getRegistration(id: number, cid: number) {
		return this.http.get(this.serverUrl + "/" + id + "/club/" + cid + "/registration", { headers: this.headers })
		.toPromise()
		.then(response => {
		// console.dir(response.json());
		return response.json() as Registration[];
		})
		.catch(error => {
		return this.handleError(error);
		});
	}
	
	addSport(sport: Sport) {
		return this.http.post(this.serverUrl, sport, { headers: this.headers })
		  .toPromise()
		  .then(response => {

			return response.json() as Sport;
		  })
		  .catch(error => {
			return this.handleError(error);
		  });
	  }

  updateSport(index: number, newSport: Sport) {

	return this.http.put(environment.serverUrl + "/sport/" + index, newSport, {headers: this.headers})
	.toPromise()
	.then(response => {

		this.sportsChanged.next(this.sports.slice());
		return response.json() as Sport[];
	}).catch(error => {
		return this.handleError(error);
	});
  }

	deleteSport(index: number) {
		return this.http.delete(environment.serverUrl + "/sport/" + index, {headers: this.headers})
		.toPromise()
		.then(response => {
		  return response.json() as Sport[];
		}).catch(error => {
		  return this.handleError(error);
		});
	}

	addClub(club: Club, id: number) {
		return this.http.post(environment.serverUrl + "/sport/" + id, club, { headers: this.headers })
		  .toPromise()
		  .then(response => {
			return response.json() as Club;
		  })
		  .catch(error => {
			return this.handleError(error);
		  });
	  }

  updateClub(id: number, cid: number, newClub: Club) {

	return this.http.put(environment.serverUrl + "/sport/" + id + "/club/" + cid, newClub, {headers: this.headers})
	.toPromise()
	.then(response => {
		return response.json() as Club[];
	}).catch(error => {
		return this.handleError(error);
	});
  }

	deleteClub(id: number, cid: number) {
		return this.http.delete(environment.serverUrl + "/sport/" + id + "/club/" + cid, {headers: this.headers})
		.toPromise()
		.then(response => {
		  return response.json() as Sport[];
		}).catch(error => {
		  return this.handleError(error);
		});
	}

	addRegistration(registration: Registration, id: number, cid: number) {
		console.log(registration);
		return this.http.post(environment.serverUrl + "/sport/" + id + "/club/" + cid, registration, { headers: this.headers })
		  .toPromise()
		  .then(response => {
			return response.json() as Registration;
		  })
		  .catch(error => {
			return this.handleError(error);
		  });
	  }

  updateRegistration(id: number, cid: number, rid: number, newRegistration: Registration) {

	return this.http.put(environment.serverUrl + "/sport/" + id + "/club/" + cid + "/registration/" + rid, newRegistration, {headers: this.headers})
	.toPromise()
	.then(response => {
		return response.json() as Registration[];
	}).catch(error => {
		return this.handleError(error);
	});
  }

	deleteRegistration(id: number, cid: number, rid: number) {
		return this.http.delete(environment.serverUrl + "/sport/" + id + "/club/" + cid + "/registration/" + rid, {headers: this.headers})
		.toPromise()
		.then(response => {
		  return response.json() as Registration[];
		}).catch(error => {
		  return this.handleError(error);
		});
	}

	private handleError(error: any): Promise<any> {
		console.log('handleError');
		return Promise.reject(error.message || error);
	  }
}
