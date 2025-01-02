const express = require('express');
const app = express();
const config = require('./config/index.config.js');
const Cortex = require('ion-cortex');
const ManagersLoader = require('./loaders/ManagersLoader.js');
const schoolRoutes = require('./routes/schoolRoutes');
const classroomRoutes = require('./routes/classroomRoutes');
const studentRoutes = require('./routes/studentRoutes');
const rateLimiter = require('./mws/rateLimit.mw');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

app.use(cors());

const mongoDB = config.dotEnv.DB_URI
  ? require('./connect/mongo')({
      uri: config.dotEnv.DB_URI,
    })
  : null;

app.use(express.json());
app.use('/api/schools', schoolRoutes);
app.use('/api/classrooms', classroomRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/auth', authRoutes);

app.use(rateLimiter);
const managersLoader = new ManagersLoader({ config });
const managers = managersLoader.load();

app.listen(config.dotEnv.PORT, () => {
  console.log(`Server is running on port ${config.dotEnv.PORT}`);
});