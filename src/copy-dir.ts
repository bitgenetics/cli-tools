/**
 * @author Mike Benjamin
 * @description supply os agnostic directory copy for build processes
 */

import * as os from 'os';
import * as path from 'path';
import { execSync } from 'child_process';

const winCmdStr =
  'xcopy /s /e /i /Y ' + path.join(process.cwd(), process.argv[2]) + ' ' + path.join(process.cwd(), process.argv[3]);
const unixCmdStr =
  'cp -a ' + path.join(process.cwd(), process.argv[2]) + ' ' + path.join(process.cwd(), process.argv[3]);
const targetCmd = /windows/i.test(os.type()) ? winCmdStr : unixCmdStr;
try {
  execSync(targetCmd);
} catch (err) {
  console.error(err.message);
}

export function copyDir(): Buffer {
  return execSync(targetCmd, { stdio: 'inherit' });
}

if (require.main === module) {
  copyDir();
}
