import { createGlobalStyle, css } from "styled-components"
import { normalize } from "polished"

import { Color, Type, Media } from "../../utilities"

import { AvenirRegularEOT } from "../../../fonts/Avenir-Regular.eot"
import { AvenirRegularWOFF } from "../../../fonts/Avenir-Regular.woff"
import { AvenirRegularTTF } from "../../../fonts/Avenir-Regular.ttf"
import { AvenirRegularSVG } from "../../../fonts/Avenir-Regular.svg"

import { AvenirBoldEOT } from "../../../fonts/Avenir-Bold.eot"
import { AvenirBoldWOFF } from "../../../fonts/Avenir-Bold.woff"
import { AvenirBoldTTF } from "../../../fonts/Avenir-Bold.ttf"
import { AvenirBoldSVG } from "../../../fonts/Avenir-Bold.svg"

import { AvenirItalicEOT } from "../../../fonts/Avenir-Italic.eot"
import { AvenirItalicWOFF } from "../../../fonts/Avenir-Italic.woff"
import { AvenirItalicTTF } from "../../../fonts/Avenir-Italic.ttf"
import { AvenirItalicSVG } from "../../../fonts/Avenir-Italic.svg"

const fontfaces = css`
    @font-face {
        font-family: 'Avenir';
        font-style: normal;
        font-weight: normal;
        src: url('${AvenirRegularEOT}');
        src: url('${AvenirRegularWOFF}') format('woff'),
            url('${AvenirRegularTTF}') format('truetype'),
            url('${AvenirRegularSVG}') format('svg');
    }

    @font-face {
        font-family: 'Avenir';
        font-style: normal;
        font-weight: 400;
        src: url('${AvenirRegularEOT}');
        src: url('${AvenirRegularWOFF}') format('woff'),
            url('${AvenirRegularTTF}') format('truetype'),
            url('${AvenirRegularSVG}') format('svg');
    }

    @font-face {
        font-family: 'Avenir';
        font-style: normal;
        font-weight: bold;
        src: url('${AvenirBoldEOT}');
        src: url('${AvenirBoldWOFF}') format('woff'),
            url('${AvenirBoldTTF}') format('truetype'),
            url('${AvenirBoldSVG}') format('svg');
    }

    @font-face {
        font-family: 'Avenir';
        font-style: normal;
        font-weight: 500;
        src: url('${AvenirBoldEOT}');
        src: url('${AvenirBoldWOFF}') format('woff'),
            url('${AvenirBoldTTF}') format('truetype'),
            url('${AvenirBoldSVG}') format('svg');
    }

    @font-face {
        font-family: 'Avenir';
        font-style: italic;
        font-weight: normal;
        src: url('${AvenirItalicEOT}');
        src: url('${AvenirItalicWOFF}') format('woff'),
            url('${AvenirItalicTTF}') format('truetype'),
            url('${AvenirItalicSVG}') format('svg');
    }
`

export const GlobalStyles = createGlobalStyle`
  ${normalize()};

  ${fontfaces}

  body {
      background-color: ${Color.light_grey};
      font-family: ${Type.text};
      font-size: ${Type.basesize};
      color: ${Color.grey};
      line-height: 150%;
  }

  .miniMap {
      position: relative !important;
      width: 100% !important;
      height: 400px !important;
  }

  p {
      margin: 0;
  }

  h1, h2, h3, h4, h5, h6, h7, h8, h9 {
      margin: 0;
      padding: 0;
      font-weight: bold;
      margin-bottom: 1rem;
  }

  h1 {
      font-size: 2.25rem;
  }

  h2 {
      font-size: 2rem;
  }

  h3 {
      font-size: 1.75rem;
  }

  h4 {
      font-size: 1.5rem;
  }

  ${Media.below.mobile`
      .m-hidden {
          display: none;
      }
  `}

  ${Media.below.tablet`
      .mt-hidden {
          display: none;
      }
  `}

  
  ${Media.above.tablet`
      ${Media.below.desktop`
          .t-hidden {
              display: none;
          }
      `}
  `}
`
