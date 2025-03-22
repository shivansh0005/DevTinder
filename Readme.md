
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

  ->When ever we make an api call it goes to a middleware chain  and finally i goes to res handler which finally send a response which actually sent a data back.

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
 