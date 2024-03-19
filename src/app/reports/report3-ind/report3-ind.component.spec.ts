import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Report3IndComponent } from './report3-ind.component';

describe('Report3IndComponent', () => {
  let component: Report3IndComponent;
  let fixture: ComponentFixture<Report3IndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Report3IndComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Report3IndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
