import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewlandComponent } from './viewland.component';

describe('ViewlandComponent', () => {
  let component: ViewlandComponent;
  let fixture: ComponentFixture<ViewlandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewlandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewlandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
