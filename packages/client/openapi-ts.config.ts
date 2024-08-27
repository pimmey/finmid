import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: 'fetch',
  input: 'http://localhost:3000/static/swagger.yaml',
  output: {
    path: './src/data/__generated__',
    lint: 'eslint',
    format: 'prettier',
  },
  services: {
    asClass: true,
  },
  types: {
    enums: 'javascript',
  },
});
