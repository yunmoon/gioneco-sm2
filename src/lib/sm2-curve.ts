import BigInteger = require("bigi");
import { Curve } from "ecurve";

export function getSM2Curve() {
  var curve = {
    p: "FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000FFFFFFFFFFFFFFFF",
    a: "FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000FFFFFFFFFFFFFFFC",
    b: "28E9FA9E9D9F5E344D5A9E4BCF6509A7F39789F515AB8F92DDBCBD414D940E93",
    n: "FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFF7203DF6B21C6052B53BBF40939D54123",
    h: "01",
    Gx: "32C4AE2C1F1981195F9904466A39C9948FE30BBFF2660BE1715A4589334C74C7",
    Gy: "BC3736A2F4F6779C59BDCEE36B692153D0A9877CC62A474002DF32E52139F0A0",
  };

  if (!curve) return null;

  var p = new BigInteger(curve.p, 16, null);
  var a = new BigInteger(curve.a, 16, null);
  var b = new BigInteger(curve.b, 16, null);
  var n = new BigInteger(curve.n, 16, null);
  var h = new BigInteger(curve.h, 16, null);
  var Gx = new BigInteger(curve.Gx, 16, null);
  var Gy = new BigInteger(curve.Gy, 16, null);

  return new Curve(p, a, b, Gx, Gy, n, h);
}

export function toBigInteger(str: string) {
  return BigInteger.fromHex(str);
}
