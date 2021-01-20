import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainHeaderComponent } from './shared/main-header/main-header.component';

import { HttpClientModule } from '@angular/common/http';

import { DevExtremeModule } from 'devextreme-angular';
import { from } from 'rxjs';
import { ScrollingContentComponent } from './components/scrolling-content/scrolling-content.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { FooterComponent } from './shared/footer/footer.component';
import { FeaturedComponent } from './pages/featured/featured.component';
import { MostRecentComponent } from './pages/most-recent/most-recent.component';
import { CommingSoonComponent } from './pages/comming-soon/comming-soon.component';
import { TopViewedComponent } from './pages/top-viewed/top-viewed.component';
import { AboutUSComponent } from './components/support/about-us/about-us.component';
import { AboutDEVComponent } from './components/support/about-dev/about-dev.component';
import { FeedbackComponent } from './components/support/feedback/feedback.component';
import { DummyComponent } from './components/dummy/dummy.component';
import { BaseComponent } from './components/base/base.component';
import { SearchComponent } from './components/search/search.component';
import { EdithomepageComponent } from './components/edithomepage/edithomepage.component';
import { EditscrollComponent } from './components/editscroll/editscroll.component';
import { AdminComponent } from './components/admin/admin.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FirebaseDatabaseService } from './services/firebaseDatabaseService';
import { AuthServiceFirebase } from './services/authServiceFirebase'
import { FormsModule }   from '@angular/forms';
import { CategoriesDatabaseService } from './services/categoriesDatabaseService';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    ScrollingContentComponent,
    MainContentComponent,
    FooterComponent,
    FeaturedComponent,
    MostRecentComponent,
    CommingSoonComponent,
    TopViewedComponent,
    AboutUSComponent,
    AboutDEVComponent,
    FeedbackComponent,
    DummyComponent,
    BaseComponent,
    SearchComponent,
    EdithomepageComponent,
    EditscrollComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DevExtremeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    FormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    FirebaseDatabaseService,
    AngularFirestore,
    AuthServiceFirebase,
    CategoriesDatabaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
