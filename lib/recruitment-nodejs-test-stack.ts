import * as cdk from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { join } from 'path';

export class RecruitmentNodejsTestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const emailSource = new cdk.CfnParameter(this, 'emailSource', {
      type: 'String',
      description: 'Email Address used for the "From:" field in outgoing emails'
    })

    const postDonationLambda = new NodejsFunction(this, 'postDonationFunction', {
      entry: join(__dirname, '../src', 'donation.ts'),
      runtime: Runtime.NODEJS_16_X,
      environment: {
        'EMAIL_SOURCE': emailSource.valueAsString
      }
    });

    const postDonationIntegration = new LambdaIntegration(postDonationLambda);

    const api = new RestApi(this, 'donationApi', {
      restApiName: 'CRUK Donation API'
    });

    const donation = api.root.addResource('donation');
    donation.addMethod('POST', postDonationIntegration);
  }
}
