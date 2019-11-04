<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>

  <meta charset="UTF-8">
  <title>Лабораторная работа по Web-программированию №2</title>
  <link rel="stylesheet" type="text/css" href="resources/css/styles.css">
  <script src="resources/js/scripts.js"></script>
</head>
<>

<div class="header block">
  <span class="header"> Демичев Даниил Дмитриевич<br> Группа P3213 <br> Вариант: 213100</span>
</div>
<div class="block" id="result_container">
<div class="info">
  <canvas height="360px" width="360px" id="zoneCanvas"></canvas>

</div>
<div class=" result_data" id="result_data">Hu? </div>
</div>
<div class="block input">
  <form method="get">
    Выберите X:
    <button class="buttonx" type="button" value="-5" onclick="buttonParsing(this, 'x')">-5</button>
    <button class="buttonx" type="button" value="-4" onclick="buttonParsing(this, 'x')">-4</button>
    <button class="buttonx" type="button" value="-3" onclick="buttonParsing(this, 'x')" >-3</button>
    <button class="buttonx" type="button" value="-2" onclick="buttonParsing(this, 'x')">-2</button>
    <button class="buttonx" type="button" value="-1" onclick="buttonParsing(this, 'x')">-1</button>
    <button class="buttonx" type="button" value="0" onclick="buttonParsing(this, 'x')">0</button>
    <button class="buttonx" type="button" value="1" onclick="buttonParsing(this, 'x')">1</button>
    <button class="buttonx" type="button" value="2" onclick="buttonParsing(this, 'x')">2</button>
    <button class="buttonx" type="button" value="3" onclick="buttonParsing(this, 'x')">3</button>
    <br>
    <input type="hidden" name="x" id="hiddenx">
    Введите Y:
    <input id="posy" type="text"  placeholder="-5..3" name="y" >
    <br>
    Выберите R:
    <button class="buttonr" type="button"  value="1" onclick="buttonParsing(this, 'r')">1</button>
    <button class="buttonr" type="button"  value="2" onclick="buttonParsing(this, 'r')">2</button>
    <button class="buttonr" type="button" value="3" onclick="buttonParsing(this, 'r')">3</button>
    <button class="buttonr" type="button"  value="4" onclick="buttonParsing(this, 'r')">4</button>
    <button class="buttonr" type="button"  value="5" onclick="buttonParsing(this, 'r')">5</button>
    <br>
    <input type="hidden" name="r" id="hiddenr">
    <input type="submit" id="submit">
    <input type="button" value="click me" onclick="alert(document.getElementById('hiddenx').value + document.getElementById('hiddenr').value)">
  </form>
  <br>
  <span id="error"></span>
</div>
<div align="center" class="block" id="div-result" style="display: none">
  <iframe id="result" name="result" scrolling="no" frameborder="no" ></iframe>
</div>
<div class="footer block">
  2019 г.
</div>
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script>
  document.querySelector("form").onsubmit=validate;
  var tmr;
 /* document.querySelector("input[type=text]").onkeyup = function() {
    clearTimeout(tmr);
    tmr = setTimeout(check,1000);
  }; */
  var plot_canvas = document.getElementById("zoneCanvas");
  var plot_context = plot_canvas.getContext("2d");
  redraw();
  function redraw() {
    var R = 3

    plot_context.clearRect(0, 0, plot_canvas.width, plot_canvas.height);
      plot_context.strokeStyle = "#000000";
      plot_context.fillStyle = "#000000";


      plot_context.beginPath();
      plot_context.arc(180, 180, R * 300 / 10,  Math.PI, Math.PI * 1.5);
      plot_context.lineTo(180, 180);
      plot_context.closePath();

      plot_context.rect(180 - R * 150 / 5, 180, R * 150 / 5, R * 150 / 5);
      plot_context.fillStyle = 'blue';
      plot_context.fill();

      plot_context.beginPath();
      plot_context.moveTo(180, 180);
      plot_context.lineTo(180, 180 - R * 75 / 5);
      plot_context.lineTo(180 + R * 75 / 5, 180);
      plot_context.lineTo(180, 180);
      plot_context.closePath();
      plot_context.fillStyle = 'blue';
      plot_context.fill();

    plot_context.beginPath();
    //Ox
    plot_context.fillStyle = 'black';
    plot_context.moveTo(0, 180);
    plot_context.lineTo(360, 180); //360, 180
    plot_context.lineTo(350, 170); //290, 140
    plot_context.moveTo(360, 180); //360, 180
    plot_context.lineTo(350, 190); //290, 160
    plot_context.moveTo(360, 180); //360, 180
    //0x markers

    plot_context.moveTo(330, 176); //
    plot_context.lineTo(330, 184); //+5
    plot_context.moveTo(300, 176); //
    plot_context.lineTo(300, 184); //+4
    plot_context.moveTo(270, 176); //
    plot_context.lineTo(270, 184); //+3
    plot_context.moveTo(240, 176); //
    plot_context.lineTo(240, 184); //+2
    plot_context.moveTo(210, 176); //
    plot_context.lineTo(210, 184); //+1
    plot_context.moveTo(150, 176); //
    plot_context.lineTo(150, 184); //-1
    plot_context.moveTo(120, 176); //
    plot_context.lineTo(120, 184); //-2
    plot_context.moveTo(90, 176); //
    plot_context.lineTo(90, 184); //-3
    plot_context.moveTo(60, 176); //
    plot_context.lineTo(60, 184); //-4
    plot_context.moveTo(30, 176); //
    plot_context.lineTo(30, 184); //-5

    //Oy
    plot_context.moveTo(180, 0);
    plot_context.lineTo(170, 10);
    plot_context.moveTo(180, 0);
    plot_context.lineTo(190, 10);
    plot_context.moveTo(180, 0);
    plot_context.lineTo(180, 360);
    plot_context.moveTo(30, 180);

    //0y markers

    plot_context.moveTo(176, 330); //
    plot_context.lineTo(184, 330); //+5
    plot_context.moveTo(176, 300); //
    plot_context.lineTo(184, 300); //+4
    plot_context.moveTo(176, 270); //
    plot_context.lineTo(184, 270); //+3
    plot_context.moveTo(176, 240); //
    plot_context.lineTo(184, 240); //+2
    plot_context.moveTo(176, 210); //
    plot_context.lineTo(184, 210); //+1
    plot_context.moveTo(176, 150); //
    plot_context.lineTo(184, 150); //-1
    plot_context.moveTo(176, 120); //
    plot_context.lineTo(184, 120); //-2
    plot_context.moveTo(176, 90); //
    plot_context.lineTo(184, 90); //-3
    plot_context.moveTo(176, 60); //
    plot_context.lineTo(184, 60); //-4
    plot_context.moveTo(176, 30); //
    plot_context.lineTo(184, 30); //-5

    plot_context.closePath();
    plot_context.stroke();
    plot_context.fillStyle = "#000000";
    plot_context.textAlign ="center";
    plot_context.font = "18px Arial";

    plot_context.fillText("x", 345, 165);
    plot_context.fillText("y", 190, 15);
    plot_context.font = "10px Arial";
    plot_context.fillText("0", 170, 195);
    //x
    plot_context.fillText("-5", 30, 195);
    plot_context.fillText("-4", 60, 195);
    plot_context.fillText("-3", 90, 195);
    plot_context.fillText("-2", 120, 195);
    plot_context.fillText("-1", 150, 195);
    plot_context.fillText("1", 210, 195);
    plot_context.fillText("2", 240, 195);
    plot_context.fillText("3", 270, 195);
    plot_context.fillText("4", 300, 195);
    plot_context.fillText("5", 330, 195);
    //y
    plot_context.fillText("5", 170, 35);
    plot_context.fillText("4", 170, 65);
    plot_context.fillText("3", 170, 95);
    plot_context.fillText("2", 170, 125);
    plot_context.fillText("1", 170, 155);
    plot_context.fillText("-1", 170, 215);
    plot_context.fillText("-2", 170, 245);
    plot_context.fillText("-3", 170, 275);
    plot_context.fillText("-4", 170, 305);
    plot_context.fillText("-5", 170, 335);
  }
</script>
</body>
</html>
