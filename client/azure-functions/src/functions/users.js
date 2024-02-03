const { app } = require('@azure/functions');
const { MongoClient } = require("mongodb");

app.http('users', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const body = JSON.parse(await request.text());
        const {username, email, password} = body;
        if (!username || !email || !password) {
            context.res = {
                "status": 400,
                "body": "Missing required fields!"
            }
        }
        const mongoClient = new MongoClient(process.env.MONGODB_ATLAS_URI);
        const database = await mongoClient.db(process.env.MONGODB_ATLAS_DATABASE);
        const collection = database.collection("users");
        try {
            await collection.insertOne({username, email, password});
            mongoClient.close();
            context.res = {
                status: 201,
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": {
                    "message": "User created successfully!"
                }
            }

        } catch (error) {
            context.res = {
                "status": 500,
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": {
                    "message": error.toString()
                }
            }
        }
    }
});
