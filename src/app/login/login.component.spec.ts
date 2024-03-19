import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { AuthenticationService } from '../auth/services/authentication/authentication.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthenticationService;
  let router: Router;
  let spy: any;
  const authenticationServiceStub = {
    authenticate: () => of({}),
  };
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticationService);
    router = TestBed.inject(Router);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to home on successful login', () => {
    spy = spyOn(authService, 'authenticate').and.returnValue(
      of({ loggedin: '0' })
    );
    component.checkLogin();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should show error message on failed login', () => {
    spy = spyOn(authService, 'authenticate').and.returnValue(
      of(new Error('Invalid login'))
    );
    component.checkLogin();
    expect(component.invalidLogin).toBeTruthy();
    expect(component.message).toEqual('Invalid login');
  });

  afterEach(() => {
    fixture.destroy();
  });
});
