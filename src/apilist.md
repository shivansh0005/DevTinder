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
->Post /request/send/status/:userId
->POST /request/review/:status/:requestId



# UserRouter
->GET  /user/request
->GET /User/Connection (Get accepted connections)
->GET /feed->Gets you the profile of other user on the platform

Status :ignore,intrested,accept,reject
