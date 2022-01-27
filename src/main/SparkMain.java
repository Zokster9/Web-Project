package main;

import com.google.gson.Gson;
import controllers.FeedController;
import controllers.LoginController;
import controllers.ProfileController;
import dao.UserDao;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import utils.Filters;
import utils.Path;

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

        staticFiles.externalLocation(new File("./static").getCanonicalPath());

        before("*", Filters.addTrailingSlashes);

        post(Path.Web.LOGIN, LoginController.loginUser);
        post(Path.Web.SIGN_UP, LoginController.signUpUser);
        get(Path.Web.FEED, FeedController.getFeed);
        get(Path.Web.PROFILE_COMMON_FRIENDS, ProfileController.getCommonFriends);
        get(Path.Web.PROFILE_STATUSES, ProfileController.getProfileStatuses);
        get(Path.Web.PROFILE_GALLERY, ProfileController.getProfileGallery);
        post(Path.Web.ADD_FRIEND, ProfileController.addFriend);
        delete(Path.Web.UNFRIEND, ProfileController.unfriend);
    }
}
