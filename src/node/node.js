
import { mongoose } from 'mongoose';

// 连接到 MongoDB 数据库
mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
