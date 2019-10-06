import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { PlayerService } from '../../../services/player.service';
declare const ResizeObserver;

@Component({
  selector: 'app-media-item-collection-carousel',
  templateUrl: './media-item-collection-row.component.html',
  styleUrls: ['./media-item-collection-row.component.scss']
})
export class MediaItemCollectionRowCarouselComponent implements OnInit, AfterViewInit {

  @Input() collection: any;
  @Input() size: number;
  row: HTMLElement;
  leftIcon: HTMLElement;
  rightIcon: HTMLElement;
  artwork: HTMLElement;

  constructor(public playerService: PlayerService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.row = document.getElementById(`row-${this.collection[0].id}-${this.collection[this.collection.length - 1].id}`);
    this.leftIcon = document.getElementById(`left-${this.collection[0].id}-${this.collection[this.collection.length - 1].id}`);
    this.rightIcon = document.getElementById(`right-${this.collection[0].id}-${this.collection[this.collection.length - 1].id}`);
    this.artwork = document.getElementById(`artwork-${this.collection[0].id}`);
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
    return (this.row.lastChild as HTMLElement).offsetLeft < this.row.scrollLeft + this.row.offsetWidth;
  }

  positionScrollButtons() {
    (this.leftIcon.firstChild as HTMLElement).style.top = `${this.artwork.offsetHeight / 2 - 28}px`;
    (this.rightIcon.firstChild as HTMLElement).style.top = `${this.artwork.offsetHeight / 2 - 28}px`;
  }

}
