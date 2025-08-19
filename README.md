# Project Documentation - Angular Project

Project Name: Angular-Project-Final-2025
# Description
- Purpose:  
  
The purpose of the application is to enable users to share stories and ideas on topics, including Travel, Lifestyle, Technology, Culture and Food. Users can also explore and listen to podcasts on these topics.
- Audience:  
  
Users of all age, who eager to learn from the stories of the community members.

- Features included:  
  
Authentication (Login / Register / Logout)  
__Authenticated users__ can: (Create posts / Edit own Posts / Delete own Posts / Create comments on posts / Like Posts (except own posts) / Like Post Comments (except own post comment) / View Profile card / Edit Profile card / Access Podcasts page )  
__Guest users__ can: ( Login / Register / Access Posts page / Access Post details page / View Post comments / Access Podcasts page)

# Project structure:

src / app  
-  /core: error-msg component / footer component / header component /
-  /directives: custom email directive
-  /environment: environment variable (used to store API endpoint)
-  /error: error component (used  to display 404 page
-  /guards: authentication guard (use CanActivateFn that checks whether the current user has permissions to activate the requested route)
-  /home: home component
-  /main: main component
-  /podcasts: podcast component
-  /posts: create-post component / post-details component / posts component
-  /types: each .ts file exports an interface. Interfaces are: Comment / Podcast / Post / ProfileDetails / UserForAuth
-  /user: login component / profile component / register component / user.service.ts (holds methods which perform http requests to /users endpoint, manages user authentication state by using Behavior Subject and localStorage to store user data)
-  /utils: /email validator, implements ValidatorFn (A function that receives a control (email control input) and synchronously returns a map of validation errors if present, otherwise null.) / match passwords validator,implements ValidatorFn (A function that receives a control (password and re-password control input) and synchronously returns a map of validation errors if present, otherwise null.)
-  /api.service.ts: holds method which manage CRUD operations
-  /app.config.ts: imported provideHttpClient() in the providers array in order to configure Angular's HttpClient service to be available for injection. Passed feature functions withFetch() and withInterceptors([appInterceptor])
- /app.interceptor.ts: configured an interceptor for HTTP requests made via HttpClient.
- /app.routes.ts: add route configuration for the Router service
- /constants.ts: declare and export a constant DOMAINS
- /index.html: include Bootstrap CSS framework via content delivery network / load Bootstrap's JavaScript Bundle from a CDN / load Font Awesome icon library using CDN link
- /package.json: installed dependencies: bootstrap / express / rxjs / tslib / zone.js

# Getting Started

Project set up:
- Install dependencies: `npm install` / `npm i bootstrap` / `npm i express` / `npm i rxjs` / `npm install tslib` / `npm i zone.js`
- Start application by navigating to root folder `angular-final-project` and execute the cmdlet in the terminal `ng serve`
- Start server by executing cmdlet `node index.js`

# Usage
Authentication:  
- __User login__
  click on Login button on the top-right navigation bar, enter email address and password, click Sign in  

- __User register__
  click on Sign-up button on the top right navigation bar, enter the following credentials:   
   
__Username__    
__Email address__  
__Phone number__  
__Position__    
__Date of Birth__    
__City__  
__Country__  
__Password__  
__Re-Password__  
  
Click on Register button 

- __User Logout__  
  
Authenticated users can perform logout by clicking on the __Logout__ button on the top-right navigation bar. After the user logs-out user credentials are deleted from localStorage and auth Cookie is also deleted.

# Navigation

- __Home page__: Main application page. Shows users the Website title and introductory description. The page also visualizes __Login__ and __Register__ buttons, which when clicked on, navigate the user to __Login__ and __Register__ pages.

- __Posts__: Shows the user all posts created by website members. Each posts includes a __Details__ button, which navigates the user to the Details page of the particular post. Each post has a __theme__, __Heading__, __Date of creation__, __Description__, __Image__, __Detais button__

- 



