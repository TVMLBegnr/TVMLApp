//# sourceURL=application.js
//
//  application.js
//  OverLay
//
//  Created by mac on 04/04/19.
//  Copyright © 2019 mac. All rights reserved.
//

/*
 * This file provides an example skeletal stub for the server-side implementation 
 * of a TVML application.
 *
 * A javascript file such as this should be provided at the tvBootURL that is 
 * configured in the AppDelegate of the TVML application. Note that  the various 
 * javascript functions here are referenced by name in the AppDelegate. This skeletal 
 * implementation shows the basic entry points that you will want to handle 
 * application lifecycle events.
 */

/**
 * @description The onLaunch callback is invoked after the application JavaScript 
 * has been parsed into a JavaScript context. The handler is passed an object 
 * that contains options passed in for launch. These options are defined in the
 * swift or objective-c client code. Options can be used to communicate to
 * your JavaScript code that data and as well as state information, like if the 
 * the app is being launched in the background.
 *
 * The location attribute is automatically added to the object and represents 
 * the URL that was used to retrieve the application JavaScript.
 */



var jsonURL;
var catDocument;
var results;
App.onLaunch = function(options) {

    var baseURL = options.baseURL
    jsonURL = baseURL + "Videos.json";
    
    getJSONDocument(jsonURL);
    catDocument = createCatalogDocument()
    catDocument.addEventListener("select", playSelectedLockup);
    catDocument.addEventListener("play", playSelectedLockup);
    navigationDocument.pushDocument(catDocument);
}
function getJSONDocument(jsonURL) {
    
    var templateXHR = new XMLHttpRequest();
    templateXHR.responseType = "document";
    templateXHR.addEventListener("load", function(){parseJson(templateXHR.responseText);}, false);
    templateXHR.open("GET", jsonURL, true);
    templateXHR.send();
  
}
function parseJson(information) {
    results = JSON.parse(information);
    var resp = results.Public;
    

    let grid = catDocument.getElementsByTagName("grid").item(0)
    
    let section = grid.getElementsByTagName("section").item(0)
    section.dataItem = new DataItem()
    let newItems = results.Public.map((result) => {
                                      let objectItem = new DataItem(result.type, result.title);
                                      objectItem.img = result.img;
                                      objectItem.title = result.title;
                                      return objectItem;
                                      });
    
    section.dataItem.setPropertyPath("images", newItems)
    
}
function playSelectedLockup(event)
{
    const playlist = new Playlist();
    const player = new Player();
    
    const lockupElem = event.target;
    const session_id = lockupElem.getAttribute('URL');
    const session = results.Public

    const mediaItem = new MediaItem('video', "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4");
    
    mediaItem.title = session.title;
    mediaItem.URL = session.URL;
    
    playlist.push(mediaItem);
    player.playList = playlist;
    player.play();
    
}
var createAlert = function(title) {
    var alertString = `<?xml version="1.0" encoding="UTF-8" ?>
    <document>
    <alertTemplate>
    <title>${title}</title>
    </alertTemplate>
    </document>`
    var parser = new DOMParser();
    var alertDoc = parser.parseFromString(alertString, "application/xml");
    return alertDoc
}
function createCatalogDocument()
{
    var cattemplate = `<?xml version="1.0" encoding="UTF-8" ?>

    <document>
        <catalogTemplate>
            <head>
                <style>
                .expiresSoon {
                color: rgba(255, 0, 0, 1.0);
                    tv-highlight-color: rgba(255, 20, 20, 1.0);
                }
    
                .expiresLater {
                color: rgba(0, 0, 0, 1.0);
                }
            </style>
        </head>
        <banner>
            <title>Movies</title>
        </banner>
        <list>
            <section>
            <listItemLockup>
            <title>Videos</title>
        <relatedContent>
        <grid>
            <prototypes>
               <lockup prototype="public" URL ="@src:{URL};">
    
                    <img binding="@src:{img};" width="200" height="200"/>
                    <placeholder tag="title" />
                </lockup>
            </prototypes>
            <section binding="items:{images};" />
        </grid>
    </relatedContent>
    </listItemLockup>
    
    <listItemLockup searchDocumentURL="/Search.xml">
        <title>Search</title>
            <relatedContent>
    
            </relatedContent>
    </listItemLockup>
        <listItemLockup>
            <title>profile</title>
                <relatedContent>
                </relatedContent>
        </listItemLockup>
    </section>
    </list>
    </catalogTemplate>
    </document>`;
    var parser = new DOMParser();
    var catDoc = parser.parseFromString(cattemplate, "application/xml");
    return catDoc;
}
