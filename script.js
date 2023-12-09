let objectArray = [];

$(document).ready(function() {
  fetchObjects();
});

function fetchObjects() {
  $.ajax({
    url: 'https://api.thecatapi.com/v1/breeds',
    method: 'GET',
    success: function(data) {
      objectArray = data;
      displayObjects();
      populateSelects();
    },
    error: function(error) {
      console.error('Error fetching data:', error);
    }
  });
}

function displayObjects() {
  const objectList = $('#objectList');
  objectList.empty();

  objectArray.forEach(function(object, index) {
    const listItem = $('<li>');
    const nameDiv = $('<div>').text(`Name: ${object.name}`);
    const featuresDiv = $('<div>').text(`Features: ${object.description}`);
    const actionsDiv = $('<div>');
    const updateButton = $('<button>').addClass('update-btn').text('Update');
    const deleteButton = $('<button>').addClass('delete-btn').text('Delete');

    updateButton.click(function() {
      const updatedName = prompt('Enter updated name:', object.name);
      const updatedFeatures = prompt('Enter updated features:', object.description);
      if (updatedName !== null && updatedFeatures !== null) {
        updateObject(index, updatedName, updatedFeatures);
      }
    });

    deleteButton.click(function() {
      deleteObject(index, listItem);
    });

    actionsDiv.append(updateButton, deleteButton);
    listItem.append(nameDiv, featuresDiv, actionsDiv);

    if (object.slideIn) {
      listItem.addClass('slide-in');
      delete object.slideIn;
    }

    if (object.slideOut) {
      listItem.addClass('slide-out');
      delete object.slideOut;
    }

    if (object.slideIn) {
      $('#app > div:first-child').after(listItem);
    } else {
      objectList.append(listItem);
    }
  });
}

function createObject() {
  const newName = $('#nameInput').val();
  const newFeatures = $('#featuresInput').val();
  const newObject = { name: newName, description: newFeatures, slideIn: true };

  objectArray.unshift(newObject);

  displayObjects();
  populateSelects();

  alert('Breed created.');
}

function updateObject(index, updatedName, updatedFeatures) {
  objectArray[index].name = updatedName;
  objectArray[index].description = updatedFeatures;
  objectArray[index].slideIn = true;
  displayObjects();

  alert('Breed updated.');
}

function deleteObject(index, listItem) {
  listItem.addClass('slide-out');

  setTimeout(function() {
    objectArray.splice(index, 1);
    displayObjects();
  }, 500);
}
