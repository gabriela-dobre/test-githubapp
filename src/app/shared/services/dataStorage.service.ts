
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { UsersDTO } from '../models/UsersDTO';
import { UserDetailsDTO } from '../models/UserDetailsDTO';
import { ReposDTO } from '../models/ReposDTO';
import { RepoDetailsDTO } from '../models/RepoDetailsDTO';
import { EditRepoReq } from 'src/app/modules/repos/models/EditRepoReq';


@Injectable()
export class DataStorageService {
  apiURL = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "access-control-allow-headers,access-control-allow-origin,access-control-allow-methods,content-type"
    })
  };

  constructor(
    private http: HttpClient
  ) { }


  getUsersList(): Observable<UsersDTO[]> {
    return this.http.get<UsersDTO[]>(`${environment.apiUrl}/users?since=99`);
  }

  getUserDetails(userName: string): Observable<UserDetailsDTO> {
    return this.http.get<UserDetailsDTO>(`${environment.apiUrl}/users/${userName}`);
  }

  getReposList(): Observable<ReposDTO[]> {
    return this.http.get<ReposDTO[]>(`${environment.apiUrl}/repositories?since=364`);
  }

  getRepoDetails(owner: string, repoName: string): Observable<RepoDetailsDTO> {
    return this.http.get<RepoDetailsDTO>(`${environment.apiUrl}/repos/${owner}/${repoName}`);
  }

  editRepoDetails(owner: string, repoName: string, repoDetails: EditRepoReq): Observable<RepoDetailsDTO> {
    let body = { 
      "name": repoName,
      "description": repoDetails.description,
      "private": repoDetails.private
   };

   var config = {
    headers: { Accept: "application/json" }
  };

    return this.http.patch<RepoDetailsDTO>(`${environment.apiUrl}/repos/${owner}/${repoName}`, body, config);
    
  }

}

