Endpoints:

1) USERS
  a) Create user: /users/     (POST)
      
       {
        "username": "pallavi",
        "password": "pallavi",
        "address": "Bbubaneswar",
        "email": "pallavi@gmail.com",
        "phoneNo": 9876543210,
        "gender": "female"
       }
  
  b) Login user: /auth/login  (POST)
    
        {
            "username": "pallavi",
            "password": "pallavi"
        }
        
  c) Forget password: /auth/forgot (POST)
    
        {
         "username": "pallavi"
        }
        
  d) Reset Password: /auth/reset   (POST)
      
       { 
          "otp": 246600,
          "username": "pallavi",
          "password": "pallavi001",
          "confirm_password":"pallavi001"
        }
      
  e) Change Password: /users/:id   (POST)
       
       {
       "oldPassword": "pallavi001",
       "password": "pallavi"
       }
       
  f) Update Profile: /users/:id    (PUT)
        
        {
           "name": "",
           "email": " ",
           "address": " ",
           "phone": " "
        }
       
  g) Delete User:   /users/:id     (DELETE)
  
  
  h) Change level or role: /users   (PATCH)
      { 
          "username": " "
          "level": 
      }
      
      
2) TOPICS :

   a) Create topic: /topic  (POST)
       
       {
         "topic_name": "Topic 3",
         "desc": "games",
         "editors":["pallavi"],
         "viewers": ["mehul"]
       }
   
   b) Update topic: /topic/:id  (PATCH)
       
       {
       "desc":  "",
       "editors": ['', ''],
       "viewers": ['', ''],
       }
   
   c) View Topic: /topic (GET)
   
   d) View Blogs from specific Topics: /topic/:topicId (GET)
   
   e) Delete Role: /topic/role/:topicId   (DELETE)
      
      {
      "userArr": ["1455cfc1-8472-4b5c-9c06-5db09892ee85"],
      "role": "viewers"
      }
    
3) BLOGS:

   a) Create Blog:  /blogs (POST)
         
         {
          "blog_name": "company",
          "desc": "ncompass",
          "header": "here is head",
          "body": "here is body",
          "footer": "here is foot",
          "topic": "Topic 3"
         }
        
   b) Update Blog: /blogs/:blogId  (PATCH)
         
        {
        "blog_name": "athlete2",
        "desc": "messi",
        "header": "head2",
        "body": "body2",
        "footer": "foot2"
        }
          
   c) Get Blog: /blogs/:blogId (GET)
     
   d) Delete Blog: /blogs/:blogId (DELETE)
    
   
  
