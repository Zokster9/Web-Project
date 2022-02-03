package controllers;

import model.Comment;
import model.Status;
import model.User;
import spark.Request;
import spark.Response;
import spark.Route;

import java.util.ArrayList;
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

    public static Route getPost = (Request request, Response response) -> {
        response.type("application/json");
        String postID = request.params("id");
        String username = getUsernameFromToken(request);
        User user = userDao.getUser(username);
        String post =  userDao.getPost(user, Long.parseLong(postID));
        if (post == null){
            response.status(403);
            return g.toJson(request.body());
        } else {
            return post;
        }
    };

    public static Route getComments = (Request request, Response response) -> {
        response.type("application/json");
        String postID = request.params("id");
        ArrayList<Comment> comments = userDao.getComments(Long.parseLong(postID));
        return g.toJson(comments);
    };
}
