import React, { useRef, useEffect } from 'react';
import WebViewer from '@pdftron/webviewer';
import './App.css';
 import queryString from 'query-string';
 import { BrowserRouter as Router, Switch, Route, Redirect, useLocation} from 'react-router-dom'

 
//class Items extends Component {
const App = () => {
 
 const viewer = useRef(null);
  useEffect(() => {	
  console.log("-->"+window.location.search);
  const params = new URLSearchParams(window.location.search);
  const fileName = params.get('fileName');
    console.log("fileName-->"+fileName);
     
		  
    WebViewer(
      {
        path:'/webviewer/lib',
        initialDoc: '/files/'+fileName,
		fullAPI:true
      },
      viewer.current,
    ).
	
	then((instance) => {
      const { docViewer, Annotations } = instance;
      const annotManager = docViewer.getAnnotationManager();	

      docViewer.on('documentLoaded', () => {
        const rectangleAnnot = new Annotations.RectangleAnnotation();
        rectangleAnnot.PageNumber = 1;
        // values are in page coordinates with (0, 0) in the top left
        rectangleAnnot.X = 100;
        rectangleAnnot.Y = 150;
        rectangleAnnot.Width = 200;
        rectangleAnnot.Height = 50;
        rectangleAnnot.Author = annotManager.getCurrentUser();
		annotManager.redrawAnnotation(rectangleAnnot);
		const doc = docViewer.getDocument();
		const xfdfString =  annotManager.exportAnnotations();
		const options = { xfdfString };
		const data =  doc.getFileData(options);
		const arr = new Uint8Array(data);
		const blob = new Blob([arr], { type: 'application/pdf' });
		
		//const data = new FormData();
		//data.append(fileName, blob, fileName);
		// depending on the server, 'FormData' might not be required and can just send the Blob directly

		const req = new XMLHttpRequest();
		req.open("POST", 'http://127.0.0.1:8081/api/v1/contact',{
            mode: 'no-cors',
            method: "post",
            headers: {"Access-Control-Allow-Origin": "*",
					  "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
					  "Access-Control-Allow-Headers":"Origin,Content-Type,Accept",					  
					  "Content-Type": "application/pdf"
			}
            });
		req.onload = function (oEvent) {
		 console.log("Hi");
		};
		req.send(blob);
        
        // need to draw the annotation otherwise it won't show up until the page is refreshed
        
      });
    });
  }, []);
	
	
	
  return (
  
    <div className="App">
      <div className="header">Cognizant Aggrement </div>
      <div className="webviewer" ref={viewer}></div>
    </div>
  );

}

export default App;
