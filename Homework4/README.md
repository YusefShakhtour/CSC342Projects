- [SRC Folder](https://github.ncsu.edu/engr-csc342/csc342-2024Spring-yfshakht/tree/main/Homework4/src).
- [Static Folder](https://github.ncsu.edu/engr-csc342/csc342-2024Spring-yfshakht/tree/main/Homework4/static).
- [Templates Folder](https://github.ncsu.edu/engr-csc342/csc342-2024Spring-yfshakht/tree/main/Homework4/templates).

Q1: An interesting challenge you encountered when implementing Howler. What was the issue, and how did you solve it?
A challenge I faced while implementing Howler was figuring out the POST endpoints. I have not had the change to really
work with endpoints so far. With this project, I got a much better understanding of endpoints because of the problems I 
ran into. One of these problems was my follows put endpoints were not retreiving the data I wanted. Ways I solved this 
problem was using Postman to help test and debug the endpoint as well as going to office hours and getting some help 
on how I can go about debugging like temporarily changing the endpoint to a GET request to verify data was coming in as
expected. 

Q2: What additional feature would you add to Howler, and how would you suggest it should be implemented?
An additioanl feature that comes to my mind would be allowing media to be uploaded in Howls and adding repost options
to Howls. The media would need to be implemented with Multer and the path to the media that was uploaded would be a new
attribute that is associated with a Howl. The reposting would just be another button on a howl card that, when clicked,
would add that howl object to an array of howls, perhaps called ReHowl, that is in the user object. These ReHowls would
be shown on the users feed the same way followed howls are shown.

Final Thoughts:
Overall, this project was a tough one, but a really enjoyable and rewarding one as well. Learned a good chunk of bootstrap to 
now be capable of creating mobile/desktop web-applications as well as really got to see and implement a fullstack web-application.
Being able to keep reasserting the things taught in lecture through hands-on projects is definently one of the best ways I learn,
so this project essentially forced me to re-read the lectures, go back over lecture code, and read documentation which is only 
making me a better developer. 
