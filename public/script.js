var canvas = new fabric.Canvas('c', {
    preserveObjectStacking: true
});
var currentText;
var visitCount = parseInt(localStorage.getItem('visitCount') || 0);
var downloadCount = parseInt(localStorage.getItem('downloadCount') || 0);
visitCount++;
localStorage.setItem('visitCount', visitCount);
document.getElementById('visitCount').textContent = visitCount;
document.getElementById('downloadCount').textContent = downloadCount;

document.getElementById('text-string').addEventListener('input', addOrUpdateText);

fabric.Image.fromURL('background1.jpg', function(img) {
    updateBackground(img);
});



function downloadCanvas() {
    var link = document.createElement('a');
    link.download = 'custom-image.png';
    link.href = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    link.click();

    // Increment and update download count
    downloadCount++;
    localStorage.setItem('downloadCount', downloadCount);
    document.getElementById('downloadCount').textContent = downloadCount;
}

// Remaining existing script.js content


function changeBackground(background) {
    fabric.Image.fromURL(background, function(img) {
        updateBackground(img);
    });
}

function updateBackground(img) {
    img.scaleToWidth(canvas.width);
    img.scaleToHeight(canvas.height);
    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
}

function addOrUpdateText() {
    var textValue = document.getElementById('text-string').value;
    if (!currentText) {
        currentText = new fabric.IText(textValue, {
            left: canvas.width / 2,
            top: canvas.height / 2,
            fontFamily: 'Arial',
            fill: document.getElementById('text-color').value,
            fontSize: 24,
            originX: 'center',
            originY: 'center'
        });
        canvas.add(currentText);
    } else {
        currentText.text = textValue;
        canvas.renderAll();
    }
}

function changeColor() {
    if (currentText) {
        var newColor = document.getElementById('text-color').value;
        currentText.set('fill', newColor);
        document.getElementById('color-indicator').style.backgroundColor = newColor;
        canvas.renderAll();
    }
}

function toggleBold() {
    if (currentText) {
        var fontWeight = currentText.fontWeight === 'bold' ? '' : 'bold';
        currentText.set('fontWeight', fontWeight);
        canvas.renderAll();
    }
}

function toggleItalic() {
    if (currentText) {
        var fontStyle = currentText.fontStyle === 'italic' ? '' : 'italic';
        currentText.set('fontStyle', fontStyle);
        canvas.renderAll();
    }
}

function alignText(alignment) {
    if (currentText) {
        currentText.textAlign = alignment;
        canvas.renderAll();
    }
}

function downloadCanvas() {
    var link = document.createElement('a');
    link.download = 'custom-image.png';
    link.href = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    link.click();
}


