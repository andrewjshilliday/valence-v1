import { Component, OnInit, Input } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input() item: any;
  @Input() playOption: boolean;
  @Input() shuffleOption: boolean;
  @Input() libraryOption: boolean;
  @Input() ratingOption: boolean;
  @Input() rating: number;

  constructor(public playerService: PlayerService, public apiService: ApiService) { }

  ngOnInit() { }

  addRating(id: any, newRating: number) {
    this.apiService.addRating(id, newRating);
  }

}
