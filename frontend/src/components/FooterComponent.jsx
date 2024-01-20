
import { Footer, FooterCopyright, FooterLink, FooterLinkGroup } from 'flowbite-react';

function FooterComponent() {
  return (
    <Footer container>
      <FooterCopyright href="#" by="Flowbite™" year={2023} />
      <FooterLinkGroup>
        <FooterLink href="#">About</FooterLink>
        <FooterLink href="#">Privacy Policy</FooterLink>
        <FooterLink href="#">Licensing</FooterLink>
        <FooterLink href="#">Contact</FooterLink>
      </FooterLinkGroup>
    </Footer>
  );
}

export default FooterComponent;
