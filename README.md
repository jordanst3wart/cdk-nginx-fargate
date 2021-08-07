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

 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk synth` emits the synthesized CloudFormation template
 * `cdk destroy` emits the synthesized CloudFormation template


