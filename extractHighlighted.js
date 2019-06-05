function extractHighlighted() {
    var annots = this.getAnnots({nSortBy: ANSB_Page});
    var pages = [];
    if (annots) {
        for (i = 0; i < annots.length; i++) {
            if (annots[i].type === "Highlight") {
                pages.push(annots[i].page);
            }
        }
    }

    if (pages.length === 0)
    	return;

    var i = this.numPages - 1;
    var j = pages.length - 1;
    while (i >= 0) {
        if (j < 0) {
        	try {
            	this.deletePages({nStart: 0, nEnd: Number(i)});
            } catch (err) {
            	console.println(err);
            }
            i = -1;
        } else if (pages[j] === i) {
            i--;
        } else if (pages[j] > i) {
            j--;
        } else if (pages[j] < i) {
        	try {
            	this.deletePages({nStart: Number(i), nEnd: Number(i)});
            } catch (err) {
            	console.println(err);
            }
            i--;
        }
    }
}

app.addMenuItem({cName: "Extract Highlights", cParent: "Edit", cExec: "extractHighlighted();"});