# rebel-challenge-roster
Music streaming accounting service

A demonstration

## Requirements:
Receive the data in the form of a json file containing an array of objects with the following fields:
- artist => Artist Name
- rate => Payment rate per stream
- streams => Number of Streams

Your minimum application requirements include:

- A hosted MVC structure with separate front and back ends
- Displaying the list in a web browser
- Extending the list to include the calculated payout amount per artist
- CRUD services for artists and rates
- Adding a field to toggle (and persist) whether the artist payout is complete (eg: checkbox)
- Display is sorted in descending order by payout amount


## Dev notes:
Electing to use a Node runtime to intermediate between a web client and a nosql database.

As I do not know when the demonstration will start and end, and want to have little ongoing cost, I'll deploy files and API in a serverless approach. 

Electing to use AWS. Most familiar there.

Node a popular choice and I can deploy it to Lambda (ie serverless) or EC2. 
API Gateway provides a rest interface, triggering Lambda code.

Front-end? Again, serverless deployment. Simple React app.

Declarative architecture is a good practice: CloudFormation template

Users? No, totally public, single DB

How does the data get into the system? Requirements do not specify. Let's allow providing an initial json file
when starting the app. Let's also provide an HTTP PUT endpoint to re-initialize. Easy to do, quite useful during
development, easy to remove later if needed.

Persistence? Free tier serverless MongoDB Atlas

Deployment? Darren's account.

Domain? TBD

API Protocol? REST is adequate for CRUD

Testing? Unit testing fine for now

Styling? Minimalistic. Black and white. Great big curly numbers, why not.

Accessibility: Always

Copyright? Private, why not

Q: What does CRUD for artists and rates mean exactly? An artist is an object and a rate is a field. Let's suppose, as a baseline, we can create
and update artists given a well-formed Artist, and can read all or by url-encoded Artist name, or delete by url-encoded Artist name.

Soft-delete? Not until requirements say so

Q: Will Artist ever appear twice in the data?

Q: Does the toggle lock Update/Delete?

Security considerations:
Require HTTPS? Yes
DDOS protection? Yes, configure a throttle
Javascript injection protection

Copyright 2023 engine99

