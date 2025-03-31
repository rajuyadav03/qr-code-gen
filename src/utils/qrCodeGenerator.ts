
import QRCode from 'qrcode';

export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  website?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  github?: string;
}

export const generateVCardData = (contact: ContactInfo): string => {
  let vCard = 'BEGIN:VCARD\nVERSION:3.0\n';
  
  if (contact.name) vCard += `FN:${contact.name}\n`;
  if (contact.email) vCard += `EMAIL:${contact.email}\n`;
  
  // Format phone number correctly for vCard
  if (contact.phone) {
    // Remove spaces and ensure format
    const formattedPhone = contact.phone.replace(/\s+/g, ' ').trim();
    vCard += `TEL:${formattedPhone}\n`;
  }
  
  if (contact.website) vCard += `URL:${contact.website}\n`;
  
  // Social media profiles as URLs in NOTE field
  let socialMedia = '';
  if (contact.twitter) socialMedia += `Twitter: https://twitter.com/${contact.twitter.replace('@', '')}\n`;
  if (contact.linkedin) socialMedia += `LinkedIn: ${contact.linkedin}\n`;
  if (contact.instagram) socialMedia += `Instagram: https://instagram.com/${contact.instagram.replace('@', '')}\n`;
  if (contact.github) socialMedia += `GitHub: https://github.com/${contact.github.replace('@', '')}\n`;
  
  if (socialMedia) {
    vCard += `NOTE:${socialMedia}`;
  }
  
  vCard += 'END:VCARD';
  return vCard;
};

export const generateQRCode = async (contact: ContactInfo): Promise<string> => {
  try {
    const vCardData = generateVCardData(contact);
    return await QRCode.toDataURL(vCardData);
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
};
