package controllers;

import model.Photo;
import model.Status;
import model.User;
import spark.Request;
import spark.Response;
import spark.Route;

import java.util.List;

import static main.SparkMain.userDao;
import static main.SparkMain.g;
import static utils.JwtUtils.getUsernameFromToken;

public class ProfileController {

    public static Route getCommonFriends = (Request request, Response response) -> {
        String tokenUsername = getUsernameFromToken(request);
        response.type("application/json");
        User loggedUser = userDao.getUser(tokenUsername);
        String pathUsername = request.params("username");
        User profileUser = userDao.getUser(pathUsername);
        List<User> commonFriends = userDao.getCommonFriends(loggedUser, profileUser);
        return g.toJson(commonFriends);
    };

    public static Route getProfileStatuses = (Request request, Response response) -> {
        response.type("application/json");
        String pathUsername = request.params("username");
        User profileUser = userDao.getUser(pathUsername);
        List<Status> statuses = userDao.getUserStatuses(profileUser);
        return g.toJson(statuses);
    };

    public static Route getProfileGallery = (Request request, Response response) -> {
        response.type("application/json");
        String pathUsername = request.params("username");
        User profileUser = userDao.getUser(pathUsername);
        List<Photo> photos = userDao.getUserGallery(profileUser);
        return g.toJson(photos);
    };

    public static Route addFriend = (Request request, Response response) -> {
        response.type("application/json");
        String pathUsername = request.params("username");
        String tokenUsername = getUsernameFromToken(request);
        User loggedUser = userDao.getUser(tokenUsername);
        User friend = userDao.getUser(pathUsername);
        userDao.addFriendRequest(loggedUser, friend);
        return g.toJson(friend);
    };

    public static Route unfriend = (Request request, Response response) -> {
        response.type("application/json");
        String pathUsername = request.params("username");
        String tokenUsername = getUsernameFromToken(request);
        User loggedUser = userDao.getUser(tokenUsername);
        User friend = userDao.getUser(pathUsername);
        userDao.removeFriend(loggedUser, friend);
        return g.toJson(friend);
    };
}
