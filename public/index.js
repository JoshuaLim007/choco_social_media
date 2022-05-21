var req = new XMLHttpRequest();
var url = '/posts/grabData';

req.open('GET',url,true); // set this to POST if you would like
req.addEventListener('load',onLoad);
req.addEventListener('error',onError);

req.send();

function duplicateChildNodes (parentId){
    var parent = document.getElementById(parentId);
    NodeList.prototype.forEach = Array.prototype.forEach;
    var children = parent.childNodes;
    children.forEach(function(item){
      var cln = item.cloneNode(true);
      parent.appendChild(cln);
    });
};


function onLoad() {
    var response = this.responseText;
    var parsedResponse = JSON.parse(response);
    console.log(parsedResponse);
}

function onError() {
  // handle error here, print message perhaps
  console.log('error receiving async AJAX call');
}