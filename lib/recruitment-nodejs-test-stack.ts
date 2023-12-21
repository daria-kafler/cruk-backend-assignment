import * as cdk from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { join } from 'path';

export class RecruitmentNodejsTestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const nodeJsFunctionProps: NodejsFunctionProps = {
      runtime: Runtime.NODEJS_16_X,
      environment: {
        TEST: 'TEST123'
      }
    }

    const getTestLambda = new NodejsFunction(this, 'getTestFunction', {
      entry: join(__dirname, '../src', 'test.ts'),
      ...nodeJsFunctionProps
    });

    const getTestIntegration = new LambdaIntegration(getTestLambda);

    const api = new RestApi(this, 'testApi', {
      restApiName: 'test service'
    });

    const test = api.root.addResource('test');
    test.addMethod('GET', getTestIntegration);
    // The code that defines your stack goes here
  }
}
