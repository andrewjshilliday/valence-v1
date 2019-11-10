import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from '../../../services/player.service';
import ResizeObserver from 'resize-observer-polyfill';

@Component({
  selector: 'app-media-item-collection-grid-carousel',
  templateUrl: './media-item-collection-grid.component.html',
  styleUrls: ['./media-item-collection-grid.component.scss']
})
export class MediaItemCollectionGridCarouselComponent implements OnInit, AfterViewInit {

  @Input() collection: any;
  @Input() numRows: number;
  @Input() showArtist: boolean;
  columns: number[];
  rows: number[];
  row: HTMLElement;
  leftIcon: HTMLElement;
  rightIcon: HTMLElement;
  firstElement: HTMLElement;

  constructor(private router: Router, public playerService: PlayerService) { }

  ngOnInit() {
    this.columns = Array.from(Array(Math.ceil(this.collection.length / this.numRows)).keys());
    this.rows = Array.from(Array(this.numRows).keys());
  }

  ngAfterViewInit() {
    this.row = document.getElementById(`row-${this.collection[0].id}-${this.collection[this.collection.length - 1].id}`);
    this.leftIcon = document.getElementById(`left-${this.collection[0].id}-${this.collection[this.collection.length - 1].id}`);
    this.rightIcon = document.getElementById(`right-${this.collection[0].id}-${this.collection[this.collection.length - 1].id}`);
    this.firstElement = this.row.firstElementChild as HTMLElement;
    this.positionScrollButtons();

    if (this.leftDisabled()) {
      this.leftIcon.classList.add('disabled');
    }
    if (this.rightDisabled()) {
      this.rightIcon.classList.add('disabled');
    }

    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(() => {
        this.positionScrollButtons();
      });
    });
    resizeObserver.observe(this.row);
  }

  goToAlbum(item: any) {
    this.router.navigate(['/albums', item.relationships.albums.data[0].id]);
  }

  play(item: any, event: Event) {
    event.stopPropagation();
    this.playerService.playItem(item);
  }

  scroll(right: boolean) {
    if (right) {
      this.rightIcon.classList.add('disabled');
      this.leftIcon.classList.remove('disabled');
      this.row.scrollLeft += this.row.offsetWidth;
    } else {
      this.leftIcon.classList.add('disabled');
      this.rightIcon.classList.remove('disabled');
      this.row.scrollLeft -= this.row.offsetWidth;
    }

    setTimeout(() => {
      if (right && !this.rightDisabled()) {
        this.rightIcon.classList.remove('disabled');
      } else if (!right && !this.leftDisabled()) {
        this.leftIcon.classList.remove('disabled');
      }
    }, 600);
  }

  leftDisabled(): boolean {
    return this.row.scrollLeft === 0;
  }

  rightDisabled(): boolean {
    const element = this.row.lastChild.lastChild as HTMLElement;
    return element.offsetLeft <= this.row.scrollLeft + this.row.offsetWidth - 10;
  }

  positionScrollButtons() {
    (this.leftIcon.firstChild as HTMLElement).style.top = `${this.firstElement.offsetHeight / 2 - 28}px`;
    (this.rightIcon.firstChild as HTMLElement).style.top = `${this.firstElement.offsetHeight / 2 - 28}px`;
  }

}
