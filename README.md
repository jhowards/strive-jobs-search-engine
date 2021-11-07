# Brief

### Jobs Search Engine

You are in charge of building a "Search Engine" for Job Posting.

The application should have a search page where the user can set the position (or tech) and the location.

 

*START FROM PREVIOUS WORK*

Refactor the project using some new techniques: Redux Hooks and redux-persist!

- Track down the functional components in your application and replace their connect function with useSelector and useDispatch.

- Install the redux-persist package from npm (npm i redux-persist) and add it to your project. The goal is to make your redux store survive a browser refresh.

Try to use the session storage of your browser as its engine.
 

[EXTRA]

- For some extra practise, transform some class components in your project into functional ones and apply useSelector and useDispatch to keep their functionalities.

- encrypt your session storage keys with AES using redux-persist-transform-encrypt, keep the key into a .env file
