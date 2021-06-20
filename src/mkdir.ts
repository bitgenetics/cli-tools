/**
 * @author Mike Benjamin
 * @description supply os agnostic directory creation command for use in build process
 */

import * as os from 'os';
import * as path from 'path';
import { execSync } from 'child_process';

const winCmdStr = 'mkdir ' + path.join(process.cwd(), process.argv[2]);
const unixCmdStr = 'mkdir ' + path.join(process.cwd(), process.argv[2]);
const targetCmd = /windows/i.test(os.type()) ? winCmdStr : unixCmdStr;

export function mkDir(): Buffer {
  return execSync(targetCmd, { stdio: 'inherit' });
}

if (require.main === module) {
  mkDir();
}
