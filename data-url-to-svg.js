const dataURLtoSVG = (dataURL) => {
  
  let output;


  // CONVERT DATA URL TO SVG
  let SVG = dataURL;

  SVG = SVG.replace('data:image/svg+xml,', '');
  SVG = decodeURIComponent(SVG);
  SVG = SVG.replace(/\'/g, '"');
  SVG = SVG.trim();


  // VALIDATE SVG
  const { SVGNamespaceMatches, wellFormedXML, parsedDocument } = validateSVG(SVG);


  // ASSIGN TO OUTPUT: FORMATTED SVG
  if ((SVGNamespaceMatches === true) && (wellFormedXML === true)) {

    // ADD A NEWLINE BEFORE EACH SVG ELEMENT
    SVG = SVG.replace('><', '>\n\n<');
    SVG = SVG.replace(/\>\<\/svg\>$/, '>\n\n</svg>');
    SVG = SVG.replace(/></g, '>\n<');

    // FORMAT SVG ROOT ELEMENT
    let svgRoot = SVG.match(/^\<svg([^\>]+?)\>/)[0];
    svgRootPieces = svgRoot.split('"');

    for (let i = 0; i < svgRootPieces.length; i = i + 2) {

      svgRootPieces[i] = svgRootPieces[i].split(' ').join('\n  ');
    }

    let reformattedRoot = svgRootPieces.join('"');
    SVG = SVG.replace(svgRoot, reformattedRoot);

    output = SVG;
  }


  // ELSE ASSIGN TO OUTPUT: ASHIVA CONSOLE WITH ANALYSIS OF SVG CODE
  else {

    output = consoleSVG({SVG, parsedDocument, SVGNamespaceMatches, wellFormedXML});
  }


  return output;
}
