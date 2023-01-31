const express = require('express');
var cors = require('cors')
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const morgan = require('morgan');
const router = require('./Controller/StudentApp.js').router;
const app = express();
app.use(cors());
app.use(morgan("dev"));

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Student Database API", // short title.
        description: "University school help system", //  desc.
        version: "1.0.0", // version number
        contact: {
          name: "Adeola Aderibibe", // your name
          email: "adeolaaderibigbe09@gmail.com", // your email
          url: "https://github.com/Adexandria", // your website
        },
      },
      schemes : ["http"]
    },
    apis: ["./Controller/*.js","./Repository/*.js"]
  };
  
  const specs = swaggerJsDoc(options);
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
  app.use("/",router);
 var port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server runs on port ${port}`));