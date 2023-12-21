# CRUK Node.js Recruitment Assignment

## Installation 
Assuming you have a typescript enviroment, run the following commends once:

```
npm install
alias cdk="npx aws-cdk@2.x"
```

After that run the following to deploy the service (`emailSource` should be the email Address used for the "From:" field in outgoing emails.)
```
cdk synth
cdk deploy --parameters emailSource=<email>
```

At this point the service should be deployed.

## Endpoints
[POST] `/donation`

This endpoint receives a donation and saves it to the database.
POST body should look like this:
```
{
    "full_name":"Daria Kafler",
    "email":"me@dariakafler.com",
    "sum": 1000
}
```
This would save a donation of 1000, under Daria's name. If a user donates twice, a thank you email will be sent to their address.

The service has been deployed for you to try at: https://j2j5racf1h.execute-api.eu-west-1.amazonaws.com/prod/

## If I had more time
Having very limited previous experience with AWS, it took the vast majorioty of time to figure it out and set up. This is also true for CDK, where a chunk of time went to migrating to CDK2, since CDK1 is now deprecated. 

### Logging
At the moment logging is very rudamentary as I struggled to find something to use with AWS with the time I had left. For production I'd use structured logging to allow better troubleshooting, app monitoring and scalability.

### Testing
For production code I would test the logic of the service, using unit and integration tests, as well as the deployment related code. As mentioned above, I unfortunately ran out of time to implement.

### Database
The service currently uses a list of donation objects as its database, which is not ideal. For production I'd use an actual database, either an AWS specific one such as DynamoDB or something more general like postgres. For this very simple case, the specifics of which database to use aren't important. Depending on future needs of the service, we'd have to consider options such as key-value store, a sql database, etc.

