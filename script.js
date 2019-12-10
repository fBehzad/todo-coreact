const {spawn} = require('child_process');
const children = [];

function close() {
  for (let x of children) {
    x.kill(9);
  }
}

function run_child(name, command, args, ev) {
  const env = {
    ...process.env,
    ...ev
  };
  const ls = spawn(command, args, {
    env: env,
  });
  ls.stdout.on('data', (data) => {
    console.log('+++++++++' + name.toUpperCase(), data.toString());
  });
  ls.stderr.on('data', (data) => {
    console.error('+++++++++' + name.toUpperCase(), data.toString());
  });
  ls.on('close', close);
  children.push(ls);
  return ls;
}
process.on('SIGINT', close);

const args = process.argv.slice(2);

const app = (process.env.APP || '');
if (args[0] === 'bundle') {
  run_child('builder', 'npm', ['run', 'build'], {});
  app.split(',').forEach(app => {
    const [name] = app.split(':');
    run_child(app, 'npm', ['run', 'pack'], {
      NODE_ENV: 'production',
      APP_NAME: name,
    });
  });
} else if (args[0] === 'start') {
  app.split(',').forEach(app => {
    const [name, port] = app.split(':');
    run_child(app, 'node', ['./dist/server.js'], {
      NODE_ENV: 'production',
      APP_NAME: name,
      PORT: port,
    });
  });
}
