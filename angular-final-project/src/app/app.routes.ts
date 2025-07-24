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

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent },
    { path: 'posts', component: PostsComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'create', component: CreatePostComponent },
    { path: '404', component: ErrorComponent },
    { path: '**', redirectTo: '/404'}
];
