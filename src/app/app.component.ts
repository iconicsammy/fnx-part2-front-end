import { Component, OnInit } from "@angular/core";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TaskService } from "./services/task.service";
import { HttpErrorResponse } from "@angular/common/http";
@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
    message = "";
    stage = "login"; // which screen do we want to show?
    addEditState = "add"; //lets assume by default the form is meant to add
    permissions = [];
    loginForm: FormGroup;
    taskForm: FormGroup;

    editTaskIndex = -1; //during editing, this is the index of the task in tasks we want to edit

    tasks = [];

    canDo = {
        can_add_task: false,
        can_change_task: false,
        can_delete_task: false,
        can_extra_can_read_task: false
    };

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private taskService: TaskService
    ) {
        this.loginForm = this.formBuilder.group({
            email: ["", [Validators.required]],
            password: ["", [Validators.required]]
        });

        this.taskForm = this.formBuilder.group({
            name: ["", [Validators.required]]
        });
    }

    friendlyUserPermissions() {
        /*
        Based on permission of the user, build the menus now
        */
        this.permissions.forEach(permission => {
            this.canDo["can_" + permission] = true;
        });
    }
    trackByTaskId(index, task) {
        return task.id;
    }
    handleViewTasks(event = null) {
        /*
        view tasks registered in the system. We can add permission check here if necessary
        tho back end handles it
        */
        if (event != null) {
            event.preventDefault();
        }

        this.tasks = [];
        this.addEditState = "add";
        this.message = "";
        this.taskService.viewTasks().subscribe(
            data => {
                this.tasks = data["tasks"];
            },
            (err: HttpErrorResponse) => {
                this.message = "error getting tasks";
                console.log(err);
            }
        );
    }

    handleReadTask(event) {
        event.preventDefault();

        alert("you are allowed to read the task");
    }

    handleLogin(post) {
        this.message = "";
        this.taskService.login(post.email, post.password).subscribe(
            data => {
                const user_info = data["detail"];

                const expires = new Date(user_info["expires"]);

                this.permissions = data["rights"];
                console.log(user_info, " user info");

                document.cookie =
                    "ane=" +
                    (user_info["access_token"] || "") +
                    ";expires=" +
                    expires +
                    "; path=/";
                localStorage.setItem("fn", user_info["first_name"]);
                localStorage.setItem("ln", user_info["display_name"]);
                this.stage = "loggedin";
                this.handleViewTasks();
                this.friendlyUserPermissions();
            },
            (err: HttpErrorResponse) => {
                this.message = "Error logging you in...";
                console.log(err);
            }
        );
    }

    handleEditTask(event, task_index) {
        /*
        Which task do we want to edit?
        */
        event.preventDefault();
        this.addEditState = "edit";
        this.editTaskIndex = task_index;
        // get the name first
        this.taskForm.controls["name"].setValue(this.tasks[task_index]["name"]);
    }

    handleCancelEdit() {
        this.addEditState = "add";
        this.editTaskIndex = -1;
    }

    handleTaskForm(post) {
        /*
        Add or edit a task based on condition
        */
        this.message = "";
        if (this.addEditState == "add") {
            this.taskService.newTask(post.name).subscribe(
                data => {
                    this.message = data["message"];
                    this.tasks.push({
                        name: post.name,
                        id: data["task_id"]
                    });
                },
                (err: HttpErrorResponse) => {
                    this.message = "Error adding the task";
                    console.log(err);
                }
            );
        } else {
            this.taskService
                .editTask(post.name, this.tasks[this.editTaskIndex]["id"])
                .subscribe(
                    data => {
                        this.message = data["message"];
                        this.tasks[this.editTaskIndex]["name"] = post.name;
                    },
                    (err: HttpErrorResponse) => {
                        this.message = "Error editing the task";
                        console.log(err);
                    }
                );
        }
    }

    handleDeleteTask(event, task_id, task_index) {
        this.message = "";
        this.addEditState = "add";
        event.preventDefault();
        this.taskService.deleteTask(task_id).subscribe(
            data => {
                this.message = data["message"];
                this.tasks.splice(task_index, 1);
            },
            (err: HttpErrorResponse) => {
                this.message = "Error deleting the post";
                console.log(err);
            }
        );
    }

    ngOnInit() {}
}
