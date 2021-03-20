const SVGToDataURL = (SVG) => {

  let output;
  const { SVGNamespaceMatches, wellFormedXML, parsedDocument } = validateSVG(SVG);

  // ASSIGN TO OUTPUT: SVG CONVERTED INTO DATA URL
  if ((SVGNamespaceMatches === true) && (wellFormedXML === true)) {

    let dataURL = SVG;
    dataURL = dataURL.replace(/(\s*\n)+\s*/g, ' ');
    dataURL = dataURL.replace(/\s+\{/g, '{');
    dataURL = dataURL.replace(/\}\s+/g, '}');
    dataURL = dataURL.replace(/\:\s+/g, ':');
    dataURL = dataURL.replace(/\,\s+/g, ',');
    dataURL = dataURL.replace(/\s\/>/g, '/>');
    dataURL = dataURL.replace(/\>\s+\</g, '><');
    dataURL = dataURL.replace(/\"/g, '\'');
    dataURL = dataURL.trim();

    const characterArray = dataURL.split('');

    for (let i = 0; i < characterArray.length; i++) {

      if (characterArray[i].match(/[A-Za-z0-9\.\,\;\:\/\*\-\=\_\~\'\!\$\@]/) === null) {

      	characterArray[i] = encodeURIComponent(characterArray[i]);
      }
    }

    dataURL = 'data:image/svg+xml,' + characterArray.join('');

    output = dataURL;
  }


  // ELSE ASSIGN TO OUTPUT: ASHIVA CONSOLE WITH ANALYSIS OF SVG CODE
  else {

    output = consoleSVG({SVG, parsedDocument, SVGNamespaceMatches, wellFormedXML});
  }

  return output;
}
