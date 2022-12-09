export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "appcloudcomputing": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    },
    "api": {
        "appcloudcomputing": {
            "GraphQLAPIKeyOutput": "string",
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    },
    "predictions": {
        "interpretTextcd8097f2": {
            "region": "string",
            "type": "string"
        },
        "translateText0d4e91a9": {
            "region": "string",
            "sourceLang": "string",
            "targetLang": "string"
        }
    }
}