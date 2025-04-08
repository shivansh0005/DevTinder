# DevTinder API

#  authRouter
->Post /signup
->POST /Login
->POST  / logout


# ProFile router
->GET/PROFILE /View
->PATCH /PROFILE/edit
->PATCH/profile/password


# Connectionreqrouter
->Post /request/send/intrested/:userId
->Post /request/send/ignored/:uSERiD
->POST /request/review/accepted/:requestId
>POST /request/review/REJECTED/RequestId

# UserRouter
->GET /User/Connection 
->GET  /User/request
->GET /feed->Gets you the profile of other user on the platform

Status :ignore,intrested,accept,reject
