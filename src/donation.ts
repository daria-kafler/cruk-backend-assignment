import { Context, APIGatewayEvent } from 'aws-lambda'
import { Donation, DonationPostBody } from './types';

// Temporary in-memory donations "database", only works for the lifecycle of the lambda? 
// to replace with something else - DynamoDB or actual database
var donations: Donation[] = [];

export const handler = async (event: APIGatewayEvent, context: Context): Promise<any> => {
  const body: DonationPostBody = JSON.parse(event.body);

  if (!body.full_name) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'no name' })
    }
  }

  if (!body.email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'no email' })
    }
  }

  if (!body.sum) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'no sum' })
    }
  }

  const donation: Donation = {
    date: Date.now(),
    ...body
  }

  donations.push(donation);

  const donatedByUser = donations.filter((value) => (value.full_name === donation.full_name) && (value.email === donation.email));

  if (donatedByUser.length >= 2) {
    return {
      statusCode: 200, 
      body: JSON.stringify({ 'res': 'two+ donations' })
    }
  
  }

  return {
    statusCode: 200, 
    body: JSON.stringify({ 'res': 'first donation' })
  }
};