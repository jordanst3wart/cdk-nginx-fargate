import * as cdk from '@aws-cdk/core';

import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecs from "@aws-cdk/aws-ecs";
import {ContainerImage, FargateService, FargateServiceProps, FargateTaskDefinition, ICluster} from "@aws-cdk/aws-ecs";
import {IVpc, Peer, Port, Protocol, SecurityGroup} from "@aws-cdk/aws-ec2";

export class EcsFargatePublicIp extends cdk.Construct {
    constructor(scope: cdk.Construct, id: string, cluster: ICluster, vpc: IVpc, props?: cdk.StackProps) {
        super(scope, id)

        const assignPublicIp = true

        const taskDefinition = new FargateTaskDefinition(this, "FargateTaskDefinition", {
            cpu: 256,
            memoryLimitMiB: 512,
        })

        const image = ContainerImage.fromRegistry("nginx:latest");
        taskDefinition.addContainer("NginxContainer", {image})

        const securityGroup = new SecurityGroup(this, "NginxSecurityGroup", {
            vpc,
            description: "Nginx internet traffic SG",
            securityGroupName: "NginxSecurityGroup",
        })

        securityGroup.addIngressRule( Peer.anyIpv4(), Port.tcp(80), "http traffic", )

        new FargateService(this, "FargateService", {taskDefinition, assignPublicIp, cluster, securityGroups: [securityGroup]});
    }
}