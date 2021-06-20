/**
 * @author Mike Benjamin
 * @description supply os agnostic directory removal command for use in build process
 */

import * as os from 'os';
import * as path from 'path';
import { execSync } from 'child_process';

const winCmdStr = 'rmdir /S /Q ' + path.join(process.cwd(), process.argv[2]);
const unixCmdStr = 'rm -rdf ' + path.join(process.cwd(), process.argv[2]);
const targetCmd = /windows/i.test(os.type()) ? winCmdStr : unixCmdStr;

export function rmDir(): Buffer {
  return execSync(targetCmd, { stdio: 'inherit' });
}

if (require.main === module) {
  rmDir();
}
