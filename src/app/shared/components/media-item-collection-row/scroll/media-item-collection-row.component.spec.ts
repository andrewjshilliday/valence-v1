import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaItemCollectionRowComponent } from './media-item-collection-row.component';

describe('MediaItemCollectionRowComponent', () => {
  let component: MediaItemCollectionRowComponent;
  let fixture: ComponentFixture<MediaItemCollectionRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaItemCollectionRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaItemCollectionRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
