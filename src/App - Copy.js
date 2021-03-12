import React, { useRef, useEffect } from 'react';
import WebViewer from '@pdftron/webviewer';
import './App.css';
 import queryString from 'query-string';
 import {useLocation} from "react-router-dom";


class App extends React.Component {
//const App = () => {
 
constructor(props) {
    super(props);
	this.viewer = React.createRef();
//	 const search = props.location.search;
  //  const name = new URLSearchParams(search).get("fileName");
  useEffect
  }


   useEffect() {
  // if using a class, equivalent of componentDidMount 
  //useEffect() {	
  
 // let query = new URLSearchParams(useLocation().search);;
  console.log("***********************");
  
	  
    WebViewer(
      {
        path:'/webviewer/lib',
        initialDoc: '/files/pdf-lib_modification_example.pdf',
		fullAPI:true
      },
      this.viewer.current,
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

        annotManager.addAnnotation(rectangleAnnot);
        // need to draw the annotation otherwise it won't show up until the page is refreshed
        annotManager.redrawAnnotation(rectangleAnnot);
      });
    });
	return;
	
  }//, []);
render() {
	 
	 console.log("----------------------------------");
	
	
  return (
    <div className="App">
      <div className="header">Cognizant Aggrement </div>
      <div className="webviewer" ref={this.viewer}></div>
    </div>
  );
}
}

export default App;
