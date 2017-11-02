# Messages

## Running the program

  * if you do not have the Angular CLI installed, run `npm install -g @angular/cli`

after cloning the repository
  * cd `messages`
  * run `npm install`
  * run `ng serve`
  * navigate to `http://localhost:4200/`
  
The app will automatically reload if you change any of the source files.

## An overview of design decisions

Services
  * Companies Service 
    - loads and providers an observable array of the companies
  * Companies Service 
    - loads and providers an observable array of the guests
    
Message class
  * parses strings for templates
  * validates that the template exists
  * replaces templates in string
  * message accepts an object of templates and values, this list can dynamically expand
  
Company and Guest Class
  * methods to return data fields ready to parse as placeholders

App Component 
 * Form:
    * Companies
    * Guests
    * message field
    * option to add custom placeholders
  
 * Form Validation
    * validates using the Message Class that the placeholders exists
    * validates that a company and guest are selected
 
 * Messages
    * displays error messages and invalid placeholders
    * displays the successfully sent message
    

## What language you picked and why
  * I chose the just released version of Angular (Angular 5), because I am familiar the technology, and the Angular CLI all allows for spinning up a basic project quickly.
  
## Your process for verifying the correctness of you program
  * while coding, I add assertions to methods to check that values are being passed correctly.
  * I declare all types in TypeScript, so that it is always clear what type in information is being passed around.
  * While coding, I also rely on the chrome debugger to step through issues.
  
## What didn't you get to, or what else might you do with more time?

  This was a really enjoyable project to work on.
  
  In the future: 
    * save messages associated to a user, so that they could be recalled
    * allow a user to send a message
    * update the form validation to user Angular's built in form (it can do some really amazing things)
     and integrate that with the currently dynamically generated form
    * save a user's custom placeholders
    * show a list of the user's currently available placeholders
        
  Where this application will currently fail:
    * It does not check for capitalization at the beginning of sentences, if a placeholder is capitalized in the middle of a sentence it will not lowercase the word.
    * it currently does not parse for unclosed brackets, it will print an unclosed bracket;
    * It does not check for nested brackets.
    * greetings cannot be overridden, if the user decided to add a custom greeting through the add custom placeholder, it will not override


  Things I want to change:
    * I'm sure there's a smoother way of handling replacing strings in a message
    * I'm not entirely fond of where greeting is handled, I would find a better place to check for placeholders that can change for various reasons.
    * I'm a little nervous about scaling string parsing/validation, I'm sure there's a better way to do it
