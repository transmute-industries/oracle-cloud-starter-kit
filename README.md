## Oracle Cloud Starter Kit

Get Stated with a Node.js app that talks to Ethereum and IPFS on Oracle Cloud.

This tutorial is adopted from [here](http://www.oracle.com/webfolder/technetwork/tutorials/obe/cloud/apaas/node/node-github-accs/node-github-accs.html).

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
  -F "gitRepoUrl=git@github.com:transmute-industries/oracle-cloud-starter-kit.git"  
```




