import {
  Section,
  Container,
  Heading,
  Description,
  LogoCloud,
  LogoBubble,
} from "../helpers/ClientPartnerHelper.styles";

import adobeMediaEncoderLogo from "../assets/Logos/Tools/Adobe_Media_Encoder_Icon.svg.png"
import afterEffectLogo from "../assets/Logos/Tools/Adobe-after-effects.png"
import adobeAnimateLogo from "../assets/Logos/Tools/Adobe-animate.png"
import blenderLogo from "../assets/Logos/Tools/Blendr-Photoroom.png"
import cinema4DLogo from "../assets/Logos/Tools/Cinema 4d-Photoroom.png"
import DaVinciResolveLogo from "../assets/Logos/Tools/DaVinci_Resolve_Studio.png"
import figmaLogo from "../assets/Logos/Tools/figma.png"
import illustratorLogo from "../assets/Logos/Tools/Illustrator-icon.png"
import photoshopLogo from "../assets/Logos/Tools/Photoshop.png"
import capcutLogo from "../assets/Logos/Tools/png-capcut-logo.png"
import premiereProLogo from "../assets/Logos/Tools/Premiere-pro-icon.png"

const logos = [
  adobeMediaEncoderLogo,
  afterEffectLogo,
  adobeAnimateLogo,
  blenderLogo,
  cinema4DLogo,
  DaVinciResolveLogo,
  figmaLogo,
  illustratorLogo,
  photoshopLogo,
  capcutLogo,
  premiereProLogo,
];

const sizes = [100, 90, 110, 120, 103, 90, 120, 90, 110, 85, 88, 95];

export default function ToolkitBubbleSection() {
  return (
    <Section>
      <Container>

        <LogoCloud>
          {logos.map((logo, index) => (
            <LogoBubble
                key={index}
                style={{
                "--size": `${sizes[index % sizes.length]}px`,
                "--delay": `${index * 0.4}s`,
                "--duration": `${8 + (index % 5)}s`,
                }}
            >
                <img src={logo} alt={`Partner ${index + 1}`} />
            </LogoBubble>
            ))}
        </LogoCloud>
      </Container>
    </Section>
  );
}