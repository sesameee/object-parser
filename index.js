let inputValue = {
  hired: {
    be: {
      to: {
        deserve: "I",
      },
    },
  },
};

function merge() {
  let dst = {},
    src,
    p,
    args = [].splice.call(arguments, 0);
  while (args.length > 0) {
    src = args.splice(0, 1)[0];
    if (toString.call(src) == "[object Object]") {
      for (p in src) {
        if (src.hasOwnProperty(p)) {
          if (toString.call(src[p]) == "[object Object]") {
            dst[p] = merge(dst[p] || {}, src[p]);
          } else {
            dst[p] = src[p];
          }
        }
      }
    }
  }
  return dst;
}

/**
 *
 * @param {{
 * arrVal:Array,
 * outputObject:Object
 * }} param0
 */
export const arrayToObject = ({ arrVal, outputObject }) => {
  const [firstKey, ...othersKey] = arrVal;
  if (arrVal.length > 2) {
    if (firstKey) {
      outputObject[firstKey] = arrayToObject({
        arrVal: othersKey,
        outputObject: { ...outputObject },
      });
      return { ...outputObject };
    }
  } else {
    outputObject[firstKey] = othersKey[0];
    return { ...outputObject };
  }
};

/**
 *
 * @param {{
 * val:Object,
 * string:String,
 * res:Array
 * }}
 */
export const objectParser = ({ val, string, res }) => {
  if (typeof val == "object") {
    for (let index = 0; index < Object.keys(val).length; index++) {
      const key = Object.keys(val)[index];
      const newstring = string + key + "|";
      objectParser({ val: val[key], string: newstring, res });
    }
  }
  if (typeof val == "string") {
    const newstring = string + val;
    res.push(newstring);
  }

  return res;
};

/**
 *
 * @param {Object} inputValue
 */
export const doParser = (inputValue) => {
  const resArr = objectParser({
    val: inputValue,
    string: "",
    res: [],
  });

  const answer = resArr.reduce((acc, cur) => {
    const arr = cur.split("|");
    const newObject = arrayToObject({
      arrVal: arr.reverse(),
      outputObject: {},
    });
    return merge(acc, newObject);
  }, {});
  return answer;
};

doParser(inputValue);
