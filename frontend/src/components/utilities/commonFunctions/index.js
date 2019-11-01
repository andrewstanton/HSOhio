// See If Boolean Even If A String
export const bool = value => {
  switch (value) {
    case "1":
      return true;
    case "0":
      return false;
    case "true":
      return true;
    case "false":
      return false;
    default:
      return value;
  }
};

export const lowercase = string => {
  return String(string).toLowerCase();
};

export const bytesToSize = bytes => {
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes == 0) return "0 Byte";
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
};

// Either Reduce State Or Convert Empty
export const reduceOrEmptyState = ({ reduce = true, state }) =>
  reduce ? reduceState(state) : convertEmptyStateToNull(state);

// Removes Unnessasary State Options
export const reduceState = state =>
  Object.keys(state)
    .filter(item => state[item] !== "" && state[item] !== null)
    .reduce((obj, key) => {
      obj[key] = state[key];
      return obj;
    }, {});

// Convert Empty Whitespace To Null
export const convertEmptyStateToNull = state => {
  const data = Object.keys(state)
    .map(item => {
      return String(state[item]).trim() == "" ||
        String(state[item]).trim() == " "
        ? null
        : item;
    })
    .reduce((obj, key) => {
      obj[key] = state[key];
      return obj;
    }, {});
  return data;
};

// Function For Table
export const applyTableFilters = ({
  nodes = [],
  filterNodes,
  table = null,
}) => {
  if (table) {
    const filters = table.gatherFilters();
    nodes = Object.keys(filters).length
      ? filterNodes({ filters, allNodes: nodes })
      : nodes;
  }
  return nodes;
};

// Function To Fire Off Table Loading
export const changeTableLoading = ({ table = null, bool }) => {
  if (table) {
    table.loadingChange(bool);
  }
};

export const arrayMatch = function(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
};
