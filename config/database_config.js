import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres://default:W0SiZprxEs5K@ep-morning-salad-a4tikz85.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require', {
    logging: false
});


export default sequelize





