export default {
    port: process.env.PORT,
    //port: 5003,
    secrets: {
        jwt: process.env.JWT_SECRET,
        dbUrl: process.env.DATABASE_URL,
    },
    //logging: false,
};