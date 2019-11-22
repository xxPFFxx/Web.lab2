import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@WebServlet("/check")
public class AreaCheckServlet extends HttpServlet {
    public void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html; charset=UTF-8");
        req.setCharacterEncoding("UTF-8");
        ServletContext context = getServletContext();
        PrintWriter out = resp.getWriter();
        RequestParser parser = new RequestParser(req);
        ArrayList<Points> points = (ArrayList<Points>) context.getAttribute("points");
        if(points == null) points = new ArrayList<Points>();
        double x,y,r;
        double buttonr;
        Double setR = (Double)context.getAttribute("buttonr");
        if (setR == null) setR = 1.0;
        String result;
        String answer = null;
        if (req.getParameter("getr")!=null){
            out.println(setR);
        }
        else if (req.getParameter("buttonr")!=null){
            buttonr = Double.parseDouble(req.getParameter("buttonr"));
            context.setAttribute("buttonr", buttonr);
        }
        else if (req.getParameter("getPoints")!=null){
            for (Points point: points){
                answer += point.x.toString() + " " + point.y.toString() + ";";
            }
            out.println(answer);
        }
        else {
            x = parser.getX();
            y = parser.getY();
            r = parser.getR();
            if (inside(x, y, r)) result = "Попал";
            else if (x < -5 || x > 3 || y < -5 || y > 3) result = "Не в ОДЗ";
            else result = "Не попал";
            if (result == "Попал") {
                Points point = new Points(x, y, r, true);
                points.add(point);
            } else {
                Points point = new Points(x, y, r, false);
                points.add(point);
            }
            context.setAttribute("points", points);
            out.println("<tr><td>" + x + "</td><td>" + y + "</td><td>" + r + "</td><td>" + result +  "n</td></tr><br>");
        }
        }


    public static boolean inside(double x, double y, double r){
        return x<=0 && y>=0 && x*x+y*y<=r*r  ||
                x>=0 && y>=0 && y <= r/2-x ||
                x<=0 && y<=0 && y>=-r && x >= -r;
    }
}
class Points{
    Double x;
    Double y;
    Double r;
    Boolean result;
    Points(Double x, Double y, Double r, Boolean res){
        this.x = x;
        this.y = y;
        this.r = r;
        this.result = res;
    }
}
class RequestParser{
    private HttpServletRequest request;
    private final boolean FROM_FORM;

    public RequestParser(HttpServletRequest request) {
        this.request = request;
        FROM_FORM = request.getParameter("submit_btn")!=null;
    }

    public double getX() throws NumberFormatException{
        double doubleX =  Double.parseDouble(request.getParameter("x"));
        if(doubleX >= -6.0 &&doubleX <= 6.0)
            return doubleX;
        throw new NumberFormatException();
    }


    public double getR() throws NumberFormatException{
        double doubleR = Double.parseDouble(request.getParameter("r"));
        if(doubleR >= 1.0 && doubleR <= 5.0)
            return doubleR;
        throw new NumberFormatException();
    }


    public double getY() throws NumberFormatException{
        double doubleY = Double.parseDouble(request.getParameter("y"));
        if (doubleY >= -6.0 && doubleY <= 6.0)
            return doubleY;

        throw new NumberFormatException();
    }
    public double getXgraph() throws NumberFormatException {
        double doubleX = Double.parseDouble(request.getParameter("x"));
        if(doubleX >= -6.0 &&doubleX <= 6.0)
            return doubleX;
        throw new NumberFormatException();
    }

    public double getYgraph() throws NumberFormatException {
        double doubleY = Double.parseDouble(request.getParameter("y"));
        if(doubleY >= -6.0 &&doubleY <= 6.0)
            return doubleY;
        throw new NumberFormatException();
    }

    public boolean isFROM_FORM() {
        return FROM_FORM;
    }
    public static boolean validX(double x){
        return x <= 3.0 && x>= -5.0;
    }

    public static boolean validY(double y){
        return y <= 3.0 && y>= -5.0;
    }

    public static boolean validR(double r){
        return r <= 5.0 && r >= 1.0;
    }
}

