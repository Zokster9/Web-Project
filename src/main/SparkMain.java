package main;

import controllers.LoginController;
import dao.UserDao;
import utils.Filters;
import utils.Path;

import static spark.Spark.*;

public class SparkMain {

    public static UserDao userDao;

    public static void main(String[] args) {
        userDao = new UserDao();

        port(8088);

        staticFiles.externalLocation(new File("./static").getCanonicalPath());

        before("*", Filters.addTrailingSlashes);

        post(Path.Web.LOGIN, LoginController.loginUser);
        post(Path.Web.SIGN_UP, LoginController.signUpUser);
    }
}
