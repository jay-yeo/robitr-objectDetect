# robitr-objectDetect v1.0

Analyze objects in still images and video files using AWS Rekognition and output a JSON file with the extracted results. 

**Functions:**
- Browser-based web application (React).
- Upload images and video to AWS S3 Bucket.
- Run AWS Rekognition "Label Detection" on uploaded media assets.
- Download or view JSON results.

*This project was created as part of a React and AWS Hackathon*

## Getting Started

These instructions will get your copy of the source code up and running on your local machine deployed to the cloud on AWS.

### Prerequisites

Prior to installation there are several steps to consider:

#### Dependencies

Please ensure that you have the following libraries and dependencies installed.

```
sudo apt install nodejs npm docker-ce
```

#### AWS Console Access

We will need to setup several services, roles and permissions using the AWS console. If you do not have root access to your AWS account, you may need access granted to IAM, EC2, S3, Rekognition and SNS.

## Setting up Amazon Web Services (AWS)
You will need to setup the following access and permissions on AWS. 

*There are several access keys and parameters which we will need for steps later on, so it is advised that you have an empty text document open to quickly copy these items down.*

### IAM User
Create an IAM user account with Programmatic access and attach the following the following permissions.  

- AmazonSQSFullAccess
- AmazonRekognitionFullAccess
- AmazonS3ReadOnlyAccess

 Save the Access Key ID and Secret Access Key for later.

### Service Role
Create an IAM service role to give Amazon Rekognition Video access to your Amazon SNS topics. Note the Amazon Resource Name (ARN) of the service role. 

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "MyPolicyName",
            "Effect": "Allow",
            "Action": "iam:PassRole",
            "Resource": "arn:Service role ARN from step 3"
        }
    ]
}
```           
Add the following inline policy to the IAM user that you created previously. Replace `MyPolicyName` with a name of your choosing.

### Create SNS Topic:
We need to create a SNS topic to alert Rekognition when label results have been processed. Create a new Topic and note the **TopicARN**.

### Create S3 Bucket:
Create an S3 Bucket with a unique name of your choice and apply the following CORS policy:

```
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <CORSRule>
        <AllowedOrigin>*</AllowedOrigin>
        <AllowedMethod>GET</AllowedMethod>
        <AllowedMethod>POST</AllowedMethod>
        <AllowedMethod>PUT</AllowedMethod>
        <AllowedMethod>DELETE</AllowedMethod>
        <ExposeHeader>ETag</ExposeHeader>
        <AllowedHeader>*</AllowedHeader>
    </CORSRule>
</CORSConfiguration>
```
Afterwards, note the name of the S3 Bucket and save for later.


## Installing

#### Unzip source code
Unzip the project on your local machine or EC2 instance:

```
unzip robitr-labeldetect
cd robitr-labeldetect/
```

Install node modules:
```
npm install
```

#### Setting Environment Variables
Access credentials and other unique parameters are set in the `.env` file, located in the project root directory. Please edit the file to reflect the appropriate authorization credentials and parameters which were set in the previous steps.

```
REACT_APP_ACCESS_KEY_ID=
REACT_APP_SECRET_ACCESS_KEY=
REACT_APP_BUCKET=
REACT_APP_ROLE_ARN=
REACT_APP_SNS_TOPIC_ARN=
```

#### Run Docker container
Finally, run the Dockerfile to deploy the application:
```
docker run -p 80:80 robitr-objectdetect:latest
```


