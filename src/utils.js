// Note: Utility Functions

// define a badging function to update icon badge
function updateBadge(count) {
  if ("setAppBadge" in navigator) {
    // get the current badge number
    navigator.getAppBadge().then((currentBadgeNumber) => {
      // if the current badge number is not 0, then add the count to the current badge number
      if (currentBadgeNumber !== 0) {
        count = count + currentBadgeNumber;
      }
    });

    navigator.setAppBadge(count);
  }
}

export { updateBadge };
