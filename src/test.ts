export const handler = async (event: any = {}): Promise<any> => {
  const test = event.queryStringParameters.test;
  return {
    statusCode: 200, body: { 'res': test }
  }
};