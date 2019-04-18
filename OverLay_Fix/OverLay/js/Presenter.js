
var Presenter = {
makeDocument: function(resource) {
    if (!Presenter.parser) {
        Presenter.parser = new DOMParser();
    }
    var doc = Presenter.parser.parseFromString(resource, "application/xml");
    return doc;
},
modalDialogPresenter: function(xml) {
    navigationDocument.presentModal(xml);
},
pushDocument: function(xml) {
    navigationDocument.pushDocument(xml);
},
load: function(event) {
    var self = this,
    ele = event.target,
    URL = ele.getAttribute("URL")
    if(URL) {
        var player = new Player();
        var playlist = new Playlist();
        var mediaItem = new MediaItem("video", URL);
        player.playlist = playlist
        player.playlist.push(mediaItem);
        player.present();
    }
},
}




