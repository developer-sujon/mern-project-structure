//internal import
const app = require("./app");

app.listen(process.env.PORT, () =>
  console.log(`Server listening on ${process.env.PORT}`),
);
