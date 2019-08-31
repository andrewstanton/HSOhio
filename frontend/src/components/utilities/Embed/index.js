import styled from "styled-components"

export const Embed = styled.div`
  max-width: 100%;
  width: 100%;
  margin: 0;
  position: relative;
  display: block;
  padding: 0;
  overflow: hidden;

  > iframe {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &::before {
    content: "";
    display: block;
    padding-top: 56.25%;
  }
`
