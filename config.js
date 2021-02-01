const env = process.env.NODE_ENV;

module.exports = {
  MONGO_URI = process.env.MONGO_DB_URI_TEST1 || `mongodb+srv://aas:codeworks@aas.pwwb5.mongodb.net/sesame`

};
