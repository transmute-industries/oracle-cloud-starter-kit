const T = require("transmute-framework");
const eventStoreArtifact = require("../dapp/src/contracts/EventStore.json");
const transmuteConfig = require("../dapp/src/transmute-config");

const eventStore = new T.EventStore({
  eventStoreArtifact,
  ...transmuteConfig
});

// console.log(transmuteConfig)

const filter = event => {
  // process all events
  return event;
};

const reducer = (state, event) => {
  switch (event.key.type) {
    // record all events index'ed by timestamp
    case "EVENT_WRITTEN": {
      return {
        ...state,
        events: {
          ...state.events,
          [event.value.timestamp]: event
        }
      };
    }

    default: {
      return state;
    }
  }
};

const getStreamModel = async () => {
  await eventStore.init();
  const streamModel = new T.StreamModel(eventStore, filter, reducer, null);
  await streamModel.sync();
  return streamModel.state;
};

module.exports = {
  getStreamModel
};
