
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
function validate() {
    var y = this.y.value;
    y = y.replace(/,/, ".");
    if (y =="" || isNaN(y)) {document.getElementById("error").textContent = "Y должен быть числом"; return false}
    else if (y<-3 || y>5){
        document.getElementById("error").textContent = "Y должен находиться от -3 до 5"; return false
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
