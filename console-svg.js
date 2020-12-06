const consoleSVG = (dataObject) => {

  const { SVG, parsedDocument, SVGNamespaceMatches, wellFormedXML } = dataObject;

  const SVGTitle = SVG.split('</title>')[0].split('<title>')[1];

  let console = '';
  console += '\n\n<!--\n\n';
  console += '  ⚠️ Ashiva Console:\n\n';

  if (SVGTitle !== undefined) {

    console += '  ⚠️ Issue: SVG Document with title "' + SVGTitle + '" is not validating as an SVG.\n\n';
  }

  else {

    console += '  ⚠️ Issue: SVG Document is not validating as an SVG.\n\n';
  }

  switch (true) {

    case ((SVGNamespaceMatches === false) && (wellFormedXML === false)) :
      console += '  ⚠️ Analysis: This SVG lacks a valid SVG Namespace AND this SVG is not well-formed XML.\n\n';
      break;

    case (SVGNamespaceMatches === false) :
      console += '  ⚠️ Analysis: This SVG lacks a valid SVG Namespace.\n\n';
      break;

    case (wellFormedXML === false) :
      console += '  ⚠️ Analysis: This SVG is not well-formed XML.\n\n';
      break;
  }


  if (SVGNamespaceMatches === false) {

    console += '  ⚠️ Next Step: Ensure this SVG begins with the following valid namespace:\n\n';
    console += '      xmlns="http://www.w3.org/2000/svg"\n\n';
  }


  if (wellFormedXML === false) {

    console += '  ⚠️ Next Step: Fix the XML of this SVG by following the error report below.\n\n';
    console += '  ⚠️ Error Report: ' + parsedDocument.documentElement.textContent.replace(/\n/g, '\n\n      ') + '\n\n';
  }

  console += '-->\n\n';

  return console;
}
