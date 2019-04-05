import { CommonModule } from "@angular/common";
import {
    HttpClient,
    HttpClientModule,
    HTTP_INTERCEPTORS
} from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { InterceptAPICalls } from "./shared/httpinterceptor";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TaskService } from "./services/task.service";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        NgbModule.forRoot(),
        BrowserAnimationsModule,

        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,

        AppRoutingModule
    ],
    declarations: [AppComponent],
    providers: [
        TaskService,

        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptAPICalls,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
