import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainContentComponent } from './components/main-content/main-content.component';
import { ScrollingContentComponent } from './components/scrolling-content/scrolling-content.component';
import { FeaturedComponent } from './pages/featured/featured.component';
import { MostRecentComponent } from './pages/most-recent/most-recent.component';
import { CommingSoonComponent } from './pages/comming-soon/comming-soon.component';
import { TopViewedComponent } from './pages/top-viewed/top-viewed.component';
import { AboutDEVComponent } from './components/support/about-dev/about-dev.component';
import { AboutUSComponent } from './components/support/about-us/about-us.component';
import { BaseComponent } from './components/base/base.component';
import { DummyComponent } from './components/dummy/dummy.component';
import { AdminComponent } from './components/admin/admin.component';
import { SearchComponent } from './components/search/search.component';
import { EdithomepageComponent } from './components/edithomepage/edithomepage.component';
import { EditscrollComponent } from './components/editscroll/editscroll.component';


const routes: Routes = [
  { path: 'home',  component: MainContentComponent },
  { path: 'cat1',  component: FeaturedComponent },
  { path: 'cat2', component: CommingSoonComponent},
  { path: 'cat3', component: TopViewedComponent},
  { path: 'cat4', component: MostRecentComponent},
  { path: 'aboutus', component: AboutUSComponent},
  { path: 'aboutus/:id', component: AboutUSComponent},
  { path: 'base', component: BaseComponent},
  { path: 'base/:id', component: BaseComponent},
  { path: 'aboutdevs', component: AboutDEVComponent},
  { path: 'add', component: DummyComponent},
  { path: 'editlogoandtitle', component: EdithomepageComponent},
  { path: 'editscroll', component: EditscrollComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'search', component: SearchComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
