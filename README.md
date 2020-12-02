# SVG to Data URI

The function `SVGtoDataURI(svg)` converts any SVG into a **Data URI**.

Before it does so, it verifies that the string it has been given to process is a **valid SVG**.

______

## Step 1

The function `SVGtoDataURI(svg)` verifies that the string passed to the function:

 - has a valid **SVG Namespace**
 - represents **well-formed XML**

If either or both conditions are not met, the `SVGtoDataURI(svg)` function will return a verbose error detailing how the string may be fixed.

## Step 2

If both the conditions above are met, the `SVGtoDataURI(svg)` function returns the validated SVG as a **Data URI**.

_____

## `SVGtoDataURI(svg)` Function

```

const SVGtoDataURI = (SVG) => {
  
  // GET SVG TITLE
  const SVGTitle = mySVG.split('</title>')[0].split('<title>')[1];
  
  // VERIFY SVG NAMESPACE
  const SVGNamespace = SVG.trim().replace(/\s+/g, ' ').substr(0, 39);
  const SVGNamespaceMatch = '<svg xmlns="http://www.w3.org/2000/svg"';
  const SVGNamespaceMatches = (SVGNamespace === SVGNamespaceMatch) ? true : false;

  // VERIFY SVG REPRESENTS WELL-FORMED XML
  const XMLParser = new DOMParser();
  const parsedDocument = XMLParser.parseFromString(SVG, 'image/svg+xml');
  const wellFormedXML = (parsedDocument.documentElement.nodeName.indexOf('parsererror') < 0) ? true : false;

  // CONVERT SVG INTO DATA URI
  if ((SVGNamespaceMatches === true) && (wellFormedXML === true)) {
  
    SVG = SVG.replace(/(\s*\n)+\s*/g, ' ');
    SVG = SVG.replace(/\>\s+\</g, '><');
    SVG = SVG.replace(/\s\/>/g, '/>');
    SVG = SVG.replace(/\>/g, '%3E');
    SVG = SVG.replace(/\</g, '%3C');
    SVG = SVG.replace(/\"/g, '\'');
    SVG = 'data:image/svg+xml,' + SVG.trim();
  }

  else {
  
    SVG = '';
    SVG += '\n\n<!--\n\n';
    SVG += '  ⚠️ Ashiva Console:\n\n';

    if (SVGTitle !== undefined) {

      SVG += '  ⚠️ Issue: SVG Document with title "' + SVGTitle + '" is not validating as an SVG.\n\n';
    }

    else {

      SVG += '  ⚠️ Issue: SVG Document is not validating as an SVG.\n\n';
    }

    switch (true) {

      case ((SVGNamespaceMatches === false) && (wellFormedXML === false)) :
        SVG += '  ⚠️ Analysis: This SVG lacks a valid SVG Namespace AND this SVG is not well-formed XML.\n\n';
        break;

      case (SVGNamespaceMatches === false) :
        SVG += '  ⚠️ Analysis: This SVG lacks a valid SVG Namespace.\n\n';
        break;

      case (wellFormedXML === false) :
        SVG += '  ⚠️ Analysis: This SVG is not well-formed XML.\n\n';
        break;
    }


    if (SVGNamespaceMatches === false) {

      SVG += '  ⚠️ Next Step: Ensure this SVG begins with a valid namespace:\n\n';
      SVG += '      xmlns="http://www.w3.org/2000/svg"\n\n';
    }


    if (wellFormedXML === false) {

      SVG += '  ⚠️ Next Step: Fix the XML of this SVG by following the error report below.\n\n';
      SVG += '  ⚠️ Error Report: ' + parsedDocument.documentElement.textContent.replace(/\n/g, '\n\n      ') + '\n\n';
    }

    SVG += '\n\n-->\n\n';
  }

  return SVG;
}

```
