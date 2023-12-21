import AWS = require('aws-sdk');
import { Context, APIGatewayEvent } from 'aws-lambda';
import { Donation, DonationPostBody } from './types';

// Temporary in-memory donations "database", only works for the lifecycle of the lambda? 
// to replace with something else - DynamoDB or actual database
var donations: Donation[] = [];

export const handler = async (event: APIGatewayEvent, context: Context): Promise<any> => {
  const body: DonationPostBody = JSON.parse(event.body ?? "");

  console.info(`New donation request from: ${body.full_name} (${body.email}), sum: ${body.sum}`)

  if (!body.full_name) {
    const error = 'Donation request failed: No name provided for donation request';
    console.error(error, body);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error })
    }
  }

  if (!body.email) {
    const error = 'Donation request failed: No valid email provided for donation request';
    console.error(error, body);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error })
    }
  }

  if (!body.sum) {
    const error = 'Donation request failed: No sum provided for donation request';
    console.error(error, body);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error })
    }
  }

  const donation: Donation = {
    date: Date.now(),
    ...body
  }

  donations.push(donation);

  const donatedByUser = donations.filter((value) => (value.full_name === donation.full_name) && (value.email === donation.email));

  if (donatedByUser.length >= 2) {
    console.info(`Multiple donations from ${donation.full_name} sending email to ${donation.email}`)
    await sendEmail(donation.email, process.env.EMAIL_SOURCE);
  }

  console.info(`Donation request successful from: ${donation.full_name} (${donation.email}), sum: ${donation.sum}`)

  return {
    statusCode: 200, 
    body: JSON.stringify({})
  }
};

async function sendEmail(to: string, from: string) {
  const ses = new AWS.SES();
    
  const params = {
    Destination: { /* required */
      ToAddresses: [ to ]
    },
    Message: { /* required */
      Body: { /* required */
        Text: {
        Charset: "UTF-8",
        Data: "Thanks for your donations!"
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'CRUK Thanks you for your donations!'
      }
      },
    Source: from /* required */
  };

  try {
    console.info(`New send email request to: ${to}`)
    await ses.sendEmail(params).promise();
  } catch (e) {
    console.error(`Sending email failed with ${e}`)
    throw e;
  }
}