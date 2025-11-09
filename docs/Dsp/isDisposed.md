# isDisposed

```ts
function Dsp.isDisposed(disposer: Dsp): boolean;
```

Returns a boolean indicating whether the provided `Dsp` instance has been disposed.

## Example

```ts
import { Dsp } from "@monstermann/disposables";

const dsp = Dsp.create();
Dsp.isDisposed(dsp); // false
Dsp.dispose(dsp);
Dsp.isDisposed(dsp); // true
```
