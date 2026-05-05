Setup

Run npm install in express-backend directory
Run node server.js

Run npm install in react-frontend-client directory
Run npm run dev

NO URL

Reflection

I chose to use React and express together as it made the most sense to me. Having the client side and server side seperated seemed like the best way to go about it for me. Within the backend, I set my routes up by using models, controllers and route files. Within my database, I have a table for users, notesets(studysets) and notes. Notes are dependent on notesets, and notesets on users. One of my biggest challenges was updating my project for user authentication, as this completely broke my schema and how the server went about finding the data. Another big challenge was styling the website, I went through a lot of forumns and videos on website formatting to get a user friendly vibe. Overall, I learned a lot about how React communicates with the Server all while keeping track of data from a database. I wanted to add testing features like matching or multiple choice, I thought about changing the id for the studysets and notes just because they're serialized and will just show up as a number which is easy for other people to possible access other user's data. 
