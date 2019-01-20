import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaItemCollectionListComponent } from './media-item-collection-list.component';

describe('MediaItemCollectionListComponent', () => {
  let component: MediaItemCollectionListComponent;
  let fixture: ComponentFixture<MediaItemCollectionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaItemCollectionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaItemCollectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
