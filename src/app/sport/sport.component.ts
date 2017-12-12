import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Sport } from '../../shared/sport.model';
import { Subscription } from 'rxjs/Subscription';

import { SportEditComponent } from './sport-edit/sport-edit.component';
import { SportService } from '../../services/sport.service';

@Component({
  selector: 'app-sport',
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.css'],  
  providers: [SportService],
})
export class SportComponent implements OnInit, OnDestroy {

	sports: Sport[];
  id: number;
  edit:boolean;

  subscription: Subscription;


  	constructor(private sportService: SportService,
                private router: Router,
                private route: ActivatedRoute) { }


  	ngOnInit() {
       this.subscription = this.sportService.sportsChanges
      .subscribe(
        (sports: Sport[]) => {
          this.sports = sports;
        }
      );
  		this.sportService.getSports()
	      .then(sports => this.sports = sports)
	      .catch(error => console.log(error));
        this.sportService.changeSport(this.sports);
  	}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onEditSport(id){
    this.id = id;
    this.edit = true;
  }

  onAddSport(sport){
    this.sports.push(sport);
    this.sportService.changeSport(this.sports);
  }

  onUpdateSport(sport){
      const index = this.sports.findIndex(x => x._id === sport._id);
      this.sports[index] = sport;
      this.sportService.changeSport(this.sports);
  }

  onNewSport() {
     this.router.navigate(['new'], {relativeTo: this.route});
  }

  onDeleteSport(id: number, i) {
    this.sports.splice(i,1);
    this.sportService.changeSport(this.sports);
    this.sportService.deleteSport(id);
    this.router.navigate(['/sport']);
  }
}