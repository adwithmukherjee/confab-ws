import dev from "./dev";
import prod from "./prod";

let keys;

if (process.env.NODE_ENV === "production") {
  //return prod set of keys
  keys = prod;
} else {
  //return dev keys
  keys = dev;
}

export default keys;
