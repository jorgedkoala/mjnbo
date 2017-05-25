import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { RouterModule }   from '@angular/router';

//*********TRANSLATE */
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http);
}

//*********MATERIAL DESIGN */
import {MdTabsModule,MdCardModule,MdSelectModule ,MdButtonModule,MdInputModule, MdToolbarModule} from '@angular/material';

//*********PRIMENG MODULES */
import {ToolbarModule} from 'primeng/primeng';
import {TabViewModule} from 'primeng/primeng';
import {ScheduleModule} from 'primeng/primeng';
import {ChartModule} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';
import {DataTableModule,SharedModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';

//**********REQUIRED FOR CALENDAR */
import {MomentModule} from 'angular2-moment';

//*********MY COMPONENTS */
import { AppComponent } from './app.component';
import { CalendarioComponent } from './calendar/calendar.component';
import { GraficosComponent } from './graficos/graficos.component';

//*********MY SERVICES */
import { ApiService } from './services/api.service';
import { GlobalsService } from './services/globals.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarioComponent,
    GraficosComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
//*****ROUTER */
    RouterModule.forRoot([
    //   {
    //     path: 'login',
    //     component: LoginComponent
    //   }
    ]),
//*****TRANSLATE */
    TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        }),
//*****MATERIAL DESIGN */  
    MdTabsModule,
    MdCardModule,
    MdToolbarModule,
    MdInputModule,
    MdButtonModule,
    MdSelectModule,
//*****PRIMENG         */
    ToolbarModule,
    TabViewModule,
    ScheduleModule,
    MomentModule,
    ChartModule,
    GrowlModule,
    DataTableModule,
    SharedModule,
    CalendarModule

  ],
  providers: [
    ApiService,
    GlobalsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
