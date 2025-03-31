
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from 'lucide-react';
import { ContactInfo } from '@/utils/qrCodeGenerator';
import { useToast } from "@/components/ui/use-toast";

interface QRCodeDisplayProps {
  qrCodeUrl: string;
  contactInfo: ContactInfo;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ qrCodeUrl, contactInfo }) => {
  const { toast } = useToast();

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `${contactInfo.name.replace(/\s+/g, '_')}_contact_qr.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "QR Code Downloaded",
      description: "Your contact QR code has been downloaded successfully!",
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center">Your Contact QR Code</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <div className="p-4 bg-white rounded-lg shadow-inner">
          <img 
            src={qrCodeUrl} 
            alt="Contact QR Code" 
            className="w-64 h-64 mx-auto"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={handleDownload} className="flex gap-2 items-center">
          <Download size={18} />
          Download QR Code
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QRCodeDisplay;
