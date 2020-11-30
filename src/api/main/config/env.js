'use strict'
const path = require('path')

const env = {
  DATABASE_USERNAME: process.env.DATABASE_USERNAME || null,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || null,
  DATABASE: process.env.DATABASE || 'data.sqlite',
  DATABASE_DIALECT: process.env.DATABASE_DIALECT || 'sqlite',
  DATABASE_STORAGE: process.env.DATABASE_STORAGE || 'data.sqlite',
  PORT: 8019,
  NODE_ENV: process.env.NODE_ENV || 'prod',
  BASE_URL: process.env.BASE_URL || 'http://localhost:8019',
}

module.exports = env
