import { getSM2Curve, toBigInteger } from "./sm2-curve";
import { Curve } from "ecurve";
import { BigInteger, SecureRandom } from "jsbn";
import * as BN from "bn.js";
const rng = new SecureRandom();
import { sm2, KeyPairPoint } from "sm-crypto";

/**
 * Cipher Mode
 * - `0`：C1C2C3
 * - `1`：C1C3C2
 */
type CipherMode = 0 | 1;

export class SM2 {
  private curve: Curve;
  constructor() {
    this.curve = getSM2Curve();
  }
  private _leftPad(input, num) {
    if (input.length >= num) return input;

    return new Array(num - input.length + 1).join("0") + input;
  }

  generateKey() {
    let pri;
    const limit = new BN(this.curve.n.toHex(), "hex").sub(new BN(2));
    let prihex: BigInteger;
    do {
      prihex = new BigInteger(this.curve.n.bitLength(), rng)
        .mod(this.curve.n.subtract(BigInteger.ONE))
        .add(BigInteger.ONE);
      pri = new BN(prihex.toString(16), "hex");
    } while (pri.cmp(limit) > 0);
    const curvePt = this.getQ(prihex);
    const x = curvePt.affineX.toBuffer(32);
    const y = curvePt.affineY.toBuffer(32);
    const publicKey = Buffer.concat([Buffer.from([0x04]), x, y]);
    return {
      privateKey: this._leftPad(prihex.toString(16), 64),
      publicKey: publicKey.toString("hex"),
      pubX: x.toString("hex"),
      pubY: y.toString("hex"),
    };
  }
  getQ(d: BigInteger) {
    const G = this.curve.G;
    const Q = G.multiply(d);
    return Q;
  }
  getCompressedPub(d: string, compressed = true) {
    const G = this.curve.G;
    const Q = G.multiply(toBigInteger(d));
    return Q.getEncoded(compressed).toString("hex");
  }
  doSignature(
    msg,
    privateKey,
    options?: {
      pointPool?: KeyPairPoint[];
      der?: boolean;
      hash?: boolean;
      publicKey?: string;
    }
  ) {
    return sm2.doSignature(msg, privateKey, options);
  }
  doVerifySignature(
    msg: string,
    signHex: string,
    publicKey: string,
    options?: {
      der?: boolean;
      hash?: boolean;
      publicKey?: string;
    }
  ) {
    return sm2.doVerifySignature(msg, signHex, publicKey, options);
  }
  doEncrypt(msg: string, publicKey: string, cipherMode?: CipherMode): string {
    return sm2.doEncrypt(msg, publicKey, cipherMode);
  }
  doDecrypt(encryptData: string, privateKey: string, cipherMode?: CipherMode): string {
    return sm2.doDecrypt(encryptData, privateKey, cipherMode);
  }
}
