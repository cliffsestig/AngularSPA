import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Club } from '../../shared/club.model';
import { SportService } from '../../services/sport.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [SportService]
})
export class RegistrationComponent implements OnInit {

	club: Club;
	id: number;
  	constructor(private sportService: SportService,
              private route: ActivatedRoute,
              private router: Router) { }

	  ngOnInit() {
	  	this.route.params
	      .subscribe(
	        (params: Params) => {
	      this.sportService.getClub(params['id'], params['cid'])
	        .then(rec => this.club = rec, this.id = params['id'])
	        .catch(error => console.log(error));
	         console.log(this.club);
	      }
	    );
	  }

	onNewRegistration() {
     this.router.navigate(['new'], {relativeTo: this.route});
  	}

 onDeleteRegistration(cid: number, rid: number) {
    this.sportService.deleteRegistration(this.id, cid, rid);
  }

}
