
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
    let y = this.y.value;
    let x = this.x.value;
    let r = this.r.value;
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
        alert(r);
        document.getElementById("error").textContent = "R должен находиться от 1 до 5"; return false
    }
    else {
        document.getElementById("div-result").style.display = "block";
        document.getElementById("error").textContent = "";
        return true;}
}
function check() {
    var request = new ajaxRequest();
    var ajaxY = document.querySelector("input[type=text]").value;
    request.open("GET", "control?ajaxy=" + ajaxY, true);
    request.onreadystatechange = function()
    {
        if (this.readyState == 4)
        {
            if (this.status == 200)
            {
                if (this.responseText != null)
                {
                    document.getElementById('error').textContent =
                        this.responseText
                }
                else alert("Ошибка AJAX: Данные не получены ")
            }
            else alert( "Ошибка AJAX: " + this.statusText)
        }
    }
    request.send(null)
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
