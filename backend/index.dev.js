require('dotenv').config();

require('@babel/register')({
  extensions: ['.js', '.ts']
});

require('./index.ts');
