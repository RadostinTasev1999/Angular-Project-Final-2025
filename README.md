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
-  /user: login component / profile component / register component / user.service.ts (holds methods which perform http requests to /users endpoint manages user authentication state by using Behavior Subject and localStorage to store user data)
