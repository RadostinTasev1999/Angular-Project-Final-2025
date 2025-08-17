import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { PostsComponent } from './posts/posts/posts.component';
import { ProfileComponent } from './user/profile/profile.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './guards/auth.guard';
import { MainComponent } from './main/main.component';
import { PostDetailsComponent } from './posts/post-details/post-details.component';
import { ErrorMsgComponent } from './core/error-msg/error-msg.component';
import { PodcastsComponent } from './podcasts/podcasts.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent },
    // Posts routing:
    { path: 'posts', children: [
    { path: '', component: MainComponent},
    { path: ':postId', component: PostDetailsComponent}
    ]
   },
    { 
      path: 'profile',
      loadComponent: () => import('../app/user/profile/profile.component').then(c => c.ProfileComponent),
      canActivate:[AuthGuard]
    },
    { path: 'create',
      component: CreatePostComponent,
      canActivate: [AuthGuard]
    },
    { 
      path: 'podcasts',
      loadComponent: () => import('./podcasts/podcasts.component').then(c => c.PodcastsComponent)
    },
    { path: 'error', component: ErrorMsgComponent},
    { path: '404', component: ErrorComponent },
    { path: '**', redirectTo: '/404'}
];
