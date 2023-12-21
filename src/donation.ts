import { Context, APIGatewayEvent } from 'aws-lambda'
import { Donation, DonationPostBody } from './types';

// Temporary in-memory donations "database"
var donations: Donation[];

export const handler = async (event: APIGatewayEvent, context: Context): Promise<any> => {
  return {
    statusCode: 200, 
    body: JSON.stringify({ 'res': donations })
  }
};