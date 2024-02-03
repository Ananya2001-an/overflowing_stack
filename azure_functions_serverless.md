## Azure Functions (Serverless)
[Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/) is a serverless compute service that enables you to run event-triggered code without having to explicitly provision or manage infrastructure.

> You can find azure functions for this project in the [`client/azure-functions`](client/azure-functions) directory.

### Use Azure CLI to create a function app
To create a function app in Azure, you can use the Azure CLI. The following example creates a function app in the `demo` resource group, in the `centralindia` region, with the name `overflowing-stack`:

```bash
az login                         # Log in to your azure account.    
az group create -n demo -l centralindia   # Create a resource group
az functionapp create -n overflowing-stack -g demo -s storageaccountname --consumption-plan-location centralindia
```

![Screenshot 2024-02-03 181718](https://github.com/Ananya2001-an/overflowing_stack/assets/55504616/c7674428-9f74-461c-b280-15b903dc3ddd)

Now install the Azure Functions Core Tools to create a function locally. You can install the tools using npm, which is included with Node.js. The Azure Functions Core Tools provide a local development experience for creating, developing, testing, running, and debugging Azure Functions.

```bash
func init azure-functions # Create a new function app project in the current folder
cd azure-functions # Change the directory to the new function app project
func new --name users --template "HTTP trigger" # Create a new function called users
```

Inside `local.settings.json` add:
```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "node"
  },
  "Host": {
    "LocalHttpPort": 7071,
    "CORS": "*"
  }
}
```
See in the code above that we are already enabling CORS. Because without it, we can’t perform CRUD operations!

Our local project and cloud account is configured, but we’ve yet to link them together. We need to link them together, so our function deploys to the correct place.
    
```bash
func azure functionapp fetch-app-settings <FUNCTION_APP_NAME> 
func azure storage fetch-connection-string <FUNCTION_APP_NAME>
```

Because we plan to use the MongoDB Node.js driver, we will need to add the driver to our project and configure it. Neither of these things will be complicated or time consuming to do. We will install the driver using npm and configure it using the Azure Functions Core Tools.

```bash
npm install mongodb
```

The values in the local.settings.json file will be accessible as environment variables in our local project.

```json
{

    "IsEncrypted": false,
    "Values": {
        // Other fields here ...
        "MONGODB_ATLAS_URI": "mongodb+srv://<username>:<password>@examples.mx9pd.mongodb.net/?retryWrites=true&w=majority",
        "MONGODB_ATLAS_CLUSTER": "cluster",
        "MONGODB_ATLAS_DATABASE": "test",
        "MONGODB_ATLAS_COLLECTION": "users"
    },
    "ConnectionStrings": {}
}
```

After editing your function you can start it using the following command:
```bash 
func start
```

![Screenshot 2024-02-03 225741](https://github.com/Ananya2001-an/overflowing_stack/assets/55504616/3bfa34bd-e428-4335-9652-5d2159809edd)

![Screenshot 2024-02-03 230025](https://github.com/Ananya2001-an/overflowing_stack/assets/55504616/458d3cdd-f5a5-4315-8fa6-1370f174fb1a)

![Screenshot 2024-02-03 235238](https://github.com/Ananya2001-an/overflowing_stack/assets/55504616/fddc1466-9923-445e-be22-83dee4d793a4)


### Deploying the function app
Before deploying make sure the app settings are configured in the Azure portal. Like the MongoDB connection string and other environment variables.
    
```bash
az functionapp config appsettings set --name <FUNCTION_APP_NAME> --resource-group <RESOURCE_GROUP_NAME> --settings MONGODB_ATLAS_URI=<MONGODB_ATLAS_URI>
```

Deploy it using VS Code or from command line (make sure you have logged into Azure using `az login`):
```bash
func azure functionapp publish <function app name>
```     

![Screenshot 2024-02-03 215451](https://github.com/Ananya2001-an/overflowing_stack/assets/55504616/75c43db0-e479-4ef9-b8c0-dd90dbd8b42b)