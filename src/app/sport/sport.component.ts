import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Sport } from '../../shared/sport.model';
import { Subscription } from 'rxjs/Subscription';

import { SportEditComponent } from './sport-edit/sport-edit.component';
import { SportService } from '../../services/sport.service';

@Component({
  selector: 'app-sport',
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.css'],
  providers: [SportService]
})
export class SportComponent implements OnInit, OnDestroy {

  @ViewChild(SportEditComponent) child;
	sports: Sport[];

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
