package controllers;

import com.google.gson.Gson;
import model.User;
import spark.Request;
import spark.Response;
import spark.Route;

import static main.SparkMain.userDao;

public class LoginController {
    private static Gson g = new Gson();

    public static Route loginUser = (Request request, Response response) -> {
        response.type("application/json");
        String payload = request.body();
        User user = g.fromJson(payload, User.class);
        if (userDao.getUser(user) != null) {
            return g.toJson(userDao.getUser(user));
        }
        response.status(401);
        return response;
    };

    public static Route signUpUser = (Request request, Response response) -> {
        response.type("application/json");
        String payload = request.body();
        User user = g.fromJson(payload, User.class);
        userDao.addUser(user);
        return g.toJson(user);
    };
}
