## Oracle Cloud Starter Kit

Get Stated with a Node.js app that talks to Ethereum and IPFS on Oracle Cloud.

This tutorial is adopted from [here](http://www.oracle.com/webfolder/technetwork/tutorials/obe/cloud/apaas/node/node-github-accs/node-github-accs.html).

### Getting Started Locally

```
npm i
PORT=1337 npm run start  
```

Open http://localhost:1337/transmute

## [Learn More About the Transmute Framework](https://github.com/transmute-industries/transmute-tutorials/tree/master/transmute-framework)


### Deploying to Oracle Cloud

Use data center: `us`

Or modify this example curl url after signing up for oracle cloud.

Be sure to change:

USERNAME
PASSWORD
TENANT_NAME
MY_APP

You can get the TENANT_NAME from the details after creating a sample application.

```
curl -X POST -u USERNAME:PASSWORD \
  https://apaas.us.oraclecloud.com/paas/service/apaas/api/v1.1/apps/TENANT_NAME \
  -H "X-ID-TENANT-NAME:TENANT_NAME" \
  -H "Cache-Control: no-cache" \
  -H "content-type: multipart/form-data;"  \
  -F "name=MY_APP" \
  -F "runtime=node" \
  -F "subscription=HOURLY" \
  -F "manifest=@manifest.json"\
  -F "gitRepoUrl=https://github.com/transmute-industries/oracle-cloud-starter-kit.git"  
```

## Deploy to TestNets

Latest Ropsten deployments:

https://ropsten.etherscan.io/address/0xe7245d0652291fc42bff53f6055e0e17ffb50b83