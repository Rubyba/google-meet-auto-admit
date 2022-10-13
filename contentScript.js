
if ([...document.querySelectorAll("[data-mdc-dialog-action]")].length > 0) {
  for (const element of document.querySelectorAll("[data-mdc-dialog-action]")) {
    if (element.getAttribute('data-mdc-dialog-action') === "accept") {
      element.click();
      setTimeout(() => {
        for (const innerElement of document.querySelectorAll("[data-mdc-dialog-action]")) {
          if (innerElement.getAttribute('data-mdc-dialog-action') === "accept") {
            innerElement.click();
          }
        }
      }, 200);
    }
  }
}
