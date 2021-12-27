import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixtureFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

const cases = [
  ['json', 'stylish'],
  ['yml', 'stylish'],
  ['json', 'plain'],
  ['yml', 'plain'],
  ['json', 'json'],
  ['yml', 'json'],
];

describe.each(cases)('genDiff', (extention, format) => {
  test(`${format} object`, () => {
    const expected = readFixtureFile(`${format}.txt`);
    const first = getFixturePath(`file1.${extention}`);
    const second = getFixturePath(`file2.${extention}`);
    const actual = genDiff(first, second, format);
    expect(actual).toEqual(expected);
  });
});