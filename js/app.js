//Storage Controller
const StorageCtrl = (function () {
  //Public Methods

  return {
    storeQuest: function (quest) {
      let quests;
      //Check if any items in local storage
      if (localStorage.getItem('quests') === null) {
        quests = [];
        //Push new quest
        quests.push(quest);
        //Set local storage
        localStorage.setItem('quests', JSON.stringify(quests));
      } else {
        quests = JSON.parse(localStorage.getItem('quests'));
        //Push new quest
        quests.push(quest);
        //Reset local storage
        localStorage.setItem('quests', JSON.stringify(quests));
      }
    },
    getQuestsFromStorage: function () {
      let quests;
      if (localStorage.getItem('quests') === null) {
        quests = [];
      } else {
        quests = JSON.parse(localStorage.getItem('quests'));
      }
      return quests;
    },
    updateQuestStorage: function (updatedQuest) {
      let quests = JSON.parse(localStorage.getItem('quests'));

      quests.forEach(function (quest, index) {
        if (updatedQuest.id === quest.id) {
          quests.splice(index, 1, updatedQuest);
        }
      });
      //Reset local storage
      localStorage.setItem('quests', JSON.stringify(quests));
    },
    deleteQuestFromStorage: function (id) {
      let quests = JSON.parse(localStorage.getItem('quests'));

      quests.forEach(function (quest, index) {
        if (id === quest.id) {
          quests.splice(index, 1);
        }
      });
      //Reset local storage
      localStorage.setItem('quests', JSON.stringify(quests));
    },
    clearQuestsFromStorage: function () {
      localStorage.removeItem('quests');
    },
  };
})();

//Quest Controller
const QuestCtrl = (function () {
  //Quest constructor
  const Quest = function (id, name, description, map, trader) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.map = map;
    this.trader = trader;
  };

  //Data Structure / State
  const data = {
    quests: StorageCtrl.getQuestsFromStorage(),
    currentQuest: null,
  };

  //Public Methods
  return {
    getQuests: function () {
      return data.quests;
    },
    addQuest: function (name, description, map, trader) {
      let ID;
      //Create ID
      if (data.quests.length > 0) {
        ID = data.quests[data.quests.length - 1].id + 1;
      } else {
        ID = 0;
      }

      //Create new quest
      newQuest = new Quest(ID, name, description, map, trader);

      //Add quest to array
      data.quests.push(newQuest);

      return newQuest;
    },
    getQuestById: function (id) {
      let found = null;
      //Loop through quests
      data.quests.forEach(function (quest) {
        if (quest.id === id) {
          found = quest;
        }
      });

      return found;
    },
    updateQuest: function (name, description, map, trader) {
      let found = null;
      data.quests.forEach(function (quest) {
        if (quest.id === data.currentQuest.id) {
          quest.name = name;
          quest.description = description;
          quest.map = map;
          quest.trader = trader;
          found = quest;
        }
      });

      return found;
    },
    logData: function () {
      return data;
    },
    deleteQuest: function (id) {
      //Get IDs
      const ids = data.quests.map(function (quest) {
        return quest.id;
      });

      //Get index
      const index = ids.indexOf(id);

      //Remove item
      data.quests.splice(index, 1);
    },
    removeAllQuests: function () {
      data.quests = [];
    },
    setCurrentQuest: function (quest) {
      data.currentQuest = quest;
    },
    getCurrentQuest: function () {
      return data.currentQuest;
    },
  };
})();

//UI Controller
const UICtrl = (function () {
  const UISelectors = {
    questList: '.collection li',
    customs: '#customs-quest-list',
    factory: '#factory-quest-list',
    interchange: '#interchange-quest-list',
    labs: '#labs-quest-list',
    lighthouse: '#lighthouse-quest-list',
    reserve: '#reserve-quest-list',
    shoreline: '#shoreline-quest-list',
    woods: '#woods-quest-list',
    questNameInput: '#quest-name',
    questDescriptionInput: '#quest-description',
    mapInput: '#map',
    traderInput: '#trader',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
  };

  //Public Methods
  return {
    populateQuestList: function (quests) {
      let customs = '';
      let factory = '';
      let interchange = '';
      let labs = '';
      let lighthouse = '';
      let reserve = '';
      let shoreline = '';
      let woods = '';

      quests.forEach(function (quest) {
        if (quest.map === 'Customs') {
          customs += `
                <li class="collection-item grey darken-3 white-text" id="quest-${quest.id}">
                  <h5 class="grey-text text-lighten-1">${quest.name}</h5>
                  <a href="" class="secondary-content">
                    <i class="edit-quest fa fa-pencil"></i>
                  </a>
                  <strong>${quest.trader}</strong>
                  <em>${quest.map}</em>
                  <p>${quest.description}</p>
                </li>`;
        } else if (quest.map === 'Factory') {
          factory += `
                <li class="collection-item grey darken-3 white-text" id="quest-${quest.id}">
                  <h5 class="grey-text text-lighten-1">${quest.name}</h5>
                  <a href="" class="secondary-content">
                    <i class="edit-quest fa fa-pencil"></i>
                  </a>
                  <strong>${quest.trader}</strong>
                  <em>${quest.map}</em>
                  <p>${quest.description}</p>
                </li>`;
        } else if (quest.map === 'Interchange') {
          interchange += `
                <li class="collection-item grey darken-3 white-text" id="quest-${quest.id}">
                  <h5 class="grey-text text-lighten-1">${quest.name}</h5>
                  <a href="" class="secondary-content">
                    <i class="edit-quest fa fa-pencil"></i>
                  </a>
                  <strong>${quest.trader}</strong>
                  <em>${quest.map}</em>
                  <p>${quest.description}</p>
                </li>`;
        } else if (quest.map === 'Labs') {
          labs += `
                <li class="collection-item grey darken-3 white-text" id="quest-${quest.id}">
                  <h5 class="grey-text text-lighten-1">${quest.name}</h5>
                  <a href="" class="secondary-content">
                    <i class="edit-quest fa fa-pencil"></i>
                  </a>
                  <strong>${quest.trader}</strong>
                  <em>${quest.map}</em>
                  <p>${quest.description}</p>
                </li>`;
        } else if (quest.map === 'Lighthouse') {
          lighthouse += `
                <li class="collection-item grey darken-3 white-text" id="quest-${quest.id}">
                  <h5 class="grey-text text-lighten-1">${quest.name}</h5>
                  <a href="" class="secondary-content">
                    <i class="edit-quest fa fa-pencil"></i>
                  </a>
                  <strong>${quest.trader}</strong>
                  <em>${quest.map}</em>
                  <p>${quest.description}</p>
                </li>`;
        } else if (quest.map === 'Reserve') {
          reserve += `
                <li class="collection-item grey darken-3 white-text" id="quest-${quest.id}">
                  <h5 class="grey-text text-lighten-1">${quest.name}</h5>
                  <a href="" class="secondary-content">
                    <i class="edit-quest fa fa-pencil"></i>
                  </a>
                  <strong>${quest.trader}</strong>
                  <em>${quest.map}</em>
                  <p>${quest.description}</p>
                </li>`;
        } else if (quest.map === 'Shoreline') {
          shoreline += `
                <li class="collection-item grey darken-3 white-text" id="quest-${quest.id}">
                  <h5 class="grey-text text-lighten-1">${quest.name}</h5>
                  <a href="" class="secondary-content">
                    <i class="edit-quest fa fa-pencil"></i>
                  </a>
                  <strong>${quest.trader}</strong>
                  <em>${quest.map}</em>
                  <p>${quest.description}</p>
                </li>`;
        } else if (quest.map === 'Woods') {
          woods += `
                <li class="collection-item grey darken-3 white-text" id="quest-${quest.id}">
                  <h5 class="grey-text text-lighten-1">${quest.name}</h5>
                  <a href="" class="secondary-content">
                    <i class="edit-quest fa fa-pencil"></i>
                  </a>
                  <strong>${quest.trader}</strong>
                  <em>${quest.map}</em>
                  <p>${quest.description}</p>
                </li>`;
        }
      });

      //Insert List Items
      document.querySelector(UISelectors.customs).innerHTML = customs;
      document.querySelector(UISelectors.factory).innerHTML = factory;
      document.querySelector(UISelectors.interchange).innerHTML = interchange;
      document.querySelector(UISelectors.labs).innerHTML = labs;
      document.querySelector(UISelectors.lighthouse).innerHTML = lighthouse;
      document.querySelector(UISelectors.reserve).innerHTML = reserve;
      document.querySelector(UISelectors.shoreline).innerHTML = shoreline;
      document.querySelector(UISelectors.woods).innerHTML = woods;
    },
    getQuestInput: function () {
      return {
        name: document.querySelector(UISelectors.questNameInput).value,
        description: document.querySelector(UISelectors.questDescriptionInput).value,
        map: document.querySelector(UISelectors.mapInput).value,
        trader: document.querySelector(UISelectors.traderInput).value,
      };
    },
    addListItem: function (quest) {
      //Create li element
      const li = document.createElement('li');
      //Add class
      li.className = 'collection-item grey darken-3 white-text';
      //Add ID
      li.id = `quest-${quest.id}`;
      //Add HTML
      li.innerHTML = `
          <h5 class="grey-text text-lighten-1">${quest.name}</h5>
          <a href="" class="secondary-content">
            <i class="edit-quest fa fa-pencil"></i>
          </a>
          <strong>${quest.trader}</strong>
          <em>${quest.map}</em>
          <p>${quest.description}</p>
        `;
      //Insert item
      if (quest.map === 'Customs') {
        //Show List
        document.querySelector(UISelectors.customs).style.display = 'block';
        //Add to list
        document.querySelector(UISelectors.customs).insertAdjacentElement('beforeend', li);
      } else if (quest.map === 'Factory') {
        document.querySelector(UISelectors.factory).style.display = 'block';
        document.querySelector(UISelectors.factory).insertAdjacentElement('beforeend', li);
      } else if (quest.map === 'Interchange') {
        document.querySelector(UISelectors.interchange).style.display = 'block';
        document.querySelector(UISelectors.interchange).insertAdjacentElement('beforeend', li);
      } else if (quest.map === 'Labs') {
        document.querySelector(UISelectors.labs).style.display = 'block';
        document.querySelector(UISelectors.labs).insertAdjacentElement('beforeend', li);
      } else if (quest.map === 'Lighthouse') {
        document.querySelector(UISelectors.lighthouse).style.display = 'block';
        document.querySelector(UISelectors.lighthouse).insertAdjacentElement('beforeend', li);
      } else if (quest.map === 'Reserve') {
        document.querySelector(UISelectors.reserve).style.display = 'block';
        document.querySelector(UISelectors.reserve).insertAdjacentElement('beforeend', li);
      } else if (quest.map === 'Shoreline') {
        document.querySelector(UISelectors.shoreline).style.display = 'block';
        document.querySelector(UISelectors.shoreline).insertAdjacentElement('beforeend', li);
      } else if (quest.map === 'Woods') {
        document.querySelector(UISelectors.woods).style.display = 'block';
        document.querySelector(UISelectors.woods).insertAdjacentElement('beforeend', li);
      }
    },
    updateQuestItem: function (quest) {
      let questItems = document.querySelectorAll(UISelectors.questList);

      //Turn node list to array
      questItems = Array.from(questItems);

      questItems.forEach(function (questItem) {
        const questID = questItem.getAttribute('id');

        if (questID === `quest-${quest.id}`) {
          document.querySelector(`#${questID}`).innerHTML = `
          <h5 class="grey-text text-lighten-1">${quest.name}</h5>
          <a href="" class="secondary-content">
            <i class="edit-quest fa fa-pencil"></i>
          </a>
          <strong>${quest.trader}</strong>
          <em>${quest.map}</em>
          <p>${quest.description}</p>`;
        }
      });
    },
    deleteQuestItem: function (id) {
      const questID = `#quest-${id}`;
      const quest = document.querySelector(questID);
      quest.remove();
    },
    clearInput: function () {
      document.querySelector(UISelectors.questNameInput).value = '';
      document.querySelector(UISelectors.questDescriptionInput).value = '';
      document.querySelector(UISelectors.mapInput).selectedIndex = -1;
      document.querySelector(UISelectors.traderInput).selectedIndex = -1;
      const selectors = document.querySelectorAll('select');
      M.FormSelect.init(selectors, {});
    },
    addQuestToForm: function () {
      document.querySelector(UISelectors.questNameInput).value = QuestCtrl.getCurrentQuest().name;
      document.querySelector(UISelectors.questDescriptionInput).value = QuestCtrl.getCurrentQuest().description;
      document.querySelector(UISelectors.mapInput).value = QuestCtrl.getCurrentQuest().map;
      document.querySelector(UISelectors.traderInput).value = QuestCtrl.getCurrentQuest().trader;
      UICtrl.showEditState();
      const selectors = document.querySelectorAll('select');
      M.FormSelect.init(selectors, {});
    },
    removeQuests: function () {
      let questItems = document.querySelectorAll(UISelectors.questList);
      ///Turn node list to array
      questItems = Array.from(questItems);

      questItems.forEach(function (quest) {
        quest.remove();
      });
    },
    hideList: function () {
      document.querySelector(UISelectors.customs).style.display = 'none';
      document.querySelector(UISelectors.factory).style.display = 'none';
      document.querySelector(UISelectors.interchange).style.display = 'none';
      document.querySelector(UISelectors.labs).style.display = 'none';
      document.querySelector(UISelectors.lighthouse).style.display = 'none';
      document.querySelector(UISelectors.reserve).style.display = 'none';
      document.querySelector(UISelectors.shoreline).style.display = 'none';
      document.querySelector(UISelectors.woods).style.display = 'none';
    },
    clearEditState: function () {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },
    showEditState: function () {
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    },
    getSelectors: function () {
      return UISelectors;
    },
  };
})();

//App Controller
const AppCtrl = (function (QuestCtrl, UICtrl, StorageCtrl) {
  //Load event listeners
  const loadEventListeners = function () {
    //Get UI selectors
    const UISelectors = UICtrl.getSelectors();

    //Add quest event
    document.querySelector(UISelectors.addBtn).addEventListener('click', questAddSubmit);

    //Disable submit on enter
    // document.addEventListener('keypress', function (e) {
    //   if (e.keyCode === 13 || e.which === 13) {
    //     e.preventDefault();
    //     return false;
    //   }
    // });

    //Edit icon click event
    document.querySelector(UISelectors.customs).addEventListener('click', questEditClick);
    document.querySelector(UISelectors.factory).addEventListener('click', questEditClick);
    document.querySelector(UISelectors.interchange).addEventListener('click', questEditClick);
    document.querySelector(UISelectors.labs).addEventListener('click', questEditClick);
    document.querySelector(UISelectors.lighthouse).addEventListener('click', questEditClick);
    document.querySelector(UISelectors.reserve).addEventListener('click', questEditClick);
    document.querySelector(UISelectors.shoreline).addEventListener('click', questEditClick);
    document.querySelector(UISelectors.woods).addEventListener('click', questEditClick);

    //Update item event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', questUpdateSubmit);

    //Back button event
    document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

    //Delete button event
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', questDeleteSubmit);

    //Clear quests event
    document.querySelector(UISelectors.clearBtn).addEventListener('click', removeAllQuestsClick);
  };

  //Add quest submit
  const questAddSubmit = function (e) {
    //Get form input from UI Controller
    const input = UICtrl.getQuestInput();

    //Check for inputs
    if (input.name !== '' && input.description !== '' && input.map !== '' && input.trader !== '') {
      //Add quest
      const newQuest = QuestCtrl.addQuest(input.name, input.description, input.map, input.trader);
      //Add quest to list
      UICtrl.addListItem(newQuest);

      //Store in local storage
      StorageCtrl.storeQuest(newQuest);
      //Clear Fields
      UICtrl.clearInput();
    }

    e.preventDefault();
  };

  //Click edit quest
  const questEditClick = function (e) {
    if (e.target.classList.contains('edit-quest')) {
      //Get list item id
      const listId = e.target.parentNode.parentNode.id;
      //Break into array
      const listIdArr = listId.split('-');
      //Get actual ID
      const id = parseInt(listIdArr[1]);
      //Get quest
      const questToEdit = QuestCtrl.getQuestById(id);
      //Set current quest
      QuestCtrl.setCurrentQuest(questToEdit);
      //Add quest to form
      UICtrl.addQuestToForm();
    }
    e.preventDefault();
  };

  //Update quest submit
  const questUpdateSubmit = function (e) {
    //Get quest input
    const input = UICtrl.getQuestInput();

    //Update quest
    const updatedQuest = QuestCtrl.updateQuest(input.name, input.description, input.map, input.trader);

    //Update UI
    UICtrl.updateQuestItem(updatedQuest);

    //Update local storage
    StorageCtrl.updateQuestStorage(updatedQuest);

    //Clear state
    UICtrl.clearEditState();

    e.preventDefault();
  };

  //Quest delete event
  const questDeleteSubmit = function (e) {
    //Get current ID
    const currentQuest = QuestCtrl.getCurrentQuest();

    //Delete from data structure
    QuestCtrl.deleteQuest(currentQuest.id);

    //Delete from UI
    UICtrl.deleteQuestItem(currentQuest.id);

    //Delete from local storage
    StorageCtrl.deleteQuestFromStorage(currentQuest.id);

    //Clear state
    UICtrl.clearEditState();

    e.preventDefault();
  };

  //Clear quests event
  const removeAllQuestsClick = function () {
    //Delete all quests from data structure
    QuestCtrl.removeAllQuests();

    //Remove from UI
    UICtrl.removeQuests();

    //Remove from loca storage
    StorageCtrl.clearQuestsFromStorage;
  };

  //Public Methods
  return {
    init: function () {
      //Auto init materialize JS
      M.AutoInit();

      //Clear edit state
      UICtrl.clearEditState();

      //Fetch quests from data structure
      const quests = QuestCtrl.getQuests();

      //Populate list with quests
      UICtrl.populateQuestList(quests);

      //Load event listeners
      loadEventListeners();
    },
  };
})(QuestCtrl, UICtrl, StorageCtrl);

AppCtrl.init();
