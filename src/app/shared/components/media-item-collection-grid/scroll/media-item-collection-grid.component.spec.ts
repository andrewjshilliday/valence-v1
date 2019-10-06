import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaItemCollectionGridComponent } from './media-item-collection-grid.component';

describe('MediaItemCollectionGridComponent', () => {
  let component: MediaItemCollectionGridComponent;
  let fixture: ComponentFixture<MediaItemCollectionGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaItemCollectionGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaItemCollectionGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
