import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Report2LPComponent } from './report2-lp.component';

describe('Report2LPComponent', () => {
  let component: Report2LPComponent;
  let fixture: ComponentFixture<Report2LPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Report2LPComponent ],
      imports: [ HttpClientModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Report2LPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
