import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('row') row: ElementRef;
  @ViewChild('leftIcon') leftIcon: ElementRef;
  @ViewChild('rightIcon') rightIcon: ElementRef;
  firstElement: HTMLElement;
  columns: number[];
  rows: number[];

  constructor(private router: Router, public playerService: PlayerService) { }

  ngOnInit() {
    this.columns = Array.from(Array(Math.ceil(this.collection.length / this.numRows)).keys());
    this.rows = Array.from(Array(this.numRows).keys());
  }

  ngAfterViewInit() {
    this.firstElement = this.row.nativeElement.firstElementChild as HTMLElement;
    this.positionScrollButtons();

    if (this.leftDisabled()) {
      this.leftIcon.nativeElement.classList.add('disabled');
    }
    if (this.rightDisabled()) {
      this.rightIcon.nativeElement.classList.add('disabled');
    }

    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(() => {
        this.positionScrollButtons();
      });
    });
    resizeObserver.observe(this.row.nativeElement);
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
      this.rightIcon.nativeElement.classList.add('disabled');
      this.leftIcon.nativeElement.classList.remove('disabled');
      this.row.nativeElement.scrollLeft += this.row.nativeElement.offsetWidth;
    } else {
      this.leftIcon.nativeElement.classList.add('disabled');
      this.rightIcon.nativeElement.classList.remove('disabled');
      this.row.nativeElement.scrollLeft -= this.row.nativeElement.offsetWidth;
    }

    setTimeout(() => {
      if (right && !this.rightDisabled()) {
        this.rightIcon.nativeElement.classList.remove('disabled');
      } else if (!right && !this.leftDisabled()) {
        this.leftIcon.nativeElement.classList.remove('disabled');
      }
    }, 600);
  }

  leftDisabled(): boolean {
    return this.row.nativeElement.scrollLeft === 0;
  }

  rightDisabled(): boolean {
    const element = this.row.nativeElement.lastElementChild.lastElementChild as HTMLElement;
    return element.offsetLeft <= this.row.nativeElement.scrollLeft + this.row.nativeElement.offsetWidth - 10;
  }

  positionScrollButtons() {
    this.leftIcon.nativeElement.firstChild.style.top = `${this.firstElement.offsetHeight / 2 - 28}px`;
    this.rightIcon.nativeElement.firstChild.style.top = `${this.firstElement.offsetHeight / 2 - 28}px`;
  }

}
