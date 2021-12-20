#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import getComprasion from '../src/index.js';
const program = new Command();

program.option('-V, --version', 'output the version number');
program.description(
  ' Compares two configuration files and shows a difference.',
);
program.option('-f, --format [type]', 'output format');
program.arguments('<filepath1> <filepath2>');
program.action((filepath1, filepath2) => {
  const result = getComprasion(filepath1, filepath2);
  console.log(result);
  return result;
});
program.parse(process.argv);
  
export default program;