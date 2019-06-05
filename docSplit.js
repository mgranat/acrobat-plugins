trustedInsertPages = app.trustedFunction(function(doc, oArgs) {
    app.beginPriv();
        var trustedReturn = doc.insertPages(oArgs);
    app.endPriv();
    return trustedReturn;
});

function splitDocument(topX, topY) {
    centerX = this.mouseX;
    centerY = this.mouseY;

    var button = this.getField("splitButton");
    button.display = display.hidden;

    width = centerX - topX;
    height = topY - centerY;

    try {
	for (i = 0; i < this.numPages; i = i + 4) {
            this.trustedInsertPages(this, {nPage: i, cPath: this.path, nStart: i, nEnd: i});
            this.setPageBoxes({cBox:"Crop", nStart: i + 1, nEnd: i + 1, rBox: [topX, centerY - height, centerX, centerY]});
            this.trustedInsertPages(this, {nPage: i + 1, cPath: this.path, nStart: i, nEnd: i});
            this.setPageBoxes({cBox:"Crop", nStart: i + 2, nEnd: i + 2, rBox: [centerX, centerY, centerX + width, topY]});
            this.trustedInsertPages(this, {nPage: i + 2, cPath: this.path, nStart: i, nEnd: i});
            this.setPageBoxes({cBox:"Crop", nStart: i + 3, nEnd: i + 3, rBox: [centerX, centerY - height, centerX + width, centerY]});

            this.setPageBoxes({cBox:"Crop", nStart: i, nEnd: i, rBox: [topX, centerY, centerX, topY]});
        }
    } catch(e) {
        app.alert("There was an unexpected error inserting new pages.");
    }
}

function getFirstCoords() {
    var x = this.mouseX;
    var y = this.mouseY;

    var button = this.getField("splitButton");
    button.setAction("MouseUp", "splitDocument(" + x + ", " + y + ");");
}

function addButton() {
    var pageRectangle = this.getPageBox("Crop", 0);
    var splitButton = this.addField("splitButton", "button", 0, pageRectangle);
    splitButton.setAction("MouseUp", "getFirstCoords();");
    splitButton.display = display.visible;
}

app.addMenuItem({cName:"Split Document", cParent:"Edit", cExec:"addButton();"});