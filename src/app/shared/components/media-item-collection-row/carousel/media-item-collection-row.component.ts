import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { PlayerService } from '../../../services/player.service';
import { MediaItemViewComponent } from '../../media-item-view/media-item-view.component';
import ResizeObserver from 'resize-observer-polyfill';

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
  @ViewChild(MediaItemViewComponent, {static: false}) mediaItemComponent: MediaItemViewComponent;

  constructor(public playerService: PlayerService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.row = document.getElementById(`row-${this.collection[0].id}-${this.collection[this.collection.length - 1].id}`);
    this.leftIcon = document.getElementById(`left-${this.collection[0].id}-${this.collection[this.collection.length - 1].id}`);
    this.rightIcon = document.getElementById(`right-${this.collection[0].id}-${this.collection[this.collection.length - 1].id}`);
    this.artwork = this.mediaItemComponent.element.nativeElement.children[0].children[0].children[0];
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
