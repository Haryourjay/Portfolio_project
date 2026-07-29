import {
  Section,
  Container,
  Heading,
  Description,
  LogoCloud,
  LogoBubble,
} from "../helpers/ClientPartnerHelper.styles";

import logo from "../assets/logo.png"

const logos = [
  logo,
  logo,
  logo,
  logo,
  logo,
  logo,
  logo,
  logo,
];

const sizes = [170, 120, 170, 160, 170, 150, 180, 150, 150, 185, 160, 170];

export default function ClientsPartnersSection() {
  return (
    <Section>
      <Container>
        {/* <Heading>
          Trusted by <span>Clients & Partners</span>
        </Heading> */}

        {/* <Description>
          Building long-lasting relationships with businesses across different
          industries.
        </Description> */}

        <LogoCloud>
          {/* {logos.map((logo, index) => (
            <LogoBubble
              key={index}
              style={{
                "--delay": `${Math.random() * 5}s`,
                "--duration": `${8 + Math.random() * 6}s`,
                "--size": `${90 + Math.random() * 35}px`,
              }}
            >
              <img src={logo} alt="" />
            </LogoBubble>
          ))} */}
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