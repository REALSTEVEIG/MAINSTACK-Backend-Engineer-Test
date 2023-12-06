require('dotenv').config({ path: './.env' })

const _ = require('lodash')
const chalk = require('chalk')

const requiredEnvVars = ["MONGO_URI", "DB_NAME"];

const validateEnvVars = () => {
  const missingVars = requiredEnvVars.filter((k) => _.isEmpty(process.env[k]));
  if (missingVars.length > 0) {
    // eslint-disable-next-line no-console
    console.log(chalk.red('Missing environment variables:', missingVars.toString()));
    process.exit(1);
  }
};

validateEnvVars();

module.exports = {
  mongodb: {
    url: `${process.env.MONGO_URI}`,
    databaseName: `${process.env.DB_NAME}`,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  },
  migrationsDir: "migrations",
  changelogCollectionName: "changelog",
  migrationFileExtension: ".js",
  useFileHash: false,
  moduleSystem: 'cjs',
};
