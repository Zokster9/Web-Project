package controllers;

import model.Status;
import model.User;
import spark.Request;
import spark.Response;
import spark.Route;

import java.util.List;

import static main.SparkMain.g;
import static main.SparkMain.userDao;
import static utils.JwtUtils.getUsernameFromToken;

public class FeedController {

    public static Route getFeed = (Request request, Response response) -> {
        response.type("application/json");
        String username = getUsernameFromToken(request);
        User user = userDao.getUser(username);
        List<Status> statuses = userDao.getFriendsStatuses(user);
        return g.toJson(statuses);
    };
}
