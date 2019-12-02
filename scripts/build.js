const fs = require('fs');

const BUFFER = Buffer.from('#!/usr/bin/env node\n');
const FILE = './bin/entry.js';
const DATA = fs.readFileSync(FILE); 

const fd = fs.openSync(FILE, 'w+');

fs.writeSync(fd, BUFFER, 0, BUFFER.length, 0);
fs.writeSync(fd, DATA, 0, DATA.length, BUFFER.length);
fs.closeSync(fd);
