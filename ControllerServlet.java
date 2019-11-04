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
        boolean ajaxreq = req.getParameter("ajaxY") != null;
        boolean forAreaCheck = req.getParameter("x")!=null&&
                req.getParameter("y")!=null&&
                req.getParameter("r")!=null;
        if (ajaxreq){
            req.getRequestDispatcher("/check").forward(req, resp);
        }
        if(forAreaCheck){
            req.getRequestDispatcher("/check").forward(req, resp);
        }else {

            req.getRequestDispatcher("index.jsp").forward(req, resp);
        }

    }
}