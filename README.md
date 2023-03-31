# rebel-challenge-roster
Music streaming accounting app and api

A demonstration

#
# Requirements:
Receive the data in the form of a json file containing an array of objects with the following fields:
- artist => Artist Name
- rate => Payment rate per stream
- streams => Number of Streams

Your minimum application requirements include:

- A hosted MVC structure with separate front and back ends
- Displaying the list in a web browser
- Extending the list to include the calculated payout amount per artist
- Display is sorted in descending order by payout amount
- CRUD services for artists and rates
- Adding a field to toggle (and persist) whether the artist payout is complete (eg: checkbox)

## To run:
Provision a mongodb server. Create a database 'ArtistRoster_development' and a collection 'Artists'. Add index with fields {
  artist:1
} and options
{ unique:true,
partialFilterExpression: { $type: "string" } }. Create another index on payout:
{ payout:-1 }

In root directory, run 'npm start'

To debug react-client, in react-client, run npm run dev. Start on port 3001.

In react-client, run 'npm build'. Have next to package.json a .env file defining PUBLIC_URL

Serverless: this app is designed for totally serverless deployment using
SAM (Serverless Application Model), which is built on top of CloudFormation.
Install the AWS CLI.
Install the AWS SAM CLI.

After an environment has been created in your samconfig.toml file, you can specify it using the --config-env option. sam build --use-container --config-env "prod"

--use-container allows the compiled artifact to be referenced
by AWS::Serverless::Function

To summarize:
- cd react-client
- npm install
- cd ..
- sam build
- sam deploy

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

Deployment? Darren's account

Domain? TBD

API Protocol? REST is adequate for CRUD

Testing? Unit testing fine for now

Styling? Minimalistic. Black and white. Great big curly numbers, why not.

Accessibility: Always

License? Copyrighted and unlicensed, why not

Error pages? Standard. Embed error messages when running in dev env

Containerization? No

Pagination? Yes

Q: What does 'CRUD for artists and rates' mean exactly? An artist is an object and a rate is a field.
For simplicity, as a baseline, let's provide Artist-level REST API only. So:

Operation                       |      Payload     |   Response
--------------------------------+------------------+------------------
POST   /artists                 | None             |   201 and ID for new empty
PUT    /artists/<id>            | Artist object    |   200 and Artist, if sucessful
                                                        404 if DNE
                                                        400 if malformed
DELETE /artists/<id>            | Artist object    |   200 and Artist, if sucessfully permanently deleted
                                                        404 if DNE
GET    /artists                 | None             |   200 and Array of all artists
GET    /artists/<id>            | None             |   200 and Artist, if sucessful
                                                        404 if DNE
PUT    /data (dev only)         | Array of artists |   200 if database cleared and reloaded

and also:

GET   /                         | None             |   Returns the front-end app

Is it required to be able to change an artists name? Sure why not

Soft-delete? Not until requirements say so

Q: Will Artist ever appear twice in the data?
I've added a uniqueness constraint on name in mongodb

Q: Does the toggle lock Update/Delete?

Security considerations:
Require HTTPS? Yes
DDOS protection? Recommended. Configure a throttle when serverless
Javascript injection protection

Dev questions:
node run dev gives app crashed. Why do I not see an error and stack at 'app crashed'? And not caught in errorMiddleware?
Ah, it's logged to src/utils/error/

# Doc links
 - https://github.com/vendia/serverless-express/tree/mainline/examples/basic-starter-api-gateway-v2-typescript
 - https://repost.aws/knowledge-center/cloudfront-serve-static-website
 - https://github.com/aws-samples/amazon-cloudfront-secure-static-site/blob/master/templates/cloudfront-site.yaml
 - https://github.com/aws-samples/react-cors-spa/blob/main/react-cors-spa-stack.yaml
 - https://github.com/aws-samples/aws-serverless-ai-stories
 - 

Copyright 2023 engine99

