import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

const baseUrl1 = 'https://landapi.aocxy.com/landdigitdata/add';
const baseUrl2 = 'https://landapi.aocxy.com/landdigitdata/get';
const baseUrl3 = 'https://landapi.aocxy.com/landdigitdata/edit';
const baseUrl4 = 'https://landapi.aocxy.com/landdigitdata/delete';
const baseUrl5 = 'https://landapi.aocxy.com/api/ForgetPassword';
const baseUrl6 = 'https://landapi.aocxy.com/api/changepassword';
const baseUrl7 = 'https://landapi.aocxy.com/landdigitdata/report1';
const baseUrl8 = 'https://landapi.aocxy.com/getfile';
const baseUrl9 = 'https://landapi.aocxy.com/update';
const baseUrl10 = 'https://landapi.aocxy.com/merge';



@Injectable({
  providedIn: 'root'
})


export class LanddataService {

  constructor(private http: HttpClient) { }


  getDataforDivcircity(): Observable<any> {
    const types = sessionStorage.getItem('type')!;
    const values = sessionStorage.getItem('value')!;
    return this.http.post(`https://landapi.aocxy.com/GetData`, { types: types, values: values })
      .pipe();
  }

  getCountDataforDivcircity(): Observable<any> {
    const types = sessionStorage.getItem('type')!;
    const values = sessionStorage.getItem('value')!;
    return this.http.get(`https://landapi.aocxy.com/GetDataCount`, { params: { types: types, values: values } })
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
    return this.http.post<any>('https://landapi.aocxy.com/api/VerifyOtp', { username, otp }).pipe(
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


