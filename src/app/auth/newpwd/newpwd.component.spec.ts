import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewpwdComponent } from './newpwd.component';

describe('NewpwdComponent', () => {
  let component: NewpwdComponent;
  let fixture: ComponentFixture<NewpwdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewpwdComponent ],
      imports: [ HttpClientModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewpwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
