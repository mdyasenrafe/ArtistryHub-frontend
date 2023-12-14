function generateUUID() {
  let dt = new Date().getTime();
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}

function saveUniqueId() {
  // Check if a unique ID already exists
  if (!localStorage.getItem("uniqueID")) {
    // If not, generate a new ID and save it
    let uniqueID = generateUUID();
    localStorage.setItem("uniqueID", uniqueID);
    return uniqueID;
  }
}

function getUniqueId() {
  // Retrieve the unique ID from local storage
  return localStorage.getItem("uniqueID");
}

export { saveUniqueId, getUniqueId };
