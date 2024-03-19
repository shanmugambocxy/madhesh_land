import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditlandComponent } from './editland.component';

describe('EditlandComponent', () => {
  let component: EditlandComponent;
  let fixture: ComponentFixture<EditlandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditlandComponent ],
      imports: [ HttpClientModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditlandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
