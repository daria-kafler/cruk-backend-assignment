import { Context, APIGatewayEvent } from 'aws-lambda'
import { Donation, DonationPostBody } from './types';

// Temporary in-memory donations "database"
var donations: Donation[];

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

  return {
    statusCode: 200, 
    body: JSON.stringify({ 'req': JSON.stringify(body), 'res': JSON.stringify(donations) })
  }
};