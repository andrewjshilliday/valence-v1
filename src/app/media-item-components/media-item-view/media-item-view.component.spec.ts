import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaItemViewComponent } from './media-item-view.component';

describe('MediaItemViewComponent', () => {
  let component: MediaItemViewComponent;
  let fixture: ComponentFixture<MediaItemViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaItemViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaItemViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
