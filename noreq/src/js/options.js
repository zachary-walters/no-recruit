function addRecommended(callback) {
  let rawFile = new XMLHttpRequest();
  rawFile.open("GET", '../resources/recommended-filters.txt', true);        
  rawFile.onreadystatechange = function ()
  {
      if(rawFile.readyState === 4)
      {
          if(rawFile.status === 200 || rawFile.status === 0)
          {
              let allText = rawFile.responseText.split('\n').join('|');;
              document.getElementById('filter-list').value = document.getElementById('filter-list').value + '|' + allText.toString();
          }
      }
  };
  rawFile.send(null);
}

function cleanList(filterString) {
  // Removes duplicates
  const filterArr = filterString.split("|");
  let uniqueFilterArr = [];
  filterArr.forEach((c) => {
    if (!uniqueFilterArr.includes(c)) {
      uniqueFilterArr.push(c);
    }
  });

  return uniqueFilterArr.join('|');
}

// Saves options to chrome.storage
function saveOptions() {
  let indeedList = document.getElementById('filter-list').value;

  indeedList = cleanList(indeedList);

  chrome.storage.sync.set({
    indeedFilterList: indeedList
  }, function() {
    // Update status to let user know options were saved.
    let status = document.getElementById('status');
    document.getElementById('filter-list').value = indeedList;
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function restoreOptions() {
  chrome.storage.sync.get({
    indeedFilterList: '',
  }, function(items) {
    document.getElementById('filter-list').value = items.indeedFilterList;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('add-recommended').addEventListener('click', addRecommended);