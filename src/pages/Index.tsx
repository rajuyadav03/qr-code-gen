
import React, { useState } from 'react';
import ContactForm from '@/components/ContactForm';
import QRCodeDisplay from '@/components/QRCodeDisplay';
import { ContactInfo, generateQRCode } from '@/utils/qrCodeGenerator';
import { useToast } from "@/components/ui/use-toast";
import { QrCode, ArrowRight } from 'lucide-react';

const Index = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerateQRCode = async (info: ContactInfo) => {
    try {
      setIsGenerating(true);
      const qrDataUrl = await generateQRCode(info);
      setQrCodeUrl(qrDataUrl);
      setContactInfo(info);
      
      toast({
        title: "QR Code Generated",
        description: "Your contact QR code has been generated successfully!",
      });
    } catch (error) {
      console.error('Failed to generate QR code:', error);
      toast({
        title: "Error",
        description: "Failed to generate QR code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container px-4 py-8 mx-auto">
        <header className="mb-12 text-center">
          <div className="flex justify-center items-center mb-4">
            <QrCode size={36} className="text-primary mr-2" />
            <h1 className="text-3xl md:text-4xl font-bold">Contact QRafter</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Generate a single QR code with all your contact information for easy sharing
          </p>
        </header>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
          <div className={`w-full max-w-md ${qrCodeUrl ? 'md:w-1/2' : 'md:w-full'}`}>
            <ContactForm onSubmit={handleGenerateQRCode} />
          </div>

          {qrCodeUrl && contactInfo && (
            <>
              <div className="hidden md:flex items-center justify-center">
                <ArrowRight size={24} className="text-muted-foreground" />
              </div>
              <div className="w-full md:w-1/2 max-w-md mt-8 md:mt-0">
                <QRCodeDisplay qrCodeUrl={qrCodeUrl} contactInfo={contactInfo} />
              </div>
            </>
          )}
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>
            Share your contact information easily with a single scan.
          </p>
          <p className="mt-2">
            The QR code contains a vCard with all your provided details.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
