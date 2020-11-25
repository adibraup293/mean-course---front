import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './TestCenterManager/auth/auth-interceptor';

import { TesterHomeComponent } from "./tester/tester-home/tester-home.component";
import { EnterTestIDComponent} from "./tester/enter-test-id/enter-test-id.component";
import { UpdateTestResultComponent } from "./tester/update-test-result/update-test-result.component";
import { SelectPatientComponent } from "./tester/select-patient/select-patient.component";
import { RecordTestExistingComponent } from "./tester/record-new-test/existing-patient/record-test-existing.component";
import { RecordTestNewComponent } from "./tester/record-new-test/new-patient/record-test-new.component";
import { LoginComponent } from "./login/login.component";
import { PatientHomeComponent } from "./patient/patient-home/patient-home.component";
import { ViewTestingHistoryComponent} from "./patient/view-testing-history/view-testing-history.component"
import { ManagerHomeComponent} from "./TestCenterManager/manager-home.component";
import { ManagerCreateTestCenterComponent} from "./TestCenterManager/TestCenterProfile/test-center-profile.component";
import { ManagerRecordTestOfficerComponent} from "./TestCenterManager/RecordTestOfficer/record-officer.component";
import { ManageKitHomeComponent} from "./TestCenterManager/ManageTestKit/manage-kit-home.component";
import { RegisterKitComponent} from "./TestCenterManager/ManageTestKit/RegisterNewKit/register-kit.component";
import { UpdateTestKitComponent} from "./TestCenterManager/ManageTestKit/UpdateTestKit/update-kit.component";
import { GenerateTestReportOfficerComponent} from "./TestCenterManager/GenerateTestReport/generate-test-report.component";
import { GenerateTestReportTesterComponent} from "./tester/generate-test-report/generate-test-report-tester.component";

import { AppComponent } from './app.component';
import { HeaderComponent } from "./header/header.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from "@angular/material/card";
import { RouterModule, Routes } from "@angular/router";
//import { AppRoutingModule } from './app-routing.module';

 const appRoutes:Routes = [
   {path: 'login', component: LoginComponent},
   {path: 'tester-home', component: TesterHomeComponent},
   {path: 'enter-test-id', component: EnterTestIDComponent},
   {path: 'update-test-result', component: UpdateTestResultComponent},
   {path: 'select-patient', component: SelectPatientComponent},
   {path: 'record-test-existing', component: RecordTestExistingComponent},
   {path: 'record-test-new', component: RecordTestNewComponent},
   {path: 'patient-home', component: PatientHomeComponent},
   {path: 'view-testing-history', component: ViewTestingHistoryComponent},
   {path: 'manager-home', component: ManagerHomeComponent},
   {path: 'create-test-center', component: ManagerCreateTestCenterComponent},
   {path: 'record-test-officer', component: ManagerRecordTestOfficerComponent},
   {path: 'manage-kit', component: ManageKitHomeComponent},
   {path: 'register-kit', component: RegisterKitComponent},
   {path: 'edit/:testKitId', component: RegisterKitComponent},
   {path: 'update-kit', component: UpdateTestKitComponent},
   {path: 'generate-report', component: GenerateTestReportOfficerComponent},
   {path: 'generate-report-tester', component: GenerateTestReportTesterComponent}

 ];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    TesterHomeComponent,
    EnterTestIDComponent,
    UpdateTestResultComponent,
    SelectPatientComponent,
    RecordTestExistingComponent,
    RecordTestNewComponent,
    PatientHomeComponent,
    ViewTestingHistoryComponent,
    ManagerHomeComponent,
    ManagerCreateTestCenterComponent,
    ManagerRecordTestOfficerComponent,
    ManageKitHomeComponent,
    RegisterKitComponent,
    UpdateTestKitComponent,
    GenerateTestReportOfficerComponent,
    GenerateTestReportTesterComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
