import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addlandver2Component } from './addlandver2.component';

describe('Addlandver2Component', () => {
  let component: Addlandver2Component;
  let fixture: ComponentFixture<Addlandver2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Addlandver2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addlandver2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
