package utils;

public class Path {

    public static class Web {
        public static final String LOGIN = "/login/";
        public static final String SIGN_UP = "/signup/";
        public static final String FEED = "/feed/";
        public static final String SEARCH = "/search/";
        public static final String PROFILE_STATUSES = "/profile/:username/statuses";
        public static final String PROFILE_GALLERY = "/profile/:username/gallery";
        public static final String ADD_FRIEND = "/add-friend/";
        public static final String UNFRIEND = "/unfriend/";
        public static final String PROFILE_COMMON_FRIENDS = "/profile/:username/common-friends/";
        public static final String MESSAGES = "/messages/";
        public static final String ADD_PHOTO = "/add-photo/";
        public static final String DELETE_PHOTO = "/delete-photo/";
        public static final String ADD_STATUS = "/add-status/";
        public static final String DELETE_STATUS = "/delete-status/";
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
