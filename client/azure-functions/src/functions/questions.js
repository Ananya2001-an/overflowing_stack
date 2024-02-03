const { app } = require('@azure/functions');
const { MongoClient } = require("mongodb");

app.http('questions', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const body = JSON.parse(await request.text());
        const {title, author, content, tags} = body;
        if (!title || !author || !content || !tags) {
            context.res = {
                "status": 400,
                "body": "Missing required fields!"
            }
        }
        const mongoClient = new MongoClient(process.env.MONGODB_ATLAS_URI);
        const database = await mongoClient.db(process.env.MONGODB_ATLAS_DATABASE);
        const collection = database.collection("questions");
        try {
            await collection.insertOne({title, author, content, tags});
            mongoClient.close();
            context.res = {
                status: 201,
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": {
                    "message": "Question created successfully!"
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
