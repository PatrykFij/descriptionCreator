import styled from 'styled-components';

export const RangeWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  & label {
    font-size: 20px;
  }

  & .MuiInputBase-root {
    font-size: 1.2rem;
  }

  & .MuiSlider-valueLabel {
    left: calc(-50% - 8px);
  }

  &
    .PrivateValueLabel-thumb-5.PrivateValueLabel-open-6
    .PrivateValueLabel-offset-7 {
    transform: scale(1.4) translateY(-10px);
  }
`;

export const Title = styled.h3`
  text-align: center;
  font-size: 30px;
  margin-bottom: 10px;
  margin-top: 18px;
`;
