# robitr-objectDetect v1.0

A demonstration project to analyze objects in still images and video files using AWS Rekognition and output a JSON file with the extracted results. 

![Robitr objectDetect](https://github.com/jay-yeo/robitr-objectDetect/blob/master/docs/img/robitr_screencast.gif)

**Functions:**
- Browser-based web application (React).
- Upload images and video to AWS S3 Bucket.
- Run AWS Rekognition "Label Detection" on uploaded media assets.
- Download or view JSON results.


## Getting Started

These instructions will get the application running on your local machine and to configure AWS Rekognition appropriately.

### Prerequisites

Prior to installation there are several steps to consider:

#### Dependencies

Please ensure that you have the following libraries and dependencies installed:

```
sudo apt install nodejs npm docker-ce
```

#### AWS Console Access

You will require the appropriate security policy to setup several services, roles and permissions using the AWS console. 

## Setting up AWS Rekognition
To use Rekognition for object detection you will need to configure the following access and permissions using the AWS console. 

>There are several access keys and parameters which we will need for steps later on, so it is advised that you have an empty text document open to quickly copy these items down.

### 1. Create IAM User
Create an IAM user account with Programmatic access and attach the following following permissions:  

- AmazonSQSFullAccess
- AmazonRekognitionFullAccess
- AmazonS3ReadOnlyAccess

Save the Access Key ID and Secret Access Key for later.

### 2. Rekognition Service Role
Create an IAM service role to give AWS Rekognition access to your Amazon SNS topics. 

Note the Role ARN of the service role.

**Example Role ARN**
```
arn:aws:iam::547045472775:role/AWSRekognition
```

### 3. Add Inline Security Policy
Add the following inline policy to the IAM user that you created previously. Replace the `Sid` field with a name of your choosing and paste the Role ARN we created in Step 2 into the `Resource` field.

**Example Inline Security Policy**
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "MyPolicyName",
            "Effect": "Allow",
            "Action": "iam:PassRole",
            "Resource": "arn:aws:iam::547045472775:role/AWSRekognition"
        }
    ]
}
```           

### 4. Create SNS Topic:
We need to create a SNS topic to alert Rekognition when label results have been processed. 

Create a new Topic and note the **Topic ARN**.

**Example SNS Topic ARN**
```
arn:aws:sns:us-east-1:547045472775:RekognitionSNS
```

### 5. Create S3 Bucket:
Create a new S3 Bucket or use an existing Bucket and apply the following CORS policy:

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
Note the name of the S3 Bucket and save for later.

> For additional help and troubleshooting please check out the AWS Rekognition [documentation](https://docs.aws.amazon.com/rekognition/latest/dg/what-is.html). 

## Installing

#### Unzip source code
Unzip the project to your local machine or EC2 instance:

```
unzip robitr-labeldetect
cd robitr-labeldetect/
```

Install node modules:
```
npm install
```
## Configure

#### Setting Environment Variables
Access credentials and other unique parameters are set in the `.env` file, located in the project root directory. Please edit the file to reflect the appropriate AWS authorization credentials and parameters which were set in the previous steps.

```
REACT_APP_ACCESS_KEY_ID=
REACT_APP_SECRET_ACCESS_KEY=
REACT_APP_BUCKET=
REACT_APP_ROLE_ARN=
REACT_APP_SNS_TOPIC_ARN=
```

## Run 
Start the application from the Terminal:
```
npm start
```
Visit `http://localhost:3000/` in your browser.

## Author
**Jay Yeo** - *Initial work* - [jay-yeo](https://github.com/jay-yeo)