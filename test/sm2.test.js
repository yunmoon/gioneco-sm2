const { SM2 } = require("../dist");
const sm2 = new SM2();
function run() {
  const keys = sm2.generateKey();
  const compressedPub = sm2.getCompressedPub(keys.privateKey);
  console.log("compressed:", compressedPub);
  console.log(keys);
  let sign = sm2.doSignature(
    Buffer.from(
      "0102030405060708010203040506070801020304050607080102030405060708",
      "hex"
    ),
    keys.privateKey,
    {
      hash: true,
    }
  );
  console.log(sign);
  const result = sm2.doVerifySignature(
    Buffer.from(
      "0102030405060708010203040506070801020304050607080102030405060708",
      "hex"
    ),
    sign,
    keys.publicKey,
    {
      // der: true,
      // publicKey: keys.publicKey,
      hash: true,
    }
  );
  console.log(result);
}
run();
