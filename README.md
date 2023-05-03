# serverless-express-react-crud-roster.
Serverless music streaming accounting app and api

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

#To run:
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
- copy build\* to s3
  
- cd ..
- sam build
- sam deploy
- in Lambda, set value for <mongosecret>



# Dev notes:
Crash logs are sometimes in src/utils/error/

# Doc links
 - https://github.com/vendia/serverless-express/tree/mainline/examples/basic-starter-api-gateway-v2-typescript
 - https://repost.aws/knowledge-center/cloudfront-serve-static-website
 - https://github.com/aws-samples/amazon-cloudfront-secure-static-site/blob/master/templates/cloudfront-site.yaml
 - https://github.com/aws-samples/react-cors-spa/blob/main/react-cors-spa-stack.yaml
 - https://github.com/aws-samples/aws-serverless-ai-stories
 - https://create-react-app.dev/


Copyright 2023 engine99