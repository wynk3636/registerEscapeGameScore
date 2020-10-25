var AWS = require('aws-sdk');
var dynamo = new AWS.DynamoDB.DocumentClient({
    region: 'ap-northeast-1'
});
var tableName = "escapeGameScore";

exports.handler = async (event, context) => {
    console.log("start");
    
    let bodyMessage = event.body;
    if(bodyMessage.name===undefined){
        bodyMessage = JSON.parse(event.body);
    }
    
    let name = bodyMessage.name;
    let score = bodyMessage.score;
    
    //let name =event['name'];
    //let score = event['score'];
    
    var item = {
      "id": context.awsRequestId,
      "name": name,
      "score": score
    };
    
    var params = {
        TableName: tableName,
        Item: item
    };
    
    await dynamo.put( params, function( err, data ) {
        console.log("dynamo_err:", err);
        //context.done(null, data);
    }).promise();
    
    const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin" : "*",
          "Access-Control-Allow-Credentials": true,  
        },
        body: JSON.stringify("success"),
    };
    return response;
};