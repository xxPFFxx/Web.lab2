import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
@WebServlet("/control")
public class ControllerServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        boolean forAreaCheck = req.getParameter("x")!=null&&
                req.getParameter("y")!=null&&
                req.getParameter("r")!=null;
        boolean getPoints = req.getParameter("getPoints")!=null;
        boolean updateR = req.getParameter("buttonr")!=null;
        boolean getR = req.getParameter("getr")!=null;
        if(forAreaCheck || getPoints || updateR || getR){
            req.getRequestDispatcher("/check").forward(req, resp);
        }else {

            req.getRequestDispatcher("index.jsp").forward(req, resp);
        }

    }
}