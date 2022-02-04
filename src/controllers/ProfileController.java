package controllers;

import model.*;
import spark.Request;
import spark.Response;
import spark.Route;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static main.SparkMain.userDao;
import static main.SparkMain.g;
import static utils.JwtUtils.getUsernameFromToken;

public class ProfileController {

    public static Route getProfilePicture = (Request request, Response response) -> {
        response.type("application/json");
        String username = getUsernameFromToken(request);
        User user = userDao.getUser(username);
        return g.toJson(user.getProfilePicture());
    };

    public static Route getUser = (Request request, Response response) -> {
        response.type("application/json");
        String pathUsername = request.params("username");
        User user = userDao.getUser(pathUsername);
        return g.toJson(user);
    };

    public static Route getMutualFriends = (Request request, Response response) -> {
        String tokenUsername = getUsernameFromToken(request);
        response.type("application/json");
        User loggedUser = userDao.getUser(tokenUsername);
        String pathUsername = request.params("username");
        User profileUser = userDao.getUser(pathUsername);
        List<User> mutualFriends = userDao.getMutualFriends(loggedUser, profileUser);
        return g.toJson(mutualFriends);
    };

    public static Route getFriends = (Request request, Response response) -> {
        String tokenUsername = getUsernameFromToken(request);
        response.type("application/json");
        User loggedUser = userDao.getUser(tokenUsername);
        List<User> friends = userDao.getFriends(loggedUser);
        return g.toJson(friends);
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

    public static Route searchUsers = (Request request, Response response) -> {
        HashMap<String, String[]> queryParams = new HashMap<>();
        request.queryMap().toMap().forEach(queryParams::put);
        ArrayList<User> result = userDao.searchUsers(queryParams);
        return g.toJson(result);
    };

    public static Route blockUnblockUser = (Request request, Response response) -> {
        response.type("application/json");
        String username = request.params("username");
        userDao.changeBlockStatus(username);
        return g.toJson(request.body());
    };

    public static Route privatePublicProfile = (Request request, Response response) -> {
        response.type("application/json");
        String username = getUsernameFromToken(request);
        User user = userDao.changePrivateStatus(username);
        return g.toJson(user);
    };

    public static Route editProfile = (Request request, Response response) -> {
        response.type("application/json");
        String username = getUsernameFromToken(request);
        User edits = g.fromJson(request.body(), User.class);
        edits.setUsername(username);
        User edited = userDao.editUser(edits);
        if (edited == null) {
            response.status(401);
            return request.body();
        }
        return g.toJson(edited);
    };

    public static Route changeProfilePicture = (Request request, Response response) -> {
        String tokenUsername = getUsernameFromToken(request);
        response.type("application/json");
        String picture = request.queryParams("picture");
        User loggedUser = userDao.getUser(tokenUsername);
        userDao.changeProfilePicture(loggedUser, picture);
        return g.toJson(loggedUser);
    };

    public static Route getFriendRequests = (Request request, Response response) -> {
        String tokenUsername = getUsernameFromToken(request);
        response.type("application/json");
        User loggedUser = userDao.getUser(tokenUsername);
        List<FriendRequest> friendRequests = userDao.getPendingFriendRequests(loggedUser);
        return g.toJson(friendRequests);
    };

    public static Route acceptFriendRequest = (Request request, Response response) -> {
        String tokenUsername = getUsernameFromToken(request);
        response.type("application/json");
        String username = request.params("username");
        User loggedUser = userDao.getUser(tokenUsername);
        User newFriend = userDao.getUser(username);
        userDao.addFriend(loggedUser, newFriend);
        return g.toJson(newFriend);
    };

    public static Route declineFriendRequest = (Request request, Response response) -> {
        String tokenUsername = getUsernameFromToken(request);
        response.type("application/json");
        String username = request.params("username");
        User loggedUser = userDao.getUser(tokenUsername);
        User rejectedUser = userDao.getUser(username);
        userDao.declineFriendRequest(loggedUser, rejectedUser);
        return g.toJson(rejectedUser);
    };

    public static Route hasSentFriendRequest = (Request request, Response response) -> {
        String tokenUsername = getUsernameFromToken(request);
        response.type("application/json");
        String username = request.params("username");
        User loggedUser = userDao.getUser(tokenUsername);
        User potentialFriend = userDao.getUser(username);
        boolean hasSentFriendRequest = userDao.hasSentFriendRequest(loggedUser, potentialFriend);
        return g.toJson(hasSentFriendRequest);
    };

    public static Route deletePost = (Request request, Response response) -> {
        response.type("application/json");
        String username = getUsernameFromToken(request);
        Long ID = Long.parseLong(request.params("id"));
        String message = request.params("message");
        Message m = userDao.deletePost(username, ID, message);
        if (m == null) {
            response.status(401);
            return response;
        }
        return g.toJson(m);
    };
}
