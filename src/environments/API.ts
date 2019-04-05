
import { environment } from './environment';

const apiURL: string = environment.backend_url; // this is backend

const apiFrontEndURL: string = environment.frontend_url; // refers to the main address users will actually tipe (front end.)

export const APIS = {
    
        login: apiURL + 'tasks/login/',
        new_task: apiURL + 'tasks/new-task/',
        tasks: apiURL + 'tasks/view-tasks/',
        delete_task: apiURL + 'tasks/delete-task/',
        edit_task: apiURL + 'tasks/edit-task/',
        view_task: apiURL + 'tasks/view-task/'
 
};
