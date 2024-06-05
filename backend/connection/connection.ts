import mysql, { Connection } from 'mysql2';

export const DB: Connection = mysql.createConnection({
  host: 'ts-database',
  port: 3306,
  user: 'user',
  password: '0JcusWWFmfZyXrq8VomQ',
  database: 'ts_jira',
});
