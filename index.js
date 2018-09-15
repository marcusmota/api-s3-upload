
const app = require("./src/app");

const appName = "NodeJS s3 UPLOAD";
const port = 3030;


app.listen(port, () => {
    console.log(`------------------------------------------------------------------------------------------------------------------------------------------`);
    console.log(``);
    console.log(``);
    console.log(`===================`);
    console.log(`APP: ${appName}`);
    console.log(`PORTA: ${port}`);
    console.log('DATA: '+new Date().toISOString());
    console.log(`===================`);
    console.log(``);
    console.log(``);
});

module.exports = app;