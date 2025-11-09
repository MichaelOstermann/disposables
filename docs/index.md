---
aside: true
---

# disposables

<Badge type="info" class="size">
    <span>Minified</span>
    <span>1.43 KB</span>
</Badge>

<Badge type="info" class="size">
    <span>Minzipped</span>
    <span>593 B</span>
</Badge>

**Small & fast disposables.**

## Example

```ts
import { Dsp } from "@monstermann/disposables";

const dspA = Dsp.create();
const dspB = Dsp.create();

Dsp.add(dspA, () => console.log(1));
Dsp.add(dspA, () => console.log(2));
Dsp.add(dspB, () => console.log(3));
Dsp.add(dspB, () => console.log(4));
Dsp.add(dspA, dspB);

Dsp.dispose(dspA); // Prints: 4, 3, 2, 1
```

## Installation

::: code-group

```sh [npm]
npm install @monstermann/disposables
```

```sh [pnpm]
pnpm add @monstermann/disposables
```

```sh [yarn]
yarn add @monstermann/disposables
```

```sh [bun]
bun add @monstermann/disposables
```

:::

## Benchmarks

Apple M1 Max, Node v24.0.1

### bench-dispose-cbs

- Setup: Create a disposable with N callbacks attached
- Bench: Dispose above

| name                            | ops/sec | time/op | margin | samples |
| ------------------------------- | ------: | ------: | :----: | ------: |
| Dsp.dispose(dsp) x 1            |     33M |    23ns | ±0.07% |     43M |
| Dsp.dispose(dsp) x 10           |     24M |    40ns | ±0.11% |     25M |
| Dsp.dispose(dsp) x 100          |      4M |   237ns | ±0.07% |      4M |
| DisposableStack.dispose() x 1   |     22M |    51ns | ±0.07% |     20M |
| DisposableStack.dispose() x 10  |      4M |   245ns | ±0.07% |      4M |
| DisposableStack.dispose() x 100 |    468K |     2µs | ±0.10% |    463K |

### bench-dispose-dsps-wide

- Setup: Create a disposable with N other disposables attached
- Bench: Dispose above

| name                            | ops/sec | time/op | margin | samples |
| ------------------------------- | ------: | ------: | :----: | ------: |
| Dsp.dispose(dsp) x 1            |     27M |    30ns | ±0.07% |     34M |
| Dsp.dispose(dsp) x 10           |      9M |   118ns | ±0.11% |      8M |
| Dsp.dispose(dsp) x 100          |    986K |     1µs | ±4.23% |    877K |
| DisposableStack.dispose() x 1   |     12M |    83ns | ±0.07% |     12M |
| DisposableStack.dispose() x 10  |      2M |   569ns | ±0.08% |      2M |
| DisposableStack.dispose() x 100 |    188K |     5µs | ±0.09% |    186K |

### bench-dispose-dsps-deep

- Setup: Create a disposable with N other disposables attached, arranged as a chain
- Bench: Dispose above

| name                            | ops/sec | time/op | margin | samples |
| ------------------------------- | ------: | ------: | :----: | ------: |
| Dsp.dispose(dsp) x 1            |     29M |    26ns | ±0.08% |     38M |
| Dsp.dispose(dsp) x 10           |      7M |   156ns | ±0.24% |      6M |
| Dsp.dispose(dsp) x 100          |    682K |     2µs | ±3.65% |    634K |
| DisposableStack.dispose() x 1   |     13M |    83ns | ±0.07% |     12M |
| DisposableStack.dispose() x 10  |      1M |   783ns | ±0.07% |      1M |
| DisposableStack.dispose() x 100 |    110K |     9µs | ±0.09% |    109K |

### bench-dispose-dsps-wide-reverse

- Setup: Create a disposable with N other disposables attached
- Bench: Dispose above in reverse order, one by one

| name                            | ops/sec | time/op | margin | samples |
| ------------------------------- | ------: | ------: | :----: | ------: |
| Dsp.dispose(dsp) x 1            |     29M |    26ns | ±0.08% |     38M |
| Dsp.dispose(dsp) x 10           |      7M |   155ns | ±1.19% |      6M |
| Dsp.dispose(dsp) x 100          |    767K |     1µs | ±0.10% |    756K |
| DisposableStack.dispose() x 1   |     20M |    55ns | ±0.08% |     18M |
| DisposableStack.dispose() x 10  |      3M |   370ns | ±0.05% |      3M |
| DisposableStack.dispose() x 100 |    294K |     3µs | ±0.05% |    293K |

### bench-dispose-dsps-deep-reverse

- Setup: Create a disposable with N other disposables attached, arranged as a chain
- Bench: Dispose above in reverse order, one by one

| name                            | ops/sec | time/op | margin | samples |
| ------------------------------- | ------: | ------: | :----: | ------: |
| Dsp.dispose(dsp) x 1            |     24M |    40ns | ±0.04% |     25M |
| Dsp.dispose(dsp) x 10           |      5M |   223ns | ±0.06% |      4M |
| Dsp.dispose(dsp) x 100          |    471K |     2µs | ±2.48% |    462K |
| DisposableStack.dispose() x 1   |     11M |    93ns | ±0.31% |     11M |
| DisposableStack.dispose() x 10  |      1M |   841ns | ±0.05% |      1M |
| DisposableStack.dispose() x 100 |    103K |    10µs | ±0.06% |    103K |

### bench-link-cbs

- Setup: Create a disposable
- Bench: Attach N callbacks to it

| name                                              | ops/sec | time/op | margin | samples |
| ------------------------------------------------- | ------: | ------: | :----: | ------: |
| Dsp.add(dsp, callback) x 1                        |     34M |    22ns | ±0.06% |     45M |
| Dsp.add(dsp, callback) x 100                      |      2M |   768ns | ±6.35% |      1M |
| Dsp.add(dsp, callback) x 1000                     |    158K |     7µs | ±1.56% |    137K |
| DisposableStack.adopt(undefined, callback) x 1    |     24M |    43ns | ±0.28% |     23M |
| DisposableStack.adopt(undefined, callback) x 100  |    496K |     2µs | ±6.78% |    451K |
| DisposableStack.adopt(undefined, callback) x 1000 |     46K |    23µs | ±0.75% |     44K |

### bench-link-dsps

- Setup: Create a disposable
- Bench: Attach N other disposables to it

| name                                              | ops/sec | time/op | margin | samples |
| ------------------------------------------------- | ------: | ------: | :----: | ------: |
| Dsp.add(dsp, Dsp.create()) x 1                    |     34M |    22ns | ±0.07% |     45M |
| Dsp.add(dsp, Dsp.create()) x 100                  |      2M |   762ns | ±7.31% |      1M |
| Dsp.add(dsp, Dsp.create()) x 1000                 |    162K |     7µs | ±2.75% |    137K |
| DisposableStack.use(new DisposableStack()) x 1    |     11M |    91ns | ±0.06% |     11M |
| DisposableStack.use(new DisposableStack()) x 100  |    151K |     7µs | ±6.90% |    142K |
| DisposableStack.use(new DisposableStack()) x 1000 |     15K |    68µs | ±0.61% |     15K |

### bench-create

- Bench: Creates N empty disposables

| name                         | ops/sec | time/op | margin | samples |
| ---------------------------- | ------: | ------: | :----: | ------: |
| Dsp.create() x 1             |     36M |    21ns | ±0.08% |     48M |
| Dsp.create() x 100           |     24M |    41ns | ±0.85% |     24M |
| Dsp.create() x 1000          |      3M |   340ns | ±0.07% |      3M |
| new DisposableStack() x 1    |     22M |    51ns | ±5.95% |     20M |
| new DisposableStack() x 100  |    359K |     3µs | ±8.03% |    332K |
| new DisposableStack() x 1000 |     36K |    28µs | ±0.40% |     36K |

### memory

Heapsize for 1M instances:

- `Dsp.create()`: 247.57 MB
- `new DisposableStack()`: 299.39 MB

## Tree-shaking

### Installation

::: code-group

```sh [npm]
npm install -D @monstermann/tree-shake-disposables @monstermann/unplugin-tree-shake-import-namespaces
```

```sh [pnpm]
pnpm -D add @monstermann/tree-shake-disposables @monstermann/unplugin-tree-shake-import-namespaces
```

```sh [yarn]
yarn -D add @monstermann/tree-shake-disposables @monstermann/unplugin-tree-shake-import-namespaces
```

```sh [bun]
bun -D add @monstermann/tree-shake-disposables @monstermann/unplugin-tree-shake-import-namespaces
```

:::

### Usage

::: code-group

```ts [Vite]
// vite.config.ts
import treeshake from "@monstermann/unplugin-tree-shake-import-namespaces/vite";
import treeshakeDisposables from "@monstermann/tree-shake-disposables";

export default defineConfig({
    plugins: [
        treeshake({
            resolve: [treeshakeDisposables],
        }),
    ],
});
```

```ts [Rollup]
// rollup.config.js
import treeshake from "@monstermann/unplugin-tree-shake-import-namespaces/rollup";
import treeshakeDisposables from "@monstermann/tree-shake-disposables";

export default {
    plugins: [
        treeshake({
            resolve: [treeshakeDisposables],
        }),
    ],
};
```

```ts [Rolldown]
// rolldown.config.js
import treeshake from "@monstermann/unplugin-tree-shake-import-namespaces/rolldown";
import treeshakeDisposables from "@monstermann/tree-shake-disposables";

export default {
    plugins: [
        treeshake({
            resolve: [treeshakeDisposables],
        }),
    ],
};
```

```ts [Webpack]
// webpack.config.js
const treeshake = require("@monstermann/unplugin-tree-shake-import-namespaces/webpack");
const treeshakeDisposables = require("@monstermann/tree-shake-disposables");

module.exports = {
    plugins: [
        treeshake({
            resolve: [treeshakeDisposables],
        }),
    ],
};
```

```ts [Rspack]
// rspack.config.js
const treeshake = require("@monstermann/unplugin-tree-shake-import-namespaces/rspack");
const treeshakeDisposables = require("@monstermann/tree-shake-disposables");

module.exports = {
    plugins: [
        treeshake({
            resolve: [treeshakeDisposables],
        }),
    ],
};
```

```ts [ESBuild]
// esbuild.config.js
import { build } from "esbuild";
import treeshake from "@monstermann/unplugin-tree-shake-import-namespaces/esbuild";
import treeshakeDisposables from "@monstermann/tree-shake-disposables";

build({
    plugins: [
        treeshake({
            resolve: [treeshakeDisposables],
        }),
    ],
});
```

:::
