package controllers;

import model.Photo;
import model.Status;
import model.User;
import org.eclipse.jetty.server.handler.gzip.GzipHttpOutputInterceptor;
import spark.Request;
import spark.Response;
import spark.Route;

import java.lang.annotation.Repeatable;
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

    public static Route addPhoto = (Request request, Response response) -> {
        response.type("application/json");
        System.out.println(request.body());
        Photo p = g.fromJson(request.body(), Photo.class);
        String tokenUsername = getUsernameFromToken(request);
        User loggedUser = userDao.getUser(tokenUsername);
        p.setUsername(tokenUsername);
        p.setPoster(loggedUser);
        userDao.addPhoto(p);
        return g.toJson(p);
    };

    public static Route deletePhoto = (Request request, Response response) -> {
        response.type("application/json");
        Photo photoToDelete = g.fromJson(request.body(), Photo.class);
        String tokenUsername = getUsernameFromToken(request);
        User loggedUser = userDao.getUser(tokenUsername);

        if (loggedUser == null){
            response.status(401);
        } else if (!userDao.photoExists(photoToDelete)){
            response.status(400);
        } else {
            if (userDao.isPhotoFromUser(photoToDelete, loggedUser)){
                userDao.deletePhoto(photoToDelete);
            } else {
                response.status(401);
            }
        }
        return g.toJson(photoToDelete);
    };

    public static Route addStatus = (Request request, Response response) -> {
        response.type("application/json");
        System.out.println(request.body());
        Status s = g.fromJson(request.body(), Status.class);
        String tokenUsername = getUsernameFromToken(request);
        User loggedUser = userDao.getUser(tokenUsername);
        s.setUsername(tokenUsername);
        s.setPoster(loggedUser);
        userDao.addStatus(s);
        return g.toJson(s);
    };

    public static Route deleteStatus = (Request request, Response response) -> {
        response.type("application/json");
        Status statusToDelete = g.fromJson(request.body(), Status.class);
        String tokenUsername = getUsernameFromToken(request);
        User loggedUser = userDao.getUser(tokenUsername);

        if (loggedUser == null){
            response.status(401);
        } else if (!userDao.statusExists(statusToDelete)){
            response.status(400);
        } else {
            if (userDao.isStatusFromUser(statusToDelete, loggedUser)){
                userDao.deleteStatus(statusToDelete);
            } else {
                response.status(401);
            }
        }
        return g.toJson(statusToDelete);
    };
}
