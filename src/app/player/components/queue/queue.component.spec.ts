import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThemeService } from '../../../shared/themes/theme.service';
import { THEMES, ACTIVE_THEME } from '../../../shared/themes/symbols';
import { QueueComponent } from './queue.component';

describe('QueueComponent', () => {
  let component: QueueComponent;
  let fixture: ComponentFixture<QueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ QueueComponent ],
      providers: [
        { provide: MatSnackBar, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: ThemeService, useClass: ThemeService },
        // tslint:disable-next-line: no-use-before-declare
        { provide: THEMES, useValue: [{'name': 'light'}, {'name': 'dark'}] },
        { provide: ACTIVE_THEME, useValue: 'dark' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /* it('should create', () => {
    expect(component).toBeTruthy();
  }); */
});
