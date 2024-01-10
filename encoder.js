// Frequency table for input string
function calculateFrequency(str) {
  let freqs = {};
  for (let i = 0; i < str.length; i++) {
    let character = str.charAt(i);
    if (freqs[character]) {
      freqs[character]++;
    } else {
      freqs[character] = 1;
    }
  }
  // Convert frequencies to probabilities
  let total = str.length;
  for (let character in freqs) {
    freqs[character] /= total;
  }
  return freqs;
}

// Calculate cumulative distribution
function calculateCumulative(freqs) {
  /* 
freq = { A: 0.4, B: 0.4, C: 0.2 }
*/
  let cumulative = {};

  // {A: 0, B: 0,4, C: 0.8 }
  let sum = 0;
  for (let character in freqs) {
    cumulative[character] = sum;
    sum += freqs[character];
  }
  return cumulative;
}

// Arithmetic Encoder
function ArithmeticEncoder(str) {
  let freqs = calculateFrequency(str);
  let cumulative = calculateCumulative(freqs);

  let low = 0.0;
  let high = 1.0;
  let range = 0.0;

  for (let i = 0; i < str.length; i++) {
    range = high - low;
    high = low + range * (cumulative[str.charAt(i)] + freqs[str.charAt(i)]);
    low = low + range * cumulative[str.charAt(i)];
  }


  const encoded = (high + low) / 2;

  return {
    encoded,
    cumulative,
    freqs,
    strLength: str.length
  }
}

// Arithmetic Decoder
function ArithmeticDecoder({ encoded, strLength, cumulative, freqs }) {
  let low = 0.0;
  let high = 1.0;
  let range = 0.0;
  let output = "";

  for (let i = 0; i < strLength; i++) {
    range = high - low;
    let found = false;
    for (let character in cumulative) {
      if (encoded >= low + range * cumulative[character] && encoded < low + range * (cumulative[character] + freqs[character])) {
        output += character;
        high = low + range * (cumulative[character] + freqs[character]);
        low = low + range * cumulative[character];
        found = true;
        break;
      }
    }
    if (!found) {
      break;
    }
  }

  return output;
}

// // Test
// let input = "ABCAB";

// let encoded = ArithmeticEncoder(input);
// let decoded = ArithmeticDecoder(encoded);

// console.log("Input  : ", input);
// console.log("Encoded: ", encoded.encoded);
// console.log("Decoded: ", decoded);

module.exports = { ArithmeticEncoder, ArithmeticDecoder }