
 | Microservices vs Monolith - How to Build a Project


 ->Started building a project Dev tinder->Site which allows developers to connect with each other.

 ->Learnt about SDLC that is being followed before building projects.

 ->Learnt the diffrence between monolith and microservice Architectures.

 ->I will be following microservice architecture to build dev tinder.

 Creating our Express Server

 ->Started with backend for the Devtinder Project
 ->created a server using express Js.
 ->Designed databse schema.
 ->Wrote request handlers 
 
 | Routing and Request Handlers

  ->Order of routes is Very important
  ->Explored Http methods 
  ->Installed postman made a workspace /collection and made test api call.
  ->app.use will method all api methods wether its get post or another.

  ->Explored Dynamic routing 


 | Middlewares & Error Handlers 

  ->Multiple Route handler for one route 
  ->Use of next() function and how once one res is sent other cant be sent.

  ->When ever we make an api call it goes to a middleware chain  and finally it goes to res handler which finally send a response which actually sent a data back.

  ->Learnt why and when we use app.use in case of middleware .

  ->Learnt error handling using wildcard express error handeling

   | Database, Schema & Models | Mongoose

  ->Using npm library moongose
  ->Created userSchema.
  ->Created /signup api to add data to database
  

  
steps for(connecting to database)

->Create a free cluster on MongoDb official website

-Install mongoose Lib
-Connect Your applicatio  to the database "Conection-url:/DevTinder
-Call the connectDB function and connect to db before starting your application 
->Created UserSchema using mongoose
->Create signup api and pushed some data to database
->Error handling
 
 | Diving into the APIs

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


  Data Sanitization & Schema Validations

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
 | Diving into the APIs and express Router

->Explored Api List.
->Create A list of all api required for dev tinder
->Group Multiple Routed under respective route.
explore and read  documentation for express router
-create Route Folder for managing  auth ,profile,request routers
->Create Auth Route,Profile Router and Request router
->Import these router in app.js
->Create POST /lOGOUT Api
->Create PATCH /Profile /edit
->Create Patch/Profile/password
->Test all api
->Make Sure You validate all data in post patch req


 Logical DB Query & Compound Indexes

->Create a connection req schema
->Send connection req api
->Proper validation of data
->Think about all corner cases
->$ or query and $ and query
->Schema.pre("save") function
->Read more about indexes in Mongo Db
->Why do we need Indexes in DB
->What is the advantage and disadvantages of creating index?
->What are the disadvantage of creating a lot of indexes
->Read article about compound index 

#  ref, Populate & Thought process of writing APIs

->Write code with proper validations for POST /request/review/:status/:requestId

->Thought process->POST VS GET

->Read about ref and populate
->Create GET /user /request/revieved with all the checks
->Create GET API  user/connections (or query)

 |Building Feed API & Pagination

->Logic for GET/Feed API
->Explore the $nin,$and,$ne and other query operator
-> /feed?page=1&limit=10=>1-10
/feed?page=2&limit=10=>11-20
/feed?page=3&limit=10=>21-30

.skip() & .limit()
