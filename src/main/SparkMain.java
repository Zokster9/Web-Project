package main;

import com.google.gson.Gson;
import controllers.ChatController;
import controllers.FeedController;
import controllers.LoginController;
import controllers.ProfileController;
import dao.UserDao;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import utils.Filters;
import utils.Path;
import ws.MessageHandler;

import java.io.File;
import java.io.IOException;
import java.security.Key;

import static spark.Spark.*;

public class SparkMain {

    public static UserDao userDao;
    public static Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    public static Gson g = new Gson();

    public static void main(String[] args) throws IOException {
        userDao = new UserDao();

        port(8088);

        webSocket("/ws", MessageHandler.class);

        staticFiles.externalLocation(new File("./static").getCanonicalPath());

        before("*", Filters.addTrailingSlashes);

        post(Path.Web.LOGIN, LoginController.loginUser);
        post(Path.Web.SIGN_UP, LoginController.signUpUser);
        get(Path.Web.FEED, FeedController.getFeed);
        get(Path.Web.PROFILE_COMMON_FRIENDS, ProfileController.getMutualFriends);
        get(Path.Web.PROFILE_STATUSES, ProfileController.getProfileStatuses);
        get(Path.Web.PROFILE_GALLERY, ProfileController.getProfileGallery);
        post(Path.Web.ADD_FRIEND, ProfileController.addFriend);
        delete(Path.Web.UNFRIEND, ProfileController.unfriend);
        post(Path.Web.ADD_PHOTO, ProfileController.addPhoto);
        delete(Path.Web.DELETE_PHOTO, ProfileController.deletePhoto);
        post(Path.Web.ADD_STATUS, ProfileController.addStatus);
        delete(Path.Web.DELETE_STATUS, ProfileController.deleteStatus);
        post(Path.Web.ADD_MESSAGE, ChatController.addMessage);
        get(Path.Web.GET_USER, ProfileController.getUser);
        get(Path.Web.GET_PROFILE_PICTURE, ProfileController.getProfilePicture);
    }
}
