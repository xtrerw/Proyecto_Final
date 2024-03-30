import { MongoClient } from 'mongodb';

// 定义数据库连接 URL
const url = 'mongodb://localhost:27017';

// 定义要创建的数据库名称
const dbName = 'Champions_eLeague';

// 创建 MongoDB 客户端
const client = new MongoClient(url);

// 连接到 MongoDB 服务器并创建数据库
client.connect(function(err) {
  if (err) {
    console.error('连接数据库时发生错误:', err);
    return;
  }

  console.log('成功连接到 MongoDB 服务器');

  // 创建数据库
  const db = client.db(dbName);
  console.log(`已创建数据库: ${dbName}`);

});
