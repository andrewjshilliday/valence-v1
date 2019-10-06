import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaItemCollectionGridCarouselComponent } from './media-item-collection-grid.component';

describe('MediaItemCollectionGridCarouselComponent', () => {
  let component: MediaItemCollectionGridCarouselComponent;
  let fixture: ComponentFixture<MediaItemCollectionGridCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaItemCollectionGridCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaItemCollectionGridCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
