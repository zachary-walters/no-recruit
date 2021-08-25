function parseFilterArr(filterString) {
  const filterArr = filterString.split("|");
  let jobCardHTMLchildren = document.getElementById("mosaic-provider-jobcards").childNodes;

  for (let sliderChild of jobCardHTMLchildren) {
    for (let filter of filterArr) {
      if (sliderChild.innerHTML.includes(filter) || sliderChild.innerText.includes(filter)) {
            sliderChild.innerHTML = '';
            break;
      }
    }
  }
}


function getFilterList(callback, filterString) {
  var indeedFilters = "";

  chrome.storage.sync.get(filterString, function (obj) {
    indeedFilters = obj.indeedFilterList;
    callback(indeedFilters);
  });  
}


window.addEventListener('load', function () {
  getFilterList(parseFilterArr, 'indeedFilterList')
});