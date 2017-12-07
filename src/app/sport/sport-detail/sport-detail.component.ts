import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Sport } from '../../../shared/sport.model';
import { SportService } from '../../../services/sport.service';

@Component({
  selector: 'app-sport-detail',
  templateUrl: './sport-detail.component.html',
  styleUrls: ['./sport-detail.component.css'],
  providers: [SportService]
})
export class SportDetailComponent implements OnInit {

	sport: Sport;
  constructor(private recipeService: SportService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
  	this.route.params
      .subscribe(
        (params: Params) => {
      this.recipeService.getSport(params['id'])
        .then(rec => this.sport = rec)
        .catch(error => console.log(error));
         console.log(this.sport);
      }
    );
  }

}
