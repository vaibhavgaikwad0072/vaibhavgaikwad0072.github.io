import { copyFileSync, existsSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

// GitHub Pages has no server rewrites. Serving a copy of index.html as 404.html
// lets BrowserRouter resolve deep links such as /projects/healthlens.
const dist = resolve('dist');
const index = resolve(dist, 'index.html');

if (!existsSync(index)) {
  console.error('postbuild: dist/index.html was not found.');
  process.exit(1);
}

copyFileSync(index, resolve(dist, '404.html'));
writeFileSync(resolve(dist, '.nojekyll'), '');

console.log('postbuild: wrote 404.html fallback and .nojekyll');
