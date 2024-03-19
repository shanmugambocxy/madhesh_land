import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Report1LAComponent } from './report1-la.component';

describe('Report1LAComponent', () => {
  let component: Report1LAComponent;
  let fixture: ComponentFixture<Report1LAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Report1LAComponent ],
      imports: [ HttpClientModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Report1LAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
