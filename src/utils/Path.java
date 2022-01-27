package utils;

public class Path {

    public static class Web {
        public static final String LOGIN = "/login/";
        public static final String SIGN_UP = "/signup/";
        public static final String FEED = "/feed/";
        public static final String SEARCH = "/search/";
        public static final String PROFILE = "/profile/";
        public static final String MESSAGES = "/messages/";
    }

    public static class DataFilePaths{
        public static final String USERS = "data/users.json";
        public static final String STATUSES = "data/statuses.json";
        public static final String PHOTOS = "data/photos.json";
        public static final String MESSAGES = "data/messages.json";
        public static final String COMMENTS = "data/comments.json";
        public static final String FRIEND_REQUESTS = "data/friend_requests.json";
    }
}
