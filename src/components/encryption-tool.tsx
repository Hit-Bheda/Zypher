"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowDownUp, KeyRound, Lock, Unlock } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Encryption algorithms
import {
  caesarCipher,
  hillCipher,
  rsaEncryption,
  playfairCipher,
  railFenceCipher,
  vernamCipher,
} from "@/lib/encryption";
import TheoryTabs from "./theory-tabs";

export default function EncryptionTool() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("caesar");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isEncrypting, setIsEncrypting] = useState(true);

  // Algorithm specific parameters
  const [caesarShift, setCaesarShift] = useState(3);
  const [hillKey, setHillKey] = useState("GYBNQKURP");
  const [rsaPublicKey, setRsaPublicKey] = useState("");
  const [rsaPrivateKey, setRsaPrivateKey] = useState("");
  const [playfairKey, setPlayfairKey] = useState("KEYWORD");
  const [railFenceRails, setRailFenceRails] = useState(3);
  const [vernamKey, setVernamKey] = useState("");

  // encryption handler
  const handleProcessText = async () => {
    if (!inputText.trim()) {
      toast.error("Input Required", {
        description: "Please enter text to process.",
      });
      return;
    }

    try {
      switch (selectedAlgorithm) {
        case "caesar":
          setOutputText(
            isEncrypting
              ? caesarCipher.encrypt(inputText, caesarShift)
              : caesarCipher.decrypt(inputText, caesarShift),
          );
          break;

        case "hill":
          setOutputText(
            isEncrypting
              ? hillCipher.encrypt(inputText, hillKey)
              : hillCipher.decrypt(inputText, hillKey),
          );
          break;

        case "rsa":
          if (isEncrypting) {
            if (!rsaPublicKey) {
              toast.error("Missing Public Key", {
                description: "Please generate or provide an RSA public key.",
              });
              return;
            }
            setOutputText(await rsaEncryption.encrypt(inputText, rsaPublicKey));
          } else {
            if (!rsaPrivateKey) {
              toast.error("Missing Private Key", {
                description: "Please generate or provide an RSA private key.",
              });
              return;
            }
            setOutputText(
              await rsaEncryption.decrypt(inputText, rsaPrivateKey),
            );
          }
          break;

        case "playfair":
          setOutputText(
            isEncrypting
              ? playfairCipher.encrypt(inputText, playfairKey)
              : playfairCipher.decrypt(inputText, playfairKey),
          );
          break;

        case "railfence":
          setOutputText(
            isEncrypting
              ? railFenceCipher.encrypt(inputText, railFenceRails)
              : railFenceCipher.decrypt(inputText, railFenceRails),
          );
          break;

        case "vernam":
          if (!vernamKey) {
            toast.error("Missing Key", {
              description: "Please generate or provide a Vernam cipher key.",
            });
            return;
          }
          setOutputText(
            isEncrypting
              ? vernamCipher.encrypt(inputText, vernamKey)
              : vernamCipher.decrypt(inputText, vernamKey),
          );
          break;

        default:
          throw new Error("Invalid algorithm selected.");
      }

      toast.success(isEncrypting ? "Text Encrypted" : "Text Decrypted", {
        description: "Operation completed successfully.",
      });
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      toast.error("Error Processing Text", {
        description: errorMsg,
      });
    }
  };

  // swap encrypt <-> decrypt
  const handleSwap = () => {
    setInputText(outputText);
    setOutputText(inputText);
    setIsEncrypting(!isEncrypting);

    toast.info("Mode Changed", {
      description: `Switched to ${isEncrypting ? "decryption" : "encryption"} mode.`,
    });
  };

  // RSA Key Gen
  const generateRSAKeys = async () => {
    try {
      const { publicKey, privateKey } = await rsaEncryption.generateKeys();
      setRsaPublicKey(publicKey);
      setRsaPrivateKey(privateKey);

      toast.success("RSA Keys Generated", {
        description: "New public and private keys have been created.",
      });
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      toast.error("Error Generating Keys", {
        description: errorMsg,
      });
    }
  };

  // Vernam Key Gen
  const generateVernamKey = () => {
    if (!inputText.length) {
      toast.error("Error Generating Key", {
        description: "Please enter text first to generate a matching key.",
      });
      return;
    }

    try {
      const cleanText = inputText.toUpperCase().replace(/[^A-Z]/g, "");
      const newKey = vernamCipher.generateKey(cleanText.length);
      setVernamKey(newKey);

      toast.success("Vernam Key Generated", {
        description: "A new random key has been created.",
      });
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      toast.error("Error Generating Keys", {
        description: errorMsg,
      });
    }
  };

  // Render the algorithm-specific parameters
  const renderAlgorithmParams = () => {
    switch (selectedAlgorithm) {
      case "caesar":
        return (
          <div>
            <Label htmlFor="caesar-shift">Shift Value (1-25)</Label>
            <Input
              id="caesar-shift"
              type="number"
              min="1"
              max="25"
              value={caesarShift}
              onChange={(e) =>
                setCaesarShift(Number.parseInt(e.target.value) || 3)
              }
            />
          </div>
        );
      case "hill":
        return (
          <div>
            <Label htmlFor="hill-key">
              Hill Cipher Key (3x3 matrix as string)
            </Label>
            <Input
              id="hill-key"
              value={hillKey}
              onChange={(e) => setHillKey(e.target.value)}
            />
            <p className="text-sm text-muted-foreground mt-1">
              Default key is "GYBNQKURP" which represents a 3x3 matrix
            </p>
          </div>
        );
      case "playfair":
        return (
          <div>
            <Label htmlFor="playfair-key">Playfair Cipher Key</Label>
            <Input
              id="playfair-key"
              value={playfairKey}
              onChange={(e) => setPlayfairKey(e.target.value)}
            />
            <p className="text-sm text-muted-foreground mt-1">
              The key is used to generate the 5x5 Playfair square
            </p>
          </div>
        );
      case "railfence":
        return (
          <div>
            <Label htmlFor="railfence-rails">Number of Rails (2-10)</Label>
            <Input
              id="railfence-rails"
              type="number"
              min="2"
              max="10"
              value={railFenceRails}
              onChange={(e) =>
                setRailFenceRails(Number.parseInt(e.target.value) || 3)
              }
            />
          </div>
        );
      case "vernam":
        return (
          <div className="grid gap-4">
            <div>
              <Label htmlFor="vernam-key">
                Vernam Cipher Key (One-Time Pad)
              </Label>
              <Textarea
                id="vernam-key"
                value={vernamKey}
                onChange={(e) => setVernamKey(e.target.value)}
                className="min-h-[80px]"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Key must be at least as long as the plaintext and should only be
                used once
              </p>
            </div>
            <Button onClick={generateVernamKey} variant="outline">
              <KeyRound className="mr-2 h-4 w-4" />
              Generate Random Key
            </Button>
          </div>
        );
      case "rsa":
        return (
          <div className="grid gap-4">
            <Button onClick={generateRSAKeys} variant="outline">
              <KeyRound className="mr-2 h-4 w-4" />
              Generate RSA Key Pair
            </Button>
            <div>
              <Label htmlFor="rsa-public-key">Public Key</Label>
              <Textarea
                id="rsa-public-key"
                value={rsaPublicKey}
                onChange={(e) => setRsaPublicKey(e.target.value)}
                className="min-h-[80px]"
              />
            </div>
            <div>
              <Label htmlFor="rsa-private-key">Private Key</Label>
              <Textarea
                id="rsa-private-key"
                value={rsaPrivateKey}
                onChange={(e) => setRsaPrivateKey(e.target.value)}
                className="min-h-[80px]"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Conversion</CardTitle>
          <CardDescription>
            Enter text to encrypt or decrypt using the selected algorithm
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="w-full md:w-1/2">
                <Label htmlFor="input-text" className="mb-2 block">
                  {isEncrypting ? "Plain Text" : "Cipher Text"}
                </Label>
                <Textarea
                  id="input-text"
                  placeholder={
                    isEncrypting
                      ? "Enter text to encrypt..."
                      : "Enter text to decrypt..."
                  }
                  className="min-h-[150px]"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
              </div>
              <div className="flex flex-col items-center justify-center self-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleSwap}
                  className="my-2"
                >
                  <ArrowDownUp className="h-4 w-4" />
                </Button>
                <Button
                  onClick={handleProcessText}
                  className="whitespace-nowrap"
                >
                  {isEncrypting ? (
                    <Lock className="mr-2 h-4 w-4" />
                  ) : (
                    <Unlock className="mr-2 h-4 w-4" />
                  )}
                  {isEncrypting ? "Encrypt" : "Decrypt"}
                </Button>
              </div>
              <div className="w-full md:w-1/2">
                <Label htmlFor="output-text" className="mb-2 block">
                  {isEncrypting ? "Cipher Text" : "Plain Text"}
                </Label>
                <Textarea
                  id="output-text"
                  placeholder="Result will appear here..."
                  className="min-h-[150px]"
                  value={outputText}
                  readOnly
                />
              </div>
            </div>

            <div className="grid gap-4">
              <div>
                <Label htmlFor="algorithm-select">Encryption Algorithm</Label>
                <Select
                  value={selectedAlgorithm}
                  onValueChange={setSelectedAlgorithm}
                >
                  <SelectTrigger id="algorithm-select">
                    <SelectValue placeholder="Select algorithm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="caesar">Caesar Cipher</SelectItem>
                    <SelectItem value="playfair">Playfair Cipher</SelectItem>
                    <SelectItem value="hill">Hill Cipher</SelectItem>
                    <SelectItem value="railfence">Rail Fence Cipher</SelectItem>
                    <SelectItem value="vernam">Vernam Cipher (OTP)</SelectItem>
                    <SelectItem value="rsa">RSA Encryption</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {renderAlgorithmParams()}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="theory" className="w-full">
        <TabsList className="grid grid-cols-1 w-full">
          <TabsTrigger value="theory">Theory and Usage</TabsTrigger>
        </TabsList>
        <TabsContent value="theory" className="mt-4">
          <TheoryTabs selectedAlgorithm={selectedAlgorithm} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
