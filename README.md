# Nginx on ECS fargate

Requirements
- AWS VPC with public subnet, which is the default VPC
- AWS creds
- cdk
- `CDK_DEFAULT_ACCOUNT` and  `CDK_DEFAULT_REGION` environment variables set

Creates:
- an nginx container exposed to the internet with fargate

Uses:
- cdk in TypeScript

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

set `CDK_DEFAULT_ACCOUNT`, and  `CDK_DEFAULT_REGION` environment variables, and have a default profile, or use `--profile $profile`

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth` emits the synthesized CloudFormation template


