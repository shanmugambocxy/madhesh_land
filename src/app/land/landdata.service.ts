import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

const baseUrl1 = 'http://localhost:5000/landdigitdata/add';
const baseUrl2 = 'http://localhost:5000/landdigitdata/get';
const baseUrl3 = 'http://localhost:5000/landdigitdata/edit';
const baseUrl4 = 'http://localhost:5000/landdigitdata/delete';
const baseUrl5 = 'http://localhost:5000/api/ForgetPassword';
const baseUrl6 = 'http://localhost:5000/api/changepassword';
const baseUrl7 = 'http://localhost:5000/landdigitdata/report1';
const baseUrl8 = 'http://localhost:5000/getfile';
const baseUrl9 = 'http://localhost:5000/update';
const baseUrl10 = 'http://localhost:5000/merge';



@Injectable({
  providedIn: 'root'
})


export class LanddataService {

  constructor(private http: HttpClient) { }


  getDataforDivcircity(): Observable<any> {
    const types = sessionStorage.getItem('type')!;
    const values = sessionStorage.getItem('value')!;
    return this.http.post(`http://localhost:5000/GetData`, { types: types, values: values })
      .pipe();
  }

  getCountDataforDivcircity(): Observable<any> {
    const types = sessionStorage.getItem('type')!;
    const values = sessionStorage.getItem('value')!;
    return this.http.get(`http://localhost:5000/GetDataCount`, { params: { types: types, values: values } })
      .pipe();
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl1, data);
  }

  getdatabyid(id: any): Observable<any> {
    return this.http.get(`${baseUrl2}/${id}`);
  }

  updatebyid(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl3}/${id}`, data);
  }

  deletebyid(id: any): Observable<any> {
    return this.http.delete(`${baseUrl4}/${id}`);
  }

  createotp(data: any): Observable<any> {
    sessionStorage.setItem("usernamedata", data.username);
    return this.http.post(baseUrl5, data);
  }

  verifyotp(username: any, otp: any) {
    return this.http.post<any>('http://localhost:5000/api/VerifyOtp', { username, otp }).pipe(
      map(otpData => {
        sessionStorage.setItem('otpvalue', otp);
        return otpData;
      })
    );
  }

  updatepwd(data: any): Observable<any> {
    return this.http.put(`${baseUrl6}`, data);
  }

  getdataforreport1(): Observable<any> {
    return this.http.get(baseUrl7);
  }

  getfilebyname(filename: any): Observable<any> {
    return this.http.get(`${baseUrl8}/${filename}`);
  }

  updatefilebyname(filename: any, file: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, filename);
    return this.http.put(`${baseUrl9}/${filename}`, formData);
  }

  mergefilebyname(filename: any, file: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, filename);
    return this.http.put(`${baseUrl10}/${filename}`, formData);
  }

}


