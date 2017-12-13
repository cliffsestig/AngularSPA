import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Club } from '../../shared/club.model';
import { SportService } from '../../services/sport.service';


import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [SportService]
})
export class RegistrationComponent implements OnInit, OnDestroy {

	club: Club;
	id: number;
	cid: number;
	rid: number;
	edit: boolean;


  subscription: Subscription;

  	constructor(private sportService: SportService,
              private route: ActivatedRoute,
              private router: Router) { }

	  ngOnInit() {

	  this.subscription = this.sportService.registrationChanges
	      .subscribe(
	        (club: Club) => {
	          this.club = club;
	        }
	      );
	  	this.route.params
	      .subscribe(
	        (params: Params) => {
	      this.sportService.getClub(params['id'], params['cid'])
	        .then(rec => this.club = rec)
          .then(this.id = params['id'], this.cid = params['cid'])
	        .catch(error => console.log(error));
	         
	      }
	    );

	  }

ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onEditRegistration(rid){
    this.rid = rid;
    this.edit = true;
  }

  onAddRegistration(club){
    console.log(this.club);
    this.club.registrations.push(club);
    this.sportService.changeRegistration(this.club);
  }

  onUpdateRegistration(club){
      const index = this.club.registrations.findIndex(x => x._id === club._id);
      this.club.registrations[index] = club;
      this.sportService.changeRegistration(this.club);
  }

  onNewRegistration() {
     this.router.navigate(['new'], {relativeTo: this.route});
  }

  onDeleteRegistration(cid: number, rid: number, i) {
    
    this.club.registrations.splice(i,1);
    this.sportService.changeRegistration(this.club);
    this.sportService.deleteRegistration(this.id, cid, rid);
    this.router.navigate(['/sport/' + this.id + '/club' + cid]);
  }
}
