package main;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
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
    public static Gson g = new GsonBuilder()
                                .serializeNulls()
                                .create();

    public static void main(String[] args) throws IOException {
        userDao = new UserDao();

        port(8088);

        webSocket("/ws", MessageHandler.class);

        staticFiles.externalLocation(new File("./static").getCanonicalPath());

        before("*", Filters.addTrailingSlashes);

        post(Path.Web.LOGIN, LoginController.loginUser);
        post(Path.Web.SIGN_UP, LoginController.signUpUser);
        get(Path.Web.FEED, FeedController.getFeed);
        get(Path.Web.PROFILE_MUTUAL_FRIENDS, ProfileController.getMutualFriends);
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
        get(Path.Web.SEARCH, ProfileController.searchUsers);
        put(Path.Web.BLOCK_UNBLOCK, ProfileController.blockUnblockUser);
        get(Path.Web.GET_CHATS, ChatController.getChats);
        get(Path.Web.MESSAGES, ChatController.getMessages);
        get(Path.Web.PROFILE_FRIENDS, ProfileController.getFriends);
        get(Path.Web.GET_POST, FeedController.getPost);
        get(Path.Web.GET_COMMENTS, FeedController.getComments);
        put(Path.Web.PRIVATE_PUBLIC, ProfileController.privatePublicProfile);
        put(Path.Web.EDIT_PROFILE, ProfileController.editProfile);
        put(Path.Web.CHANGE_PROFILE_PICTURE, ProfileController.changeProfilePicture);
        get(Path.Web.GET_FRIEND_REQUESTS, ProfileController.getFriendRequests);
        put(Path.Web.ACCEPT_REQUEST, ProfileController.acceptFriendRequest);
        put(Path.Web.DECLINE_REQUEST, ProfileController.declineFriendRequest);
        get(Path.Web.HAS_SENT_FRIEND_REQUEST, ProfileController.hasSentFriendRequest);
        delete(Path.Web.DELETE_POST, ProfileController.deletePost);
    }
}
