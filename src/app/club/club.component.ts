import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Sport } from '../../shared/sport.model';
import { Subscription } from 'rxjs/Subscription';

import { SportService } from '../../services/sport.service';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css'],
  providers: [SportService]
})
export class ClubComponent implements OnInit, OnDestroy {

	sport: Sport;
	id: number;
  cid: number;
  edit:boolean;

  subscription: Subscription;

  	constructor(private sportService: SportService,
              private route: ActivatedRoute,
              private router: Router) { }

	  ngOnInit() {
		  this.subscription = this.sportService.clubsChanges
	      .subscribe(
	        (sport: Sport) => {
	          this.sport = sport;
	        }
	      );
	  	this.route.params
	      .subscribe(
	        (params: Params) => {
	      this.sportService.getSport(params['id'])
	        .then(rec => this.sport = rec, this.id = params['id'])
	        .catch(error => console.log(error));
	      }
	    );
	  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onEditClub(id, cid){
    this.id = id;
    this.cid = cid;
    this.edit = true;
  }

  onAddClub(sport){
    this.sport.clubs.push(sport);
    this.sportService.changeSport(this.sport);
  }

  onUpdateClub(sport){
      const index = this.sport.clubs.findIndex(x => x._id === sport._id);
      this.sport.clubs[index] = sport;
      this.sportService.changeSport(this.sport);
  }

  onNewClub() {
     this.router.navigate(['new'], {relativeTo: this.route});
  }

  onDeleteClub(id: number, cid: number, i) {
    
    this.sport.clubs.splice(i,1);
    this.sportService.changeSport(this.sport);
    this.sportService.deleteClub(id, cid);
    this.router.navigate(['/sport/' + id]);
  }
}
