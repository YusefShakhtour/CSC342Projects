1. An interesting challenge you encountered when implementing JTW algorithms. What was the issue, and how did you solve it?
- I was running into issues trying to figure out the encoding/decoding. Eventually though, we got that snippet on Discord
making things much easier. The actual JWT was not too bad. I did however, need to look into it further than lecture just to
try and get a better understanding of it so that I could actually implement it.

2. What security risks/vulnerabilities/weaknesses, if any, are present in your implementation? How can they be exploited, and what are some ways to fix them? Are there any tradeoffs if you implement any of the fixes?
- I don't think I had any security risks or vulnerabilities in my code. Looking at it, the creation and verification of the JWT is, from my understanding,
pretty similar to how it's done in the JWT library. The only possible vulnerability is exposing the API_SECRET key, but putting that in my .env file avoids
that altogether.


Final Thoughts:
Overall, this project was pretty straightforward. I unfortunately didn't have time to edit HW4 to add proper authentication, 
but my HW5 is fully functional and the token is a proper JWT. It's definently valuable to know how to properly secure things
like a cookie for a web application. Makes things easier on the user and is just, in general an imporant part of web development.
I should be able to gain more exposure with proper security/authentication with the group project and really have that part 
of we development figured out. 
Overall, this project was good for getting some hand on exposure to authentication.
