# SVG to Data URL

The function `SVGtoDataURL(svg)` converts any SVG into a **Data URL**.

Before it does so, it verifies that the string it has been given to process is a **valid SVG**.

______

## Step 1

The function `SVGtoDataURL(svg)` verifies that the string passed to the function:

 - has a valid **SVG Namespace**
 - represents **well-formed XML**

If either or both conditions are not met, the `SVGtoDataURL(svg)` function will return a verbose error detailing how the string may be fixed.

## Step 2

If both the conditions above are met, the `SVGtoDataURL(svg)` function returns the validated SVG as a **Data URL**.

_____

## `SVGtoDataURL(svg)` Function

```

const SVGtoDataURL = (SVG) => {
  
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

  // CONVERT SVG INTO DATA URL
  if ((SVGNamespaceMatches === true) && (wellFormedXML === true)) {
  
    SVG = SVG.replace(/(\s*\n)+\s*/g, ' ');
    SVG = SVG.replace(/\>\s+\</g, '><');
    SVG = SVG.replace(/\s\/>/g, '/>');
    SVG = SVG.replace(/\"/g, '\'');
    SVG = SVG.trim();

    const SVGCharacterArray = SVG.split('');

    for (let i = 0; i < SVGCharacterArray.length; i++) {

      if (SVGCharacterArray[i].match(/[A-Za-z0-9\.\,\;\:\/\*\-\=\_\~\'\!\$\@]/) === null) {

      	SVGCharacterArray[i] = encodeURIComponent(SVGCharacterArray[i]);
      }
    }

    SVG = 'data:image/svg+xml,' + SVGCharacterArray.join('');
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
______

## `dataURLtoSVG(dataURL)` Function

Naturally, a function like `SVGtoDataURL(svg)`, above, needs a corresponding function which can perform the same transformation in reverse.

`dataURLtoSVG(dataURL)` will convert the **Data URL** back into a valid, namespaced, well-formed **SVG**.

If the function cannot build an **SVG** out of the **Data URL**, it will return a verbose error, explaining why not.

```

```
