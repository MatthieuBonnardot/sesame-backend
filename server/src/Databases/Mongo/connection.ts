import { connect } from 'mongoose';

const MONGOPWD: string = 'codeworks';

const connection = async () => {
  await connect(`mongodb+srv://aas:${MONGOPWD}@aas.pwwb5.mongodb.net/Sesame?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connection;
