# backend/package.json
```js
{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node ./dist/index.js",
    "server": "wait-on dist/index.js && nodemon ./dist/index.js",
    "watch": "tsc -w",
    "build": "tsc && npm run copy-files",
    "copy-files": "copyfiles -u 1 \"src/views/**/*\" dist/",
    "watch-views": "nodemon --watch src/views -e ejs -x \"npm run copy-files\"",
    "dev": "concurrently \"npm run watch\" \"npm run server\" \"npx prisma studio\" \"npm run watch-views\""
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module",
  "dependencies": {
    "@prisma/client": "^6.7.0",
    "bullmq": "^5.52.2",
    "concurrently": "^9.1.2",
    "cors": "^2.8.5",
    "dotenv": "^16.5.0",
    "ejs": "^3.1.10",
    "express": "^5.1.0",
    "nodemailer": "^7.0.3",
    "prisma": "^6.7.0",
    "zod": "^3.25.23"
  },
  "devDependencies": {
    "@types/cors": "^2.8.17",
    "@types/ejs": "^3.1.5",
    "@types/express": "^5.0.1",
    "copyfiles": "^2.4.1",
    "nodemon": "^3.1.10",
    "typescript": "^5.8.3",
    "wait-on": "^8.0.3"
  }
}
```
# backend/tsconfig.json

```js
 {
    "compilerOptions": {
      "target": "ES2020",
      "module": "ESNext",
      "moduleResolution": "Node",
      "outDir": "dist",
      "rootDir": "src",
      "strict": true,
      "esModuleInterop": true,
      "skipLibCheck": true
    },
    "include": ["src"],
    "exclude": ["node_modules", "dist"]
  },
```