# gioneco-sm2

## Usage
```bash
npm i gioneco-sm2
```

```js
const { SM2 } = require("../dist");
const sm2 = new SM2();
const keys = sm2.generateKey();
const compressedPub = sm2.getCompressedPub(keys.privateKey);
```