package utils;

public class Path {

    public static class Web {
        public static final String LOGIN = "/login/";
        public static final String SIGN_UP = "/signup/";
        public static final String FEED = "/feed/";
        public static final String SEARCH = "/search/";
        public static final String PROFILE_STATUSES = "/profile/:username/statuses/";
        public static final String PROFILE_GALLERY = "/profile/:username/gallery/";
        public static final String ADD_FRIEND = "/add-friend/:username/";
        public static final String UNFRIEND = "/unfriend/:username/";
        public static final String PROFILE_MUTUAL_FRIENDS = "/profile/:username/mutual-friends/";
        public static final String PROFILE_FRIENDS = "/profile/friends/";
        public static final String MESSAGES = "/messages/";
        public static final String ADD_PHOTO = "/add-photo/";
        public static final String DELETE_PHOTO = "/delete-photo/";
        public static final String ADD_STATUS = "/add-status/";
        public static final String DELETE_STATUS = "/delete-status/";
        public static final String ADD_MESSAGE = "/add-message/";
        public static final String GET_USER = "/get-user/:username/";
        public static final String GET_PROFILE_PICTURE = "/get-profile-picture/";
        public static final String BLOCK_UNBLOCK = "/block-unblock/:username/";
        public static final String GET_CHATS = "/get-chats/:username/";
        public static final String GET_POST = "/get-post/:id/";
        public static final String GET_COMMENTS = "/get-comments/:id/";
        public static final String PRIVATE_PUBLIC = "/private-public-profile/";
        public static final String EDIT_PROFILE = "/edit-profile/";
        public static final String CHANGE_PROFILE_PICTURE = "/change-profile-picture/";
        public static final String GET_FRIEND_REQUESTS = "/friend-requests/";
        public static final String ACCEPT_REQUEST = "/accept-request/:username/";
        public static final String DECLINE_REQUEST = "/decline-request/:username/";
        public static final String HAS_SENT_FRIEND_REQUEST = "/has-sent-friend-request/:username/";
        public static final String DELETE_POST ="/delete-post/:id/";
        public static final String ADD_COMMENT = "/add-comment/";
        public static final String DELETE_COMMENT = "/delete-comment/";
    }

    public static class DataFilePaths{
        private static String cwd = System.getProperty("user.dir")+"\\data\\";
        public static final String USERS = cwd + "users.json";
        public static final String STATUSES = cwd + "statuses.json";
        public static final String PHOTOS = cwd + "photos.json";
        public static final String MESSAGES = cwd + "messages.json";
        public static final String COMMENTS = cwd + "comments.json";
        public static final String FRIEND_REQUESTS = cwd + "friend_requests.json";
    }
}
