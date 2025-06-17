'use client';

import { motion } from 'framer-motion';
import { Shield, Copy, Check, Download } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function PGPKey() {
  const [copied, setCopied] = useState(false);
  const [pgpKey, setPgpKey] = useState('');
  const [fingerprint, setFingerprint] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPGPKey = async () => {
      try {
        const response = await fetch('/pgp-key.txt');
        const text = await response.text();
        
        // Split the text into lines and find the key block
        const lines = text.split('\n');
        const beginIndex = lines.findIndex(line => line.includes('-----BEGIN PGP PUBLIC KEY BLOCK-----'));
        const endIndex = lines.findIndex(line => line.includes('-----END PGP PUBLIC KEY BLOCK-----'));
        const fingerprintLine = lines.find(line => line.startsWith('Fingerprint:'));
        
        if (beginIndex !== -1 && endIndex !== -1 && fingerprintLine) {
          // Extract the key block preserving all line breaks
          const keyLines = lines.slice(beginIndex + 1, endIndex);
          const cleanKey = keyLines.join('\n').trim();
          
          // Extract fingerprint
          const fingerprint = fingerprintLine.split('Fingerprint:')[1].trim();
          
          setPgpKey(cleanKey);
          setFingerprint(fingerprint);
        } else {
          console.error('Failed to find key block or fingerprint');
        }
      } catch (error) {
        console.error('Error fetching PGP key:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPGPKey();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(`-----BEGIN PGP PUBLIC KEY BLOCK-----\n\n${pgpKey}\n\n-----END PGP PUBLIC KEY BLOCK-----`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([`-----BEGIN PGP PUBLIC KEY BLOCK-----\n\n${pgpKey}\n\n-----END PGP PUBLIC KEY BLOCK-----\n\nFingerprint: ${fingerprint}`], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'lf32_public.asc';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (loading) {
    return (
      <div className="glass rounded-xl p-8 h-full">
        <div className="animate-pulse">Loading PGP key...</div>
      </div>
    );
  }

  return (
    <div className="glass rounded-xl overflow-hidden h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-white rounded-lg shadow-sm">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">PGP Public Key</h2>
              <p className="text-sm text-gray-600">For secure and encrypted communication</p>
            </div>
          </div>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Key Block */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-2 border-b border-gray-200 bg-white flex items-center justify-between">
            <span className="text-xs font-medium text-gray-700">Public Key Block</span>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <div className="p-2">
            <div className="max-h-[200px] overflow-y-auto bg-white rounded border border-gray-100">
              <code className="text-xs text-gray-600 font-mono block whitespace-pre p-2 leading-relaxed tracking-wide">
                -----BEGIN PGP PUBLIC KEY BLOCK-----

                {pgpKey.split('\n').map((line, index) => (
                  <span key={index} className="block py-0.5">{line}</span>
                ))}

                -----END PGP PUBLIC KEY BLOCK-----
              </code>
            </div>
          </div>
        </div>

        {/* Fingerprint */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h3 className="text-xs font-medium text-gray-900">Key Fingerprint</h3>
              <p className="text-xs text-gray-600 mt-0.5 font-mono tracking-wider">{fingerprint}</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-600">
              <Shield className="w-3.5 h-3.5 text-blue-600" />
              <span>Verified on Keybase.io</span>
            </div>
          </div>
        </div>

        {/* Usage Info */}
        <div className="text-xs text-gray-600 space-y-1.5">
          <p className="font-medium text-gray-900">This key can be used to:</p>
          <ul className="list-disc list-inside space-y-0.5 text-gray-600">
            <li>Send encrypted messages to me</li>
            <li>Verify my digital signatures</li>
            <li>Ensure the authenticity of my communications</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 