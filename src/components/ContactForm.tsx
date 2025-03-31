
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactInfo } from '@/utils/qrCodeGenerator';
import { Mail, Phone, Globe, Twitter, Linkedin, Instagram, Github, User } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ContactFormProps {
  onSubmit: (contactInfo: ContactInfo) => void;
}

// Country codes list
const countryCodes = [
  { code: "+1", country: "United States/Canada" },
  { code: "+44", country: "United Kingdom" },
  { code: "+91", country: "India" },
  { code: "+61", country: "Australia" },
  { code: "+49", country: "Germany" },
  { code: "+33", country: "France" },
  { code: "+81", country: "Japan" },
  { code: "+86", country: "China" },
  { code: "+7", country: "Russia" },
  { code: "+55", country: "Brazil" },
  { code: "+27", country: "South Africa" },
  { code: "+52", country: "Mexico" },
  { code: "+39", country: "Italy" },
  { code: "+34", country: "Spain" },
  { code: "+82", country: "South Korea" },
  // Add more countries as needed
];

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: '',
    email: '',
    phone: '',
    website: '',
    twitter: '',
    linkedin: '',
    instagram: '',
    github: '',
  });
  
  const [countryCode, setCountryCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
    setContactInfo(prev => ({ ...prev, phone: `${countryCode} ${e.target.value}` }));
  };

  const handleCountryCodeChange = (value: string) => {
    setCountryCode(value);
    setContactInfo(prev => ({ ...prev, phone: `${value} ${phoneNumber}` }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(contactInfo);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center">Your Contact Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                <User size={18} />
              </div>
              <Input
                id="name"
                name="name"
                value={contactInfo.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                <Mail size={18} />
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                value={contactInfo.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="flex gap-2">
              <div className="w-1/3">
                <Select value={countryCode} onValueChange={handleCountryCodeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Code" />
                  </SelectTrigger>
                  <SelectContent>
                    {countryCodes.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.code} ({country.country})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="relative w-2/3">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                  <Phone size={18} />
                </div>
                <Input
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="123 456 7890"
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website (Optional)</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                <Globe size={18} />
              </div>
              <Input
                id="website"
                name="website"
                value={contactInfo.website}
                onChange={handleChange}
                placeholder="https://yourwebsite.com"
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter (Optional)</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                  <Twitter size={18} />
                </div>
                <Input
                  id="twitter"
                  name="twitter"
                  value={contactInfo.twitter}
                  onChange={handleChange}
                  placeholder="@username"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn (Optional)</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                  <Linkedin size={18} />
                </div>
                <Input
                  id="linkedin"
                  name="linkedin"
                  value={contactInfo.linkedin}
                  onChange={handleChange}
                  placeholder="LinkedIn URL"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram (Optional)</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                  <Instagram size={18} />
                </div>
                <Input
                  id="instagram"
                  name="instagram"
                  value={contactInfo.instagram}
                  onChange={handleChange}
                  placeholder="@username"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="github">GitHub (Optional)</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                  <Github size={18} />
                </div>
                <Input
                  id="github"
                  name="github"
                  value={contactInfo.github}
                  onChange={handleChange}
                  placeholder="username"
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">Generate QR Code</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
