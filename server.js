const child_process = require("child_process")

// // "start": "webpack-dev-server --config config/webpack.dev.js",
// const child = child_process.spawn("npm",['run','server'],{stdio:'inherit'})

// child.on('close',code=>{
//     console.log("执行完成",code)
// })


const { exec } = child_process

exec('webpack-dev-server --config config/webpack.dev.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });