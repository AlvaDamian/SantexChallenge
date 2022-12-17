import { FC } from 'react';
import styled, { keyframes } from 'styled-components';

// This Spinner was copied from https://codepen.io/jkantner/pen/YzzgWRY

const AnimationHourglassA = keyframes`
  from, 75% { transform: rotate(0) }
  to { transform: rotate(180deg) }
`;

const AnimationHourglassB = keyframes`
  from { transform: scaleY(1) }
  50%, to { transform: scaleY(0) }
`;

const AnimationHourglassC = keyframes`
  from { transform: scaleY(0) }
  50%, to { transform: scaleY(1) }
`;

interface HourglassProps {
  widthInRem:string,
  heightInRem:string,
  marginTopInRem:string
  marginRightInRem:string,
  marginBottomInRem:string,
  marginLeftInRem:string
}
const Hourglass = styled.div`
    margin: 2rem auto 1.5rem auto;
    margin-top: ${(props:HourglassProps) => props.marginTopInRem};
    margin-bottom: ${(props:HourglassProps) => props.marginBottomInRem};
    margin-left: ${(props:HourglassProps) => props.marginLeftInRem};
    margin-right: ${(props:HourglassProps) => props.marginRightInRem};
    position: relative;
    width: ${(props:HourglassProps) => props.widthInRem};
    height: ${(props:HourglassProps) => props.heightInRem};
    animation-duration: 2s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;


    animation-name: ${AnimationHourglassA};
    background: #a3a3a3;
    clip-path: polygon(0 0,100% 0,50% 50%,100% 100%,0 100%,50% 50%);
    -webkit-clip-path: polygon(0 0,100% 0,50% 50%,100% 100%,0 100%,50% 50%);

    &:before, &:after {
      animation-duration: 2s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;


      background: currentColor;
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 50%;
      transform-origin: 50% 100%;	
      clip-path: polygon(0 0,100% 0,50% 100%);
      -webkit-clip-path: polygon(0 0,100% 0,50% 100%);


      position: static;
      clip-path: none;
      -webkit-clip-path: none;
    }

    &:before {
      animation-name: ${AnimationHourglassB};
    }

    &:after {
      animation-name: ${AnimationHourglassC};
    }
`;

interface SpinnerProps {
  size: "sm" | "lg",
  marginTopInRem:string,
  marginRightInRem:string,
  marginBottomInRem:string,
  marginLeftInRem:string
}

const lgSizeValues:HourglassProps = {
  widthInRem: "10rem",
  heightInRem: "10rem",
  marginBottomInRem: "auto",
  marginLeftInRem: "auto",
  marginRightInRem: "auto",
  marginTopInRem: "auto"
}

const smSizeValues:HourglassProps = {
  widthInRem: "3rem",
  heightInRem: "3rem",
  marginBottomInRem: "auto",
  marginLeftInRem: "auto",
  marginRightInRem: "auto",
  marginTopInRem: "auto"
}

export const Spinner:FC<SpinnerProps> = (props) => {
  const hourglassProps = props.size === "lg" ? lgSizeValues : smSizeValues;
  hourglassProps.marginBottomInRem = props.marginBottomInRem;
  hourglassProps.marginLeftInRem = props.marginLeftInRem;
  hourglassProps.marginRightInRem = props.marginRightInRem;
  hourglassProps.marginTopInRem = props.marginTopInRem;
  return <Hourglass {...hourglassProps} title="Loading..." />;
}
