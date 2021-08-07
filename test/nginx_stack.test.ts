import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import {NginxStack} from "../lib/nginx-stack";

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new NginxStack(app, 'MyTestStack',
        {env: { account: '123456789012', region: 'us-east-1' }});
    // THEN
    expectCDK(stack).to(matchTemplate({
        "Resources": {
            "NginxClusterB904D6E0": {
                "Type": "AWS::ECS::Cluster",
                "Properties": {
                    "ClusterName": "NginxCluster"
                }
            },
            "EcsFargatePublicIPFargateTaskDefinitionTaskRoleD0A35E47": {
                "Type": "AWS::IAM::Role",
                "Properties": {
                    "AssumeRolePolicyDocument": {
                        "Statement": [
                            {
                                "Action": "sts:AssumeRole",
                                "Effect": "Allow",
                                "Principal": {
                                    "Service": "ecs-tasks.amazonaws.com"
                                }
                            }
                        ],
                        "Version": "2012-10-17"
                    }
                }
            },
            "EcsFargatePublicIPFargateTaskDefinition85D91E64": {
                "Type": "AWS::ECS::TaskDefinition",
                "Properties": {
                    "ContainerDefinitions": [
                        {
                            "Essential": true,
                            "Image": "nginx:latest",
                            "Name": "NginxContainer"
                        }
                    ],
                    "Cpu": "256",
                    "Family": "MyTestStackEcsFargatePublicIPFargateTaskDefinitionDD272FBE",
                    "Memory": "512",
                    "NetworkMode": "awsvpc",
                    "RequiresCompatibilities": [
                        "FARGATE"
                    ],
                    "TaskRoleArn": {
                        "Fn::GetAtt": [
                            "EcsFargatePublicIPFargateTaskDefinitionTaskRoleD0A35E47",
                            "Arn"
                        ]
                    }
                }
            },
            "EcsFargatePublicIPNginxSecurityGroupA552E430": {
                "Type": "AWS::EC2::SecurityGroup",
                "Properties": {
                    "GroupDescription": "Nginx internet traffic SG",
                    "GroupName": "NginxSecurityGroup",
                    "SecurityGroupEgress": [
                        {
                            "CidrIp": "0.0.0.0/0",
                            "Description": "Allow all outbound traffic by default",
                            "IpProtocol": "-1"
                        }
                    ],
                    "SecurityGroupIngress": [
                        {
                            "CidrIp": "0.0.0.0/0",
                            "Description": "http traffic",
                            "FromPort": 80,
                            "IpProtocol": "tcp",
                            "ToPort": 80
                        }
                    ],
                    "VpcId": "vpc-12345"
                }
            },
            "EcsFargatePublicIPFargateServiceB70AD214": {
                "Type": "AWS::ECS::Service",
                "Properties": {
                    "Cluster": {
                        "Ref": "NginxClusterB904D6E0"
                    },
                    "DeploymentConfiguration": {
                        "MaximumPercent": 200,
                        "MinimumHealthyPercent": 50
                    },
                    "EnableECSManagedTags": false,
                    "LaunchType": "FARGATE",
                    "NetworkConfiguration": {
                        "AwsvpcConfiguration": {
                            "AssignPublicIp": "ENABLED",
                            "SecurityGroups": [
                                {
                                    "Fn::GetAtt": [
                                        "EcsFargatePublicIPNginxSecurityGroupA552E430",
                                        "GroupId"
                                    ]
                                }
                            ],
                            "Subnets": [
                                "s-12345",
                                "s-67890"
                            ]
                        }
                    },
                    "TaskDefinition": {
                        "Ref": "EcsFargatePublicIPFargateTaskDefinition85D91E64"
                    }
                }
            }
        }
    }, MatchStyle.EXACT))
});
