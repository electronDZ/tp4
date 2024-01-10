const { ArithmeticEncoder, ArithmeticDecoder } = require('./encoder'); // replace 'your-file' with the actual file name

describe('Arithmetic Encoding and Decoding', () => {
  test('it should encode and decode correctly', () => {
    const input = 'abdallaaa22213abdllahabdalahab'; // replace this with actual input
    const encoded = ArithmeticEncoder(input);
    const decoded = ArithmeticDecoder(encoded);

    expect(decoded).toEqual(input);
  });

  // Add more tests as needed
});
