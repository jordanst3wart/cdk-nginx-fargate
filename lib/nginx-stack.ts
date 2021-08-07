import * as cdk from '@aws-cdk/core';

import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecs from "@aws-cdk/aws-ecs";
import {EcsFargatePublicIp} from "./ecs-fargate-public-ip";

export class NginxStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

      const vpc = ec2.Vpc.fromLookup(this, "DefaultVPC",{ isDefault: true })

      const cluster = new ecs.Cluster(this, "NginxCluster", {
          vpc,
          clusterName: "NginxCluster"
      });

      new EcsFargatePublicIp(this, "EcsFargatePublicIP", cluster, vpc)

  }
}
