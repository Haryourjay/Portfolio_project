import styled, { keyframes } from "styled-components";

// const float = keyframes`
//   0%{
//     transform: translateY(0) translateX(0) rotate(0deg);
//   }

//   25%{
//     transform: translateY(-18px) translateX(12px) rotate(4deg);
//   }

//   50%{
//     transform: translateY(-35px) translateX(-10px) rotate(-3deg);
//   }

//   75%{
//     transform: translateY(-18px) translateX(15px) rotate(2deg);
//   }

//   100%{
//     transform: translateY(0) translateX(0) rotate(0deg);
//   }
// `;

const float = keyframes`
  0%{
    transform: translate3d(0,0,0) rotate(0deg) scale(1);
  }

  20%{
    transform: translate3d(12px,-18px,0) rotate(4deg) scale(1.03);
  }

  40%{
    transform: translate3d(-10px,-35px,0) rotate(-3deg) scale(.98);
  }

  60%{
    transform: translate3d(18px,-5px,0) rotate(5deg) scale(1.02);
  }

  80%{
    transform: translate3d(-12px,-8px,0) rotate(-2deg) scale(1);
  }

  100%{
    transform: translate3d(0,0,0) rotate(0deg) scale(1);
  }
`;

const pulse = keyframes`
  0%,100%{
    box-shadow:
      0 0 0 rgba(255,107,53,0),
      0 18px 40px rgba(0,0,0,.35);
  }

  50%{
    box-shadow:
      0 0 40px rgba(255,107,53,.15),
      0 24px 55px rgba(0,0,0,.45);
  }
`;

const glow = keyframes`
  0%,100%{
    box-shadow:
      0 0 0 rgba(255,107,53,.0),
      0 18px 45px rgba(0,0,0,.35);
  }

  50%{
    box-shadow:
      0 0 30px rgba(255,107,53,.18),
      0 20px 50px rgba(0,0,0,.45);
  }
`;

export const Section = styled.div`
  padding: 1rem 1.5rem;
  background: transparent;
//   overflow: hidden;
  position: relative;
`;

export const Container = styled.div`
  max-width: 1250px;
  width: 100%
  margin: auto;
`;

export const Heading = styled.h2`
  text-align: center;
  font-family: var(--font-display);
  color: var(--text);
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin-bottom: 1rem;

  span {
    color: var(--accent);
  }
`;

export const Description = styled.p`
  max-width: 650px;
  margin: 0 auto 1rem;
  text-align: center;
  color: var(--muted);
  line-height: 1.7;
`;

// export const LogoCloud = styled.div`
//   position: relative;

//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   align-items: center;
//   gap: 2rem;

//   min-height: 480px;
// `;

export const LogoCloud = styled.div`
  position: relative;
  width: 90%;
  height: 450px;
  padding-top: 20px;

  margin: 0 auto;

  @media (max-width: 992px) {
    height: 520px;
  }

  @media (max-width: 768px) {
    position: static;
    height: auto;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    justify-items: center;
    padding: 1rem 0;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

// export const LogoBubble = styled.div`
//   width: var(--size);
//   height: var(--size);

//   border-radius: 50%;

//   background: rgba(255,255,255,.03);

//   backdrop-filter: blur(12px);

//   border: 1px solid rgba(255,255,255,.08);

//   display: flex;
//   align-items: center;
//   justify-content: center;

//   animation:
//     ${float} var(--duration) ease-in-out infinite,
//     ${glow} 6s ease-in-out infinite;

//   animation-delay: var(--delay);

//   transition: .35s;

//   cursor: pointer;

//   img{
//     width:60%;
//     height:60%;
//     object-fit:contain;

//     filter:
//       grayscale(100%)
//       brightness(.9);

//     transition:.35s;
//   }

//   &:hover{
//     transform:scale(1.15);

//     background:rgba(255,107,53,.08);

//     border-color:rgba(255,107,53,.35);

//     img{
//       filter:none;
//       transform:scale(1.08);
//     }
//   }

//   &:nth-child(3n){
//     width:calc(var(--size) + 20px);
//     height:calc(var(--size) + 20px);
//   }

//   &:nth-child(5n){
//     width:calc(var(--size) - 12px);
//     height:calc(var(--size) - 12px);
//   }

//   @media (max-width:768px){

//     width:72px;
//     height:72px;

//     img{
//       width:55%;
//       height:55%;
//     }
//   }

//   @media (max-width:480px){

//     width:64px;
//     height:64px;
//   }
// `;


export const LogoBubble = styled.div`
  position: absolute;

  width: var(--size);
  height: var(--size);

  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(255,255,255,.03);

  backdrop-filter: blur(14px);

  border: 1px solid rgba(255,255,255,.08);

  animation:
    ${float} var(--duration) ease-in-out infinite,
    ${pulse} 6s ease-in-out infinite;

  animation-delay: var(--delay);

  transition: all .35s ease;

  img{
    width:60%;
    height:60%;
    object-fit:contain;
    border-radius: 100%;

    filter: grayscale(100%) brightness(.9);

    transition:.35s;
  }

  &:hover{
    background:rgba(255,107,53,.08);
    border-color:rgba(255,107,53,.35);
    transform:scale(1.12);
    z-index:10;

    img{
      filter:none;
      transform:scale(1.08);
    }
  }

  /* Desktop positions */

  &:nth-child(1){
    top:10%;
    left:15%;
  }

  &:nth-child(2){
    top:30%;
    left:30%;
  }

  &:nth-child(3){
    top:12%;
    right:8%;
  }delay

  &:nth-child(4){
    top:40%;
    left:28%;
  }

  &:nth-child(5){
    top:20%;
    left:52%;
  }

  &:nth-child(6){
    top:46%;
    right:23%;
  }

  &:nth-child(7){
    bottom:5%;
    left:25%;
  }

  &:nth-child(8){
    bottom:5%;
    left:50%;
  }

  &:nth-child(9){
    bottom:10%;
    right:10%;
  }

  &:nth-child(10){
    top:22%;
    left:70%;
  }

  &:nth-child(11){
    bottom:28%;
    left:32%;
  }

  &:nth-child(12){
    top:62%;
    right:28%;
  }

  @media (max-width:768px){
    position:relative;
    top:auto;
    left:auto;
    right:auto;
    bottom:auto;

    width:80px;
    height:80px;

    animation-duration:10s;

    img{
      width:58%;
      height:58%;
    }
  }

  @media (max-width:480px){
    width:72px;
    height:72px;
  }
`;