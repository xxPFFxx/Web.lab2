
    function ajaxRequest() {
        try {
            var request = new XMLHttpRequest()
        }
        catch (e1) {
            try{
                request = new ActiveXObject("Msxml2.XMLHTTP")
            }
            catch (e2) {
                try {
                    request = new ActiveXObject("Microsoft.XMLHTTP")
                }
                catch (e3) {
                    request = false
                }
            }
        }
        return request
    }
    function unchosen(type) {
    let elems = document.getElementsByClassName(type);
        for (var i = 0; i < elems.length; i++){
            if (elems[i].classList.contains('chosen')) {
                elems[i].classList.remove('chosen');
            }
        }
    }
    function buttonParsing(button, par) {
        document.getElementById('hidden' + par).value = button.value;
        unchosen(button.className);
        button.classList.add('chosen');
        if (par == 'r' && validateR()){
            redraw();
            for (let i = 0; i < points.length; i++) {
                let x = points[i][0];
                let y = points[i][1];
                let r = button.value;
                let color = "#000000";
                if (x<=0 && y>=0 && x*x+y*y<=r*r  ||
                    x>=0 && y>=0 && y <= r/2-x ||
                    x<=0 && y<=0 && y>=-r && x >= -r){
                    color = "#00ff00";
                }
                else {
                    color = "#ff0000";
                }
                drawPoint(points[i][0], points[i][1], color)
            }
        }

    }
    function validateR() {
        let r = document.getElementById("hiddenr").value;
        if (document.getElementById("hiddenr").value.length == 0 || isNaN(r)) {
            document.getElementById("error").textContent = "R должен быть числом";
            return false
        } else if (r < 1 || r > 5) {
            document.getElementById("error").textContent = "R должен находиться от 1 до 5";
            return false
        } else {
            return true;
        }
    }
function validate() {
    if (document.getElementById("posy").value.search(",") != -1) {
        let tmp = document.getElementById("posy").value.replace(",", ".");
        document.getElementById("posy").value = tmp;
    }
    if (document.getElementById("hiddenx").value.search(",") != -1) {
        let tmp = document.getElementById("hiddenx").value.replace(",", ".");
        document.getElementById("hiddenx").value = tmp;
    }
    if (document.getElementById("hiddenr").value.search(",") != -1) {
        let tmp = document.getElementById("hiddenr").value.replace(",", ".");
        document.getElementById("hiddenr").value = tmp;
    }
    let y = document.getElementById("posy").value;
    let x = document.getElementById("hiddenx").value;
    let r = document.getElementById("hiddenr").value;
    if (document.getElementById("posy").value.length == 0 || isNaN(y)) {document.getElementById("error").textContent = "Y должен быть числом"; return false}

    else if (y<-5 || y>3){
        document.getElementById("error").textContent = "Y должен находиться от -5 до 3"; return false
    }
    else if (document.getElementById("hiddenx").value.length == 0 || isNaN(x)) {document.getElementById("error").textContent = "X должен быть числом"; return false}

    else if (x<-5 || x>3){
        document.getElementById("error").textContent = "X должен находиться от -5 до 3"; return false
    }
    else if (document.getElementById("hiddenr").value.length == 0 || isNaN(r)) {document.getElementById("error").textContent = "R должен быть числом"; return false}

    else if (r<1 || r>5){
        document.getElementById("error").textContent = "R должен находиться от 1 до 5"; return false
    }
    else {
        document.getElementById("error").textContent = "";
        sendAjaxButton();
        return true;}
}
function sendAjax(request, ajaxX, ajaxY, ajaxR, graph) {
    request.open("GET", "control?y=" + ajaxY + "&x=" + ajaxX + "&r=" + ajaxR, true);
    request.onreadystatechange = function()
    {
        if (this.readyState == 4)
        {
            if (this.status == 200)
            {
                if (this.responseText != null)
                {
                    document.querySelector('table').innerHTML +=
                        this.responseText;
                    let result = this.responseText;
                    let color = "#000000";
                    if (result.indexOf("Попал") != -1){
                        color = "#00ff00";
                    }
                    else {
                        color = "#ff0000";
                    }
                    drawPoint(ajaxX, ajaxY, color);
                    points.push([ajaxX, ajaxY, ajaxR]);
                }
                else alert("Ошибка AJAX: Данные не получены ")
            }
            else alert( "Ошибка AJAX: " + this.statusText)
        }
    }
    request.send(null)
}
function sendAjaxPoints() {
    let request = new ajaxRequest();
    request.open("GET", "control?getPoints=true", true);
    request.onreadystatechange = function()
    {
        if (this.readyState == 4)
        {
            if (this.status == 200)
            {
                if (this.responseText != null)
                {
                    let getpoints = this.responseText.split(";");
                    for (let i = 0; i<getpoints.length; i++){
                        if (getpoints[i].length<2){
                            continue;
                        }
                        if (getpoints[i].substring(0,4) == "null"){
                            getpoints[i] = getpoints[i].substring(4);
                        }
                        let xandy = getpoints[i].split(" ");
                        if (xandy[0]!=null && xandy[1]!=null){
                            points.push([xandy[0],xandy[1]]);
                        }
                    }
                }
                else alert("Ошибка AJAX: Данные не получены ")
            }
            else alert( "Ошибка AJAX: " + this.statusText)
        }
    }
    request.send(null)
}
function sendAjaxButton() {
    let request = new ajaxRequest();
    let ajaxY = document.getElementById("posy").value;
    let ajaxX = document.getElementById("hiddenx").value;
    let ajaxR = document.getElementById("hiddenr").value;
    let graph = 0;
    sendAjax(request, ajaxX, ajaxY, ajaxR, graph);
}
    function sendAjaxGraph(x,y,r) {
        let request = new ajaxRequest();
        let ajaxY = y;
        let ajaxX = x;
        let ajaxR = r;
        let graph = 1;
        sendAjax(request, ajaxX, ajaxY, ajaxR, graph);
    }
function checkY() {
    var y = document.querySelector("input[type=text]").value.replace(/,/, ".");
    var test = /[^\d-,.]/.test(y);
    if (test && y!==''){
        document.getElementById("error").textContent = "Введены недопустимые символы"; return false;
    }

    if (y =="" || isNaN(y)) {document.getElementById("error").textContent = "Y должен быть числом"; return false}
    else if (y<-3 || y>5){
        document.getElementById("error").textContent = "Y должен находиться от -3 до 5"; return false
    }
    else {
        document.getElementById("error").textContent = "";
        return true;}
}
