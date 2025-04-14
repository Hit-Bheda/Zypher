import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface Props {
  selectedAlgorithm: string;
}

const TheoryTabs: React.FC<Props> = ({ selectedAlgorithm }) => {
  return (
    <Tabs defaultValue="theory">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="theory">Theory</TabsTrigger>
        <TabsTrigger value="comparison">Algorithm Comparison</TabsTrigger>
      </TabsList>
      <TabsContent value="theory">
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedAlgorithm === "caesar" && "Caesar Cipher"}
              {selectedAlgorithm === "hill" && "Hill Cipher"}
              {selectedAlgorithm === "rsa" && "RSA Encryption"}
              {selectedAlgorithm === "playfair" && "Playfair Cipher"}
              {selectedAlgorithm === "railfence" && "Rail Fence Cipher"}
              {selectedAlgorithm === "vernam" && "Vernam Cipher (One-Time Pad)"}
            </CardTitle>
            <CardDescription>
              {selectedAlgorithm === "caesar" && "A simple substitution cipher"}
              {selectedAlgorithm === "hill" &&
                "A polygraphic substitution cipher"}
              {selectedAlgorithm === "rsa" &&
                "An asymmetric cryptographic algorithm"}
              {selectedAlgorithm === "playfair" &&
                "A manual symmetric encryption technique"}
              {selectedAlgorithm === "railfence" && "A transposition cipher"}
              {selectedAlgorithm === "vernam" &&
                "A theoretically unbreakable symmetric cipher"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedAlgorithm === "caesar" && (
              <>
                <p>
                  The Caesar Cipher is one of the earliest and simplest
                  encryption techniques. Named after Julius Caesar, who used it
                  to communicate with his generals, it works by shifting each
                  letter in the plaintext by a fixed number of positions down
                  the alphabet.
                </p>
                <h3 className="text-lg font-medium mt-4">Historical Context</h3>
                <p>
                  Julius Caesar used this cipher with a shift of 3 to protect
                  messages of military significance. According to Suetonius,
                  Caesar used a shift of three positions to the right for his
                  private correspondence. This method was used throughout the
                  Roman Empire and remained in use for many centuries.
                </p>
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Formula</AlertTitle>
                  <AlertDescription>
                    <p className="font-mono">
                      Encryption: E(x) = (x + k) mod 26
                      <br />
                      Decryption: D(x) = (x - k) mod 26
                    </p>
                    <p className="mt-2">
                      Where x is the position of the character in the alphabet
                      (0-25) and k is the shift value.
                    </p>
                  </AlertDescription>
                </Alert>
                <h3 className="text-lg font-medium mt-4">
                  Mathematical Analysis
                </h3>
                <p>
                  The Caesar Cipher is a special case of a more general class of
                  substitution ciphers. Mathematically, it can be expressed
                  using modular arithmetic, where each letter is treated as a
                  number (A=0, B=1, ..., Z=25), and encryption involves adding
                  the shift value and taking modulo 26.
                </p>
                <h3 className="text-lg font-medium mt-4">Security Analysis</h3>
                <p>
                  The Caesar Cipher is extremely weak by modern standards for
                  several reasons:
                </p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>
                    With only 25 possible keys, it can be broken by trying each
                    shift value (brute force attack).
                  </li>
                  <li>
                    It is vulnerable to frequency analysis, as the frequency
                    distribution of letters in the ciphertext matches that of
                    the language.
                  </li>
                  <li>
                    It provides no diffusion or confusion, which are essential
                    properties of modern ciphers.
                  </li>
                </ul>
                <h3 className="text-lg font-medium mt-4">
                  Modern Applications
                </h3>
                <p>
                  While no longer used for serious security purposes, the Caesar
                  Cipher is valuable for:
                </p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>
                    Educational purposes to introduce basic cryptographic
                    concepts
                  </li>
                  <li>Puzzles and games</li>
                  <li>
                    Understanding the historical development of cryptography
                  </li>
                </ul>
              </>
            )}

            {selectedAlgorithm === "hill" && (
              <>
                <p>
                  The Hill Cipher, invented by Lester S. Hill in 1929, is a
                  polygraphic substitution cipher based on linear algebra. It
                  operates on blocks of letters (typically 2x2 or 3x3) and uses
                  matrix multiplication for encryption and the inverse matrix
                  for decryption.
                </p>
                <h3 className="text-lg font-medium mt-4">Historical Context</h3>
                <p>
                  Lester S. Hill first described this cipher in the journal The
                  American Mathematical Monthly in 1929. It was one of the first
                  practical polygraphic ciphers that could operate on more than
                  three symbols at once. {"Hill's"} work represented a
                  significant advancement in the application of mathematics to
                  cryptography.
                </p>
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Formula</AlertTitle>
                  <AlertDescription>
                    <p className="font-mono">
                      Encryption: C = KP (mod 26)
                      <br />
                      Decryption: P = K⁻¹C (mod 26)
                    </p>
                    <p className="mt-2">
                      Where P is the plaintext matrix, C is the ciphertext
                      matrix, K is the key matrix, and K⁻¹ is the inverse of K.
                    </p>
                  </AlertDescription>
                </Alert>
                <h3 className="text-lg font-medium mt-4">
                  Mathematical Analysis
                </h3>
                <p>
                  The Hill Cipher relies on several key concepts from linear
                  algebra:
                </p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>
                    Matrix multiplication: Used to transform plaintext into
                    ciphertext
                  </li>
                  <li>
                    Modular arithmetic: All operations are performed modulo 26
                    (for the English alphabet)
                  </li>
                  <li>
                    Matrix invertibility: The key matrix must be invertible in
                    ℤ₂₆ for decryption to be possible
                  </li>
                  <li>
                    Determinants: The determinant of the key matrix must be
                    coprime with 26
                  </li>
                </ul>
                <p className="mt-2">
                  For a 3×3 matrix, the encryption process involves converting
                  three plaintext letters into numerical values, multiplying by
                  the key matrix, and converting the resulting values back to
                  letters.
                </p>
                <h3 className="text-lg font-medium mt-4">Security Analysis</h3>
                <p>
                  The Hill Cipher offers several security advantages over simple
                  substitution ciphers:
                </p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>
                    It disguises single-letter frequencies, making frequency
                    analysis more difficult
                  </li>
                  <li>
                    The key space is much larger than simple substitution
                    ciphers
                  </li>
                  <li>
                    For a 3×3 matrix, there are approximately 2.7×10⁶ possible
                    keys
                  </li>
                </ul>
                <p className="mt-2">However, it has vulnerabilities:</p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>
                    Vulnerable to known-plaintext attacks if enough
                    plaintext-ciphertext pairs are available
                  </li>
                  <li>
                    Linear nature makes it susceptible to algebraic attacks
                  </li>
                  <li>No diffusion across blocks</li>
                </ul>
              </>
            )}

            {selectedAlgorithm === "rsa" && (
              <>
                <p>
                  RSA (Rivest–Shamir–Adleman) is an asymmetric cryptographic
                  algorithm widely used for secure data transmission. Unlike
                  symmetric key algorithms, RSA uses a pair of keys: a public
                  key for encryption and a private key for decryption.
                </p>
                <h3 className="text-lg font-medium mt-4">Historical Context</h3>
                <p>
                  RSA was publicly described in 1977 by Ron Rivest, Adi Shamir,
                  and Leonard Adleman at MIT. The algorithm was patented in 1983
                  by MIT and became one of the first practical public-key
                  cryptosystems widely used for secure data transmission.
                  Interestingly, an equivalent system was developed in 1973 by
                  the British intelligence agency GCHQ, but this work was
                  classified until 1997.
                </p>
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Key Generation</AlertTitle>
                  <AlertDescription>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Choose two distinct large prime numbers p and q</li>
                      <li>Compute n = p × q</li>
                      <li>Compute φ(n) = (p - 1) × (q - 1)</li>
                      <li>
                        Choose an integer e such that 1 &lt; e &lt; φ(n) and
                        gcd(e, φ(n)) = 1
                      </li>
                      <li>Compute d such that d × e ≡ 1 (mod φ(n))</li>
                    </ol>
                    <p className="mt-2">
                      Public key: (n, e)
                      <br />
                      Private key: (n, d)
                    </p>
                  </AlertDescription>
                </Alert>
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Formula</AlertTitle>
                  <AlertDescription>
                    <p className="font-mono">
                      Encryption: c = m^e mod n<br />
                      Decryption: m = c^d mod n
                    </p>
                    <p className="mt-2">
                      Where m is the plaintext message, c is the ciphertext, e
                      is the public exponent, and d is the private exponent.
                    </p>
                  </AlertDescription>
                </Alert>
                <h3 className="text-lg font-medium mt-4">Security Analysis</h3>
                <p>
                  {"RSA's"} security relies on the practical difficulty of
                  factoring the product of two large prime numbers:
                </p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>
                    Key sizes of 2048 bits or more are considered secure against
                    conventional computing attacks
                  </li>
                  <li>
                    The largest RSA key factored to date (as of 2023) is 829
                    bits (RSA-250)
                  </li>
                  <li>
                    Quantum computers using {"Shor's"} algorithm could
                    theoretically break RSA
                  </li>
                </ul>
              </>
            )}

            {selectedAlgorithm === "playfair" && (
              <>
                <p>
                  The Playfair Cipher is a manual symmetric encryption technique
                  invented by Charles Wheatstone in 1854, but named after Lord
                  Playfair who promoted its use. It was the first practical
                  digraph substitution cipher, encrypting pairs of letters
                  instead of single letters.
                </p>
                <h3 className="text-lg font-medium mt-4">Historical Context</h3>
                <p>
                  The Playfair cipher was used extensively in tactical
                  communications by British forces in World War I and for a
                  short period in World War II. It was considered to be
                  reasonably secure for its time, as it resisted simple
                  frequency analysis attacks that easily broke simple
                  substitution ciphers.
                </p>
                <h3 className="text-lg font-medium mt-4">How It Works</h3>
                <p>
                  The Playfair cipher uses a 5×5 grid of letters (the key
                  square) constructed using a keyword:
                </p>
                <ol className="list-decimal list-inside space-y-1 mt-2">
                  <li>
                    Create a 5×5 matrix using a keyword, filling the remaining
                    spaces with the rest of the alphabet (usually combining I
                    and J)
                  </li>
                  <li>Divide the plaintext into pairs of letters (digraphs)</li>
                  <li>
                    Apply special rules to encrypt each pair:
                    <ul className="list-disc list-inside ml-6 mt-1">
                      <li>
                        If both letters are in the same row, take the letter to
                        the right of each (wrapping around)
                      </li>
                      <li>
                        If both letters are in the same column, take the letter
                        below each (wrapping around)
                      </li>
                      <li>
                        If neither, form a rectangle and take the letters on the
                        same row but in the column of the other letter
                      </li>
                    </ul>
                  </li>
                </ol>
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>
                    Example Key Square (with keyword {"KEYWORD"})
                  </AlertTitle>
                  <AlertDescription>
                    <pre className="font-mono mt-2">
                      K E Y W O<br />R D A B C<br />F G H I L<br />M N P Q S
                      <br />T U V X Z<br />
                    </pre>
                    <p className="mt-2">
                      Note: J is combined with I in the traditional Playfair
                      cipher.
                    </p>
                  </AlertDescription>
                </Alert>
                <h3 className="text-lg font-medium mt-4">Security Analysis</h3>
                <p>
                  The Playfair cipher was a significant improvement over simple
                  substitution ciphers:
                </p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>
                    It resists simple frequency analysis since it encrypts
                    digraphs rather than single letters
                  </li>
                  <li>
                    There are 600 possible digraphs, making frequency analysis
                    more difficult
                  </li>
                  <li>
                    The key space is much larger than a simple Caesar cipher
                  </li>
                </ul>
                <p className="mt-2">However, it has weaknesses:</p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>
                    Digraph frequency analysis can still be used to break it
                  </li>
                  <li>
                    Known patterns in language (like common digraphs {"TH"},{" "}
                    {"ER"},{"ON"}) can help cryptanalysts
                  </li>
                  <li>
                    Modern computing power makes brute force attacks feasible
                  </li>
                </ul>
              </>
            )}

            {selectedAlgorithm === "railfence" && (
              <>
                <p>
                  The Rail Fence Cipher (also called the Zigzag Cipher) is a
                  form of transposition cipher that gets its name from the way
                  in which it is encoded. The plaintext is written downwards and
                  diagonally on successive {"rails"} of an imaginary fence, then
                  read off horizontally.
                </p>
                <h3 className="text-lg font-medium mt-4">Historical Context</h3>
                <p>
                  The Rail Fence cipher is one of the oldest and simplest
                  transposition techniques. It was used during the American
                  Civil War by the Union forces. While simple, it provided a
                  quick way to encrypt messages in the field without requiring
                  special equipment.
                </p>
                <h3 className="text-lg font-medium mt-4">How It Works</h3>
                <p>
                  The Rail Fence cipher works by writing the message in a zigzag
                  pattern across a number of rows (rails):
                </p>
                <ol className="list-decimal list-inside space-y-1 mt-2">
                  <li>Choose the number of rails (rows)</li>
                  <li>
                    Write the plaintext in a zigzag pattern down and up across
                    the rails
                  </li>
                  <li>Read off the ciphertext row by row</li>
                </ol>
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Example (with 3 rails)</AlertTitle>
                  <AlertDescription>
                    <p className="mt-2">Plaintext: {"HELLO WORLD"}</p>
                    <pre className="font-mono mt-2">
                      H . . . O . . . R . .<br />. E . L . W . O . L .<br />. .
                      L . . . D . . . .<br />
                    </pre>
                    <p className="mt-2">
                      Reading off row by row gives the ciphertext: {"HORELWOLD"}
                    </p>
                  </AlertDescription>
                </Alert>
                <h3 className="text-lg font-medium mt-4">Security Analysis</h3>
                <p>The Rail Fence cipher is quite weak by modern standards:</p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>
                    The key space is very small (only as many keys as there are
                    rails)
                  </li>
                  <li>It can be broken by trying all possible rail numbers</li>
                  <li>
                    It preserves the frequency distribution of letters in the
                    plaintext
                  </li>
                  <li>
                    It {"doesn't"} provide any confusion, only diffusion through
                    transposition
                  </li>
                </ul>
                <p className="mt-2">
                  Despite its weaknesses, the Rail Fence cipher is valuable for
                  educational purposes and as a building block for understanding
                  more complex transposition ciphers.
                </p>
              </>
            )}

            {selectedAlgorithm === "vernam" && (
              <>
                <p>
                  The Vernam Cipher, also known as the One-Time Pad (OTP), is a
                  symmetric encryption technique that combines plaintext with a
                  random key using modular addition. When implemented correctly,
                  it provides perfect secrecy and is theoretically unbreakable.
                </p>
                <h3 className="text-lg font-medium mt-4">Historical Context</h3>
                <p>
                  The cipher was invented by Gilbert Vernam in 1917, but its
                  mathematical proof of perfect secrecy was later established by
                  Claude Shannon in 1949. It was used extensively for diplomatic
                  and military communications during World War II and the Cold
                  War, most notably in the Washington-Moscow hotline.
                </p>
                <h3 className="text-lg font-medium mt-4">How It Works</h3>
                <p>The Vernam Cipher operates on these principles:</p>
                <ol className="list-decimal list-inside space-y-1 mt-2">
                  <li>
                    Generate a truly random key that is at least as long as the
                    plaintext
                  </li>
                  <li>
                    Convert both plaintext and key to numerical values (e.g.,
                    A=0, B=1, etc.)
                  </li>
                  <li>
                    Combine each plaintext character with the corresponding key
                    character using modular addition
                  </li>
                  <li>
                    Convert the resulting values back to characters to form the
                    ciphertext
                  </li>
                </ol>
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Formula</AlertTitle>
                  <AlertDescription>
                    <p className="font-mono">
                      Encryption: C = (P + K) mod 26
                      <br />
                      Decryption: P = (C - K + 26) mod 26
                    </p>
                    <p className="mt-2">
                      Where P is the plaintext character, K is the key
                      character, and C is the ciphertext character.
                    </p>
                  </AlertDescription>
                </Alert>
                <h3 className="text-lg font-medium mt-4">Perfect Secrecy</h3>
                <p>
                  The Vernam Cipher achieves perfect secrecy when implemented
                  correctly, meaning:
                </p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>
                    The key must be truly random (not generated by a
                    deterministic algorithm)
                  </li>
                  <li>The key must be at least as long as the plaintext</li>
                  <li>
                    Each key must be used exactly once (hence {"One-Time Pad"})
                  </li>
                  <li>The key must be kept completely secret</li>
                </ul>
                <h3 className="text-lg font-medium mt-4">Security Analysis</h3>
                <p>
                  When properly implemented, the One-Time Pad has these security
                  properties:
                </p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>
                    It is information-theoretically secure (proven by Claude
                    Shannon)
                  </li>
                  <li>
                    No amount of computational power can break it through brute
                    force
                  </li>
                  <li>
                    It is immune to all current and future technological
                    advances
                  </li>
                </ul>
                <p className="mt-2">
                  However, practical limitations make it difficult to use:
                </p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>Key generation and distribution is challenging</li>
                  <li>Secure storage of large keys is problematic</li>
                  <li>
                    Key reuse (which often happens in practice) completely
                    breaks security
                  </li>
                  <li>
                    {"It's"} vulnerable to known-plaintext attacks if the key is
                    reused
                  </li>
                </ul>
              </>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="comparison">
        <Card>
          <CardHeader>
            <CardTitle>Algorithm Comparison</CardTitle>
            <CardDescription>
              Comparing the strengths and weaknesses of different encryption
              algorithms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4">Algorithm</th>
                    <th className="text-left py-2 px-4">Type</th>
                    <th className="text-left py-2 px-4">Key Size</th>
                    <th className="text-left py-2 px-4">Security Level</th>
                    <th className="text-left py-2 px-4">Speed</th>
                    <th className="text-left py-2 px-4">Use Cases</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-4">Caesar Cipher</td>
                    <td className="py-2 px-4">Symmetric, Substitution</td>
                    <td className="py-2 px-4">5 bits (1-25)</td>
                    <td className="py-2 px-4">Very Low</td>
                    <td className="py-2 px-4">Very Fast</td>
                    <td className="py-2 px-4">Educational, Puzzles</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">Playfair Cipher</td>
                    <td className="py-2 px-4">Symmetric, Digraph</td>
                    <td className="py-2 px-4">Variable (keyword)</td>
                    <td className="py-2 px-4">Low</td>
                    <td className="py-2 px-4">Fast</td>
                    <td className="py-2 px-4">Historical, Educational</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">Hill Cipher</td>
                    <td className="py-2 px-4">Symmetric, Polygraphic</td>
                    <td className="py-2 px-4">
                      Variable (matrix size Polygraphic
                    </td>
                    <td className="py-2 px-4">Variable (matrix size)</td>
                    <td className="py-2 px-4">Low-Medium</td>
                    <td className="py-2 px-4">Fast</td>
                    <td className="py-2 px-4">Educational, Historical</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">Rail Fence Cipher</td>
                    <td className="py-2 px-4">Symmetric, Transposition</td>
                    <td className="py-2 px-4">Small (number of rails)</td>
                    <td className="py-2 px-4">Very Low</td>
                    <td className="py-2 px-4">Very Fast</td>
                    <td className="py-2 px-4">Educational, Historical</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">Vernam Cipher (OTP)</td>
                    <td className="py-2 px-4">Symmetric, Stream</td>
                    <td className="py-2 px-4">Equal to plaintext</td>
                    <td className="py-2 px-4">Perfect (theoretical)</td>
                    <td className="py-2 px-4">Fast</td>
                    <td className="py-2 px-4">High-security communications</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4">RSA</td>
                    <td className="py-2 px-4">Asymmetric</td>
                    <td className="py-2 px-4">1024-4096 bits</td>
                    <td className="py-2 px-4">High</td>
                    <td className="py-2 px-4">Slow</td>
                    <td className="py-2 px-4">
                      Secure Communications, Digital Signatures
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-medium">Key Differences</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Symmetric vs. Asymmetric:</strong> Most classical
                  ciphers (Caesar, Playfair, Hill, Rail Fence, Vernam) are
                  symmetric, while RSA is asymmetric.
                </li>
                <li>
                  <strong>Substitution vs. Transposition:</strong> Caesar,
                  Playfair, and Hill ciphers substitute characters, while Rail
                  Fence rearranges them.
                </li>
                <li>
                  <strong>Security Level:</strong> Only the Vernam Cipher (when
                  properly implemented) and RSA offer strong security for modern
                  applications.
                </li>
                <li>
                  <strong>Key Management:</strong> Asymmetric algorithms like
                  RSA solve the key distribution problem that plagues symmetric
                  algorithms.
                </li>
                <li>
                  <strong>Computational Requirements:</strong> Classical ciphers
                  can be performed manually, while RSA requires significant
                  computational power.
                </li>
              </ul>
            </div>

            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-medium">Evolution of Cryptography</h3>
              <p>
                The ciphers in this tool represent different eras in
                cryptographic history:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Ancient Era (Caesar):</strong> Simple substitution
                  ciphers used in ancient times
                </li>
                <li>
                  <strong>Pre-Modern Era (Playfair, Rail Fence):</strong> More
                  sophisticated manual techniques used in the 19th and early
                  20th centuries
                </li>
                <li>
                  <strong>Early Modern Era (Hill, Vernam):</strong>{" "}
                  Mathematically-based ciphers from the early 20th century
                </li>
                <li>
                  <strong>Modern Era (RSA):</strong> Computer-based cryptography
                  from the late 20th century to present
                </li>
              </ul>

              <p className="mt-4">
                This evolution shows how cryptography has progressed from simple
                techniques that could be performed by hand to complex
                mathematical algorithms that require computers to implement
                effectively.
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default TheoryTabs;
