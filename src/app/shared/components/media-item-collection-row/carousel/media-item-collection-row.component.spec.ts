import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaItemCollectionRowCarouselComponent } from './media-item-collection-row.component';

describe('MediaItemCollectionRowCarouselComponent', () => {
  let component: MediaItemCollectionRowCarouselComponent;
  let fixture: ComponentFixture<MediaItemCollectionRowCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaItemCollectionRowCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaItemCollectionRowCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
