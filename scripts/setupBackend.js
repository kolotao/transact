const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const backendDir = path.join(__dirname, '../backend');
const envFile = path.join(backendDir, '.env');
const tmpDir = path.join(backendDir, 'tmp');

console.log('🔧 Setting up backend...');

execSync('npm install', { cwd: backendDir, stdio: 'inherit' });

if (!fs.existsSync(envFile)) {
  console.log('⚙️  Creating .env file...');
  fs.writeFileSync(
    envFile,
    `TZ=UTC
PORT=5438
HOST=localhost
LOG_LEVEL=info
APP_KEY=
NODE_ENV=development
SESSION_DRIVER=cookie

CORS_HOST=http://localhost:4836
CORS_ENABLED=true
`
  );
}

if (!fs.existsSync(tmpDir)) {
  console.log('📂 Creating tmp directory...');
  fs.mkdirSync(tmpDir);
}

console.log('🔑 Generating AdonisJS APP_KEY...');
execSync('node ace generate:key', { cwd: backendDir, stdio: 'inherit' });

console.log('📦 Running database migrations...');
execSync('node ace migration:run', { cwd: backendDir, stdio: 'inherit' });

console.log('📊 Seeding database...');
execSync('node ace db:seed', { cwd: backendDir, stdio: 'inherit' });

console.log('✅ Backend setup complete!');
