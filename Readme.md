
 # Episode-01 | Microservices vs Monolith - How to Build a Project


 ->Started building a project Dev tinder->Site which allows developers to connect with each other.

 ->Learnt about SDLC that is being followed before building projects.

 ->Learnt the diffrence between monolith and microservice Architectures.

 ->I will be following microservice architecture to build dev tinder.


 # Episode 3  Creating our Express Server

 ->Started with backend for the Devtinder Project
 ->created a server using express Js.
 ->Designed databse schema.
 ->Wrote request handlers 
 
  # Episode-04 | Routing and Request Handlers

  ->Order of routes is Very important
  ->Explored Http methods 
  ->Installed postman made a workspace /collection and made test api call.
  ->app.use will method all api methods wether its get post or another.

  ->Explored Dynamic routing 


  #  Episode-05 | Middlewares & Error Handlers 

  ->Multiple Route handler for one route 
  ->Use of next() function and how once one res is sent other cant be sent.

  ->When ever we make an api call it goes to a middleware chain  and finally it goes to res handler which finally send a response which actually sent a data back.

  ->Learnt why and when we use app.use in case of middleware .

  ->Learnt error handling using wildcard express error handeling

  # Episode-06 | Database, Schema & Models | Mongoose

  ->Using npm library moongose
  ->Created userSchema.
  ->Created /signup api to add data to database
  

  
steps for episode 5(connecting to database)

->Create a free cluster on MongoDb official website

-Install mongoose Lib
-Connect Your applicatio  to the database "Conection-url:/DevTinder
-Call the connectDB function and connect to db before starting your application 
->Created UserSchema using mongoose
->Create signup api and pushed some data to database
->Error handling
 
 # Episode-07 | Diving into the APIs

 ->Diffrence between js and json obj.
 Added the express.json middle ware
 ->Made signup api dynamic to recieve  Api from end user.
 ->User.findone with duplicate email id fetched which user first 

 ->API-GET user by email
 ->API-FEED API -GET/FED-get all the users from the database
 ->Create  an APi using find by id its is a hw
 ->Create an api inorder to delete the user findbyidanddel
 ->Diff between patch and put
 ->API->UPDATE THE USER
 ->Explore mongoose Documentation for Model operations
 ->What are the options in Model.findOneAndUpdate,explore more
 ->API-UPDATE with email id


 # Episode 8 -> Data Sanitization & Schema Validations

 ->Learnt about unique,required  &Default feilds.
 ->Learnt about runValidators:true in patch api
 ->Timestamps in user schema for timestamps in database
 -> DATA SANITIZATION->API level validation on PATCH AND SIGNUP post API
 ->Used npm validator package for validation email at schema level.
 ->Created a custom validators.

 # Encrypting Passwords

 ->Created a validation function for signup api
 ->Install bcrypt package
 ->Create passwordHash using bcrypt.hash &save the user using encrypted pass

 ->Created a Login api and validated the User.

  # Episode-10 | Authentication, JWT & Cookies

  ->When ever we login into any website server sends JWT Toekn inside cookies back as a response ...when ever any furthur request is made cookies and token are validated before  that req is executed.

-->npm i  cookie-parser 
-->Just send Dummy cooie to User

--->create GTE/Profile API and check if you get the cookie back

->install jsonwebtoken
  ->IN login api after email and passowrd validation create a jwt token and send it back to user 

  ->read the cookies inside your profile Api and find the logged in user 

  ->Add the userAuth middleware in profile api and a new connectionapi req
  ->Set the expiry of jwt token and cookies to 7 days 

  ->create userSchema methods to getJWT()
  ->Create UserSchema method to comparepassword(password)
