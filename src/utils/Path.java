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
    }

    public static class DataFilePaths{
        private static String cwd = System.getProperty("user.dir");
        public static final String USERS = cwd + "data/users.json";
        public static final String STATUSES = cwd + "data/statuses.json";
        public static final String PHOTOS = cwd + "data/photos.json";
        public static final String MESSAGES = cwd + "data/messages.json";
        public static final String COMMENTS = cwd + "data/comments.json";
        public static final String FRIEND_REQUESTS = cwd + "data/friend_requests.json";
    }
}
