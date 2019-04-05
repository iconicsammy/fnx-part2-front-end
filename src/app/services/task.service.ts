import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { catchError } from "rxjs/operators";
import { APIS } from "../../environments/API";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class TaskService {
    constructor(private http: HttpClient) {}

    viewTasks(): Observable<any[]> {
        /*
        get tasks that exist in teh system
  
        */

        return this.http.get<any[]>(APIS.tasks, {
            responseType: "json"
        });
    }

    login(email: string, password: string): Observable<any> {
        /*
  	Send login request to the backend API
	
	@input: email and password

	@output: success or failure

  	*/

        //data post
        let send_data = {
            email: email,
            password: password,
            client_id: environment.client_id,
            client_secret: environment.client_secret,
            grant_type: "password"
        };

        return this.http.post<any[]>(APIS.login, send_data, {
            responseType: "json"
        });
    }

    newTask(name: string): Observable<any> {
        //data post
        let send_data = {
            name: name
        };

        return this.http.post<any[]>(APIS.new_task, send_data, {
            responseType: "json"
        });
    }

    editTask(name: string, task_id): Observable<any> {
        //data post
        let send_data = {
            name: name,
            task_id: task_id
        };

        return this.http.put<any[]>(APIS.edit_task, send_data, {
            responseType: "json"
        });
    }

    deleteTask(task_id): Observable<any> {
        //data post
        let send_data = {
            id: task_id
        };

        return this.http.delete<any[]>(APIS.delete_task + task_id + "/", {
            responseType: "json"
        });
    }
}
