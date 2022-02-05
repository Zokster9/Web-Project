package dao;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import model.*;
import utils.Path;
import utils.SortPhotoByDate;
import utils.SortStatusByDate;

import java.io.*;
import java.text.ParseException;
import java.util.*;

public class UserDao {
    private Gson gson;
    private HashMap<String, User> users;
    private HashMap<Long, Status> statuses;
    private HashMap<Long, Photo> photos;
    private List<Message> messages;
    private List<Comment> comments;
    private List<FriendRequest> friendRequests;

    private static Long PostIDCounter;
    private static Long MessageIDCounter;

    public UserDao() {
        users = new HashMap<>();
        statuses = new HashMap<>();
        photos = new HashMap<>();
        messages = new ArrayList<>();
        friendRequests = new ArrayList<>();
        comments = new ArrayList<>();

        gson = new GsonBuilder()
                .setPrettyPrinting()
                .serializeNulls()
                .create();

        loadData();
    }

    public void addNewMessage(User sender, User receiver, Message message) {
        message.setId(getMessageIDCounter());
        sender.getMessages().add(message);
        receiver.getMessages().add(message);
        messages.add(message);
        saveMessages(messages);
    }

    public boolean isUsernameValid(String username) {
        for (String keyUsername : users.keySet()) {
            username = username.toLowerCase();
            keyUsername = keyUsername.toLowerCase();
            if (keyUsername.equals(username)) {
                return false;
            }
        }
        return true;
    }

    public boolean isEmailValid(String email) {
        for (User user : users.values()) {
            if (user.getEmail().equalsIgnoreCase(email)) {
                return false;
            }
        }
        return true;
    }

    public void addFriendRequest(User sender, User receiver) {
        FriendRequest friendRequest = new FriendRequest(new Date().getTime(), sender.getUsername(), receiver.getUsername());
        sender.getFriendRequestsSent().add(friendRequest);
        receiver.getFriendRequests().add(friendRequest);
        friendRequests.add(friendRequest);
        saveFriendRequests(friendRequests);
    }

    public List<User> getMutualFriends(User user1, User user2) {
        List<String> mutualFriendsUsernames = new ArrayList<>(user1.getFriends());
        mutualFriendsUsernames.retainAll(user2.getFriends());
        List<User> mutualFriends = new ArrayList<>();
        mutualFriendsUsernames.forEach(username -> mutualFriends.add(users.get(username)));
        return mutualFriends;
    }

    public List<User> getFriends(User loggedUser) {
        List<String> friendsUsernames = new ArrayList<>(loggedUser.getFriends());
        List<User> friends = new ArrayList<>();
        friendsUsernames.forEach(username -> friends.add(users.get(username)));
        return friends;
    }

    public List<Status> getFriendsStatuses(User user) {
        List<Status> statuses = new ArrayList<>(user.getStatuses());
        for (String friend : user.getFriends()) {
            statuses.addAll(users.get(friend).getStatuses());
        }
        statuses.sort(new SortStatusByDate());
        return statuses;
    }

    public void addUser(User user) {
        users.put(user.getUsername(), user);
        saveUsers(new ArrayList<>(users.values()));
    }

    public User getUser(String username) {
        return users.getOrDefault(username, null);
    }

    public boolean isUserValid(User user) {
        if (users.containsKey(user.getUsername())) {
            if (!users.get(user.getUsername()).isBlocked())
                return users.get(user.getUsername()).getPassword().equals(user.getPassword());
        }
        return false;
    }

    public List<Status> getUserStatuses(User profileUser) {
        List<Status> userStatuses = new ArrayList<>(profileUser.getStatuses());
        userStatuses.removeIf(Status::isDeleted);
        userStatuses.sort(new SortStatusByDate());
        return userStatuses;
    }

    public List<Photo> getUserGallery(User profileUser) {
        List<Photo> userPhotos = new ArrayList<>(profileUser.getPhotos());
        userPhotos.removeIf(Photo::isDeleted);
        userPhotos.sort(new SortPhotoByDate());
        return userPhotos;
    }

    public void removeFriend(User user, User exFriend) {
        user.getFriends().remove(exFriend.getUsername());
        exFriend.getFriends().remove(user.getUsername());
        saveUsers(new ArrayList<>(users.values()));
    }

    public void addPhoto(Photo p) {
        p.setId(getPostIDCounter());
        User u = p.getPoster();
        u.getPhotos().add(p);
        photos.put(p.getId(), p);
        savePhotos(new ArrayList<>(photos.values()));
    }

    public boolean photoExists(Photo p) {
        return photos.getOrDefault(p.getId(), null) != null;
    }

    public boolean isPhotoFromUser(Photo p, User user) {
        Photo photoToDelete = photos.get(p.getId());
        return user.getRole() == UserType.Administrator || photoToDelete.getUsername().equals(user.getUsername());
    }

    public void deletePhoto(Photo photoToDelete) {
        photos.get(photoToDelete.getId()).setDeleted(true);
        savePhotos(new ArrayList<>(photos.values()));
    }

    public void addStatus(Status s){
        s.setId(getPostIDCounter());
        User u = s.getPoster();
        u.getStatuses().add(s);
        statuses.put(s.getId(), s);
        saveStatuses(new ArrayList<>(statuses.values()));
    }

    public boolean statusExists(Status s) {
        return statuses.getOrDefault(s.getId(), null) != null;
    }

    public boolean isStatusFromUser(Status s, User user) {
        Status statusToDelete = statuses.get(s.getId());
        return user.getRole() == UserType.Administrator || statusToDelete.getUsername().equals(user.getUsername());
    }

    public void deleteStatus(Status statusToDelete) {
        statuses.get(statusToDelete.getId()).setDeleted(true);
        saveStatuses(new ArrayList<>(statuses.values()));
    }

    public ArrayList<User> searchUsers(Map<String, String[]> queryParams, String tokenUsername) throws ParseException {
        ArrayList<User> clonedUsers = new ArrayList<>(users.values());
        clonedUsers.removeIf(x ->(x.getRole() == UserType.Administrator));
        String[] username = queryParams.getOrDefault("username", null);
        if (username != null){
            if (!username[0].isEmpty())
                if (tokenUsername != null) {
                    clonedUsers.removeIf(x -> (x.getName().equalsIgnoreCase(tokenUsername)));
                }
                clonedUsers.removeIf(x -> (x.getName().equalsIgnoreCase(username[0])));
        }
        String[] name = queryParams.getOrDefault("name", null);
        if (name != null){
            if (!name[0].isEmpty())
                clonedUsers.removeIf(x -> (!(x.getName().toLowerCase().contains(name[0].toLowerCase()))));
        }
        String[] lastName = queryParams.getOrDefault("surname", null);
        if (lastName != null){
            if (!lastName[0].isEmpty())
                clonedUsers.removeIf(x -> (!(x.getSurname().toLowerCase().contains(lastName[0].toLowerCase()))));
        }
        String[] email = queryParams.getOrDefault("email", null);
        if (email != null){
            if (!email[0].isEmpty())
                clonedUsers.removeIf(x -> (!(x.getEmail().toLowerCase().contains(email[0].toLowerCase()))));
        }
        String[] dateRange = queryParams.getOrDefault("dateRange", null);
        if (dateRange != null) {
            String dates = dateRange[0].substring(1, dateRange[0].length()-1);
            Long dateMin = Long.parseLong(dates.split(",")[0]);
            Long dateMax = Long.parseLong(dates.split(",")[1]);
            clonedUsers.removeIf(x -> (!(x.getDateOfBirth() != null
                    && x.getDateOfBirth() >= dateMin
                    && x.getDateOfBirth() <= dateMax)));
        }
        return clonedUsers;
    }

    public void changeBlockStatus(String username) {
        User user = users.get(username);
        user.setBlocked(!user.isBlocked());
        saveUsers(new ArrayList<>(users.values()));
    }

    public ArrayList<User> getChats(String username) {
        ArrayList<User> chats = new ArrayList<>();
        User user = users.get(username);
        for (Message m : user.getMessages()) {
            if (m.getSender().equals(username)){
                if (!chats.contains(m.getUserReceiver())){
                    chats.add(m.getUserReceiver());
                }
            }
            else {
                if (!chats.contains(m.getUserSender())){
                    chats.add(m.getUserSender());
                }
            }
        }
        return chats;
    }

    public ArrayList<Message> getMessages(HashMap<String, String> queryParams) {
        String username = queryParams.get("username");
        String receiver = queryParams.get("receiver");
        ArrayList<Message> messages = new ArrayList<>();
        for (Message m : users.get(username).getMessages()) {
            if (m.getSender().equals(receiver) || m.getReceiver().equals(receiver)){
                messages.add(m);
            }
        }
        return messages;
    }

    public String getPost(User user, Long ID) {

        if (statuses.getOrDefault(ID, null) != null)
            return  !statuses.get(ID).isDeleted() &&
                    (user.getRole() == UserType.Administrator ||
                            statuses.get(ID).getPoster() == user ||
                            !statuses.get(ID).getPoster().isPrivate() ||
                            (statuses.get(ID).getPoster().isPrivate() &&
                                    statuses.get(ID).getPoster().getFriends().contains(user.getUsername()))) ?
                    gson.toJson(statuses.get(ID)) : null;
        else if (photos.getOrDefault(ID, null) != null)
            return  !photos.get(ID).isDeleted() &&
                    (user.getRole() == UserType.Administrator ||
                            photos.get(ID).getPoster() == user ||
                            !photos.get(ID).getPoster().isPrivate() ||
                            (photos.get(ID).getPoster().isPrivate() &&
                                    photos.get(ID).getPoster().getFriends().contains(user.getUsername()))) ?
                    gson.toJson(photos.get(ID)) : null;
        else
            return null;
    }

    public List<Comment> getComments(Long ID) {
        List<Comment> postComments;
        if (statuses.getOrDefault(ID, null)!= null){
            postComments = new ArrayList<>(statuses.get(ID).getComments());
        } else {
            postComments = new ArrayList<>(photos.get(ID).getComments());
        }
        postComments.removeIf(Comment::isDeleted);
        return postComments;
    }

    public User changePrivateStatus(String username) {
        User user = users.get(username);
        user.setPrivate(!user.isPrivate());
        saveUsers(new ArrayList<>(users.values()));
        return user;
    }

    public User editUser(User edits) {
        User edited = users.get(edits.getUsername());
        if (edits.getName() != null) {
            edited.setName(edits.getName());
        }
        if (edits.getSurname() != null) {
            edited.setSurname(edits.getSurname());
        }
        if (edits.getEmail() != null) {
            for (User u : users.values()) {
                if (u.getEmail().equalsIgnoreCase(edits.getEmail())
                        && !u.getUsername().equals(edits.getUsername())) {
                    return null;
                }
            }
            edited.setEmail(edits.getEmail());
        }
        if (edits.getDateOfBirth() != null) {
            edited.setDateOfBirth(edits.getDateOfBirth());
        }
        if (edits.getPassword() != null) {
            edited.setPassword(edits.getPassword());
        }
        saveUsers(new ArrayList<>(users.values()));
        return edited;
    }

    public void changeProfilePicture(User loggedUser, String picture) {
        loggedUser.setProfilePicture(picture);
        saveUsers(new ArrayList<>(users.values()));
    }

    public List<FriendRequest> getPendingFriendRequests(User loggedUser) {
        List<FriendRequest> pendingFriendRequests = new ArrayList<>();
        loggedUser.getFriendRequests().forEach(friendRequest -> {
            if (friendRequest.getStatus() == FriendRequestStatus.Pending) {
                pendingFriendRequests.add(friendRequest);
            }
        });
        return pendingFriendRequests;
    }

    public void addFriend(User loggedUser, User newFriend) {
        loggedUser.getFriendRequests().forEach(friendRequest -> {
            if (friendRequest.getSender().equals(newFriend.getUsername())) {
                friendRequest.setStatus(FriendRequestStatus.Accepted);
                saveFriendRequests(friendRequests);
            }
        });
        loggedUser.getFriends().add(newFriend.getUsername());
        newFriend.getFriends().add(loggedUser.getUsername());
        saveUsers(new ArrayList<>(users.values()));
    }

    public void declineFriendRequest(User loggedUser, User rejectedUser) {
        loggedUser.getFriendRequests().forEach(friendRequest -> {
            if (friendRequest.getSender().equals(rejectedUser.getUsername())) {
                friendRequest.setStatus(FriendRequestStatus.Rejected);
                saveFriendRequests(friendRequests);
            }
        });
    }

    public boolean hasSentFriendRequest(User loggedUser, User potentialFriend) {
        for (FriendRequest friendRequest : loggedUser.getFriendRequestsSent()) {
            if (friendRequest.getReceiver().equals(potentialFriend.getUsername()) && friendRequest.getStatus() == FriendRequestStatus.Pending) {
                return true;
            }
        }
        return false;
    }

    public Message deletePost(String username, Long ID, String message) {
        User deleter = users.get(username);
        Message m = new Message();
        if (statuses.getOrDefault(ID, null) != null) {
            Status s = statuses.get(ID);
            if (s.isDeleted())
                return null;
            if (deleter.getRole() == UserType.Administrator || s.getPoster() == deleter) {
                s.setDeleted(true);
                for (Comment c : s.getComments()) {
                    c.setDeleted(true);
                }
            }
            if (deleter.getRole() == UserType.Administrator) {
                m = new Message(getMessageIDCounter(), message, new Date().getTime(), deleter.getUsername(), s.getPoster().getUsername());
                m.setUserSender(deleter);
                m.setUserReceiver(s.getPoster());
                deleter.getMessages().add(m);
                s.getPoster().getMessages().add(m);
                messages.add(m);
            }
            saveMessages(messages);
            saveStatuses(new ArrayList<>(statuses.values()));
        } else if (photos.getOrDefault(ID, null) != null) {
            Photo p = photos.get(ID);
            if (p.isDeleted())
                return null;
            if (deleter.getRole() == UserType.Administrator || p.getPoster() == deleter) {
                p.setDeleted(true);
                for (Comment c : p.getComments()) {
                    c.setDeleted(true);
                }
            }
            if (deleter.getRole() == UserType.Administrator) {
                m = new Message(getMessageIDCounter(), message, new Date().getTime(), deleter.getUsername(), p.getPoster().getUsername());
                m.setUserSender(deleter);
                m.setUserReceiver(p.getPoster());
                deleter.getMessages().add(m);
                p.getPoster().getMessages().add(m);
                messages.add(m);
            }
            saveMessages(messages);
            savePhotos(new ArrayList<>(photos.values()));
        } else
            return null;
        return m;
    }

    public void addComment(Comment comment) {
        comments.add(comment);
        saveComments(comments);
        if (statuses.containsKey(comment.getPostID())) {
            statuses.get(comment.getPostID()).getComments().add(comment);
        } else {
            photos.get(comment.getPostID()).getComments().add(comment);
        }
    }

    public Comment getComment(Long postId, String username, Long date) {
        if (statuses.containsKey(postId)) {
            for (Comment comment : statuses.get(postId).getComments()) {
                if (comment.getUsername().equals(username) && comment.getDate().equals(date)) {
                    return comment;
                }
            }
        } else {
            for (Comment comment : photos.get(postId).getComments()) {
                if (comment.getUsername().equals(username) && comment.getDate().equals(date)) {
                    return comment;
                }
            }
        }
        return null;
    }

    public void deleteComment(Comment comment) {
        comment.setDeleted(true);
        saveComments(comments);
    }

    public void setCommentPoster(Comment comment) {
        comment.setUser(users.get(comment.getUsername()));
    }

    public void saveUsers(List<User> data){
        try {
            BufferedWriter bw = new BufferedWriter(new FileWriter(Path.DataFilePaths.USERS));
            bw.write(gson.toJson(data));
            bw.flush();bw.close();
            System.out.println("Saved data to " + Path.DataFilePaths.USERS + " successfully");
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("File " + Path.DataFilePaths.USERS + " doesn't exist!");
        }
    }

    public void saveStatuses(List<Status> data){
        try {
            BufferedWriter bw = new BufferedWriter(new FileWriter(Path.DataFilePaths.STATUSES));
            bw.write(gson.toJson(data));
            bw.flush();bw.close();
            System.out.println("Saved data to " + Path.DataFilePaths.STATUSES + " successfully");
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("File " + Path.DataFilePaths.STATUSES + " doesn't exist!");
        }
    }

    public void savePhotos(List<Photo> data){
        try {
            BufferedWriter bw = new BufferedWriter(new FileWriter(Path.DataFilePaths.PHOTOS));
            bw.write(gson.toJson(data));
            bw.flush();bw.close();
            System.out.println("Saved data to " + Path.DataFilePaths.PHOTOS + " successfully");
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("File " + Path.DataFilePaths.PHOTOS + " doesn't exist!");
        }
    }

    public void saveMessages(List<Message> data){
        try {
            BufferedWriter bw = new BufferedWriter(new FileWriter(Path.DataFilePaths.MESSAGES));
            bw.write(gson.toJson(data));
            bw.flush();bw.close();
            System.out.println("Saved data to " + Path.DataFilePaths.MESSAGES + " successfully");
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("File" + Path.DataFilePaths.MESSAGES + "doesn't exist!");
        }
    }

    public void saveComments(List<Comment> data){
        try {
            BufferedWriter bw = new BufferedWriter(new FileWriter(Path.DataFilePaths.COMMENTS));
            bw.write(gson.toJson(data));
            bw.flush();bw.close();
            System.out.println("Saved data to " + Path.DataFilePaths.COMMENTS + " successfully");
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("File " + Path.DataFilePaths.COMMENTS + " doesn't exist!");
        }
    }

    public void saveFriendRequests(List<FriendRequest> data){
        try {
            BufferedWriter bw = new BufferedWriter(new FileWriter(Path.DataFilePaths.FRIEND_REQUESTS));
            bw.write(gson.toJson(data));
            bw.flush();bw.close();
            System.out.println("Saved data to " + Path.DataFilePaths.FRIEND_REQUESTS + " successfully");
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("File " + Path.DataFilePaths.FRIEND_REQUESTS + " doesn't exist!");
        }
    }

    public static Long getPostIDCounter() {
        return ++PostIDCounter;
    }

    public static Long getMessageIDCounter() {
        return ++MessageIDCounter;
    }

    public void loadData(){
        loadUsers();
        loadStatuses();
        loadPhotos();
        loadMessages();
        loadComments();
        loadFriendRequest();
        connectUsersAndStatuses();
        connectUsersAndPhotos();
        connectUsersAndMessages();
        connectUsersAndFriendRequests();
        connectUsersAndComments();
        connectPostsAndComments();
        //If statuses has max postID assign it to PostIDCounter, else put photos max postID
        PostIDCounter = Collections.max(statuses.keySet()) > Collections.max(photos.keySet()) ?
                        Collections.max(statuses.keySet()) : Collections.max(photos.keySet());
        //Get highest message ID to continue
        MessageIDCounter = -1L; //No messages
        for (Message message : messages) {
            if (message.getId() > MessageIDCounter)
                MessageIDCounter = message.getId();
        }
        System.out.println("[INFO] Loaded and connected all data.");
    }

    private void connectPostsAndComments() {
        for (Comment comment : comments) {
             Status s = statuses.getOrDefault(comment.getPostID(), null);
             if (s != null){
                 s.getComments().add(comment);
             } else {
                 Photo p = photos.get(comment.getPostID());
                 p.getComments().add(comment);
             }
        }
    }

    private void connectUsersAndStatuses() {
        for (Status status: statuses.values()) {
            User u = users.get(status.getUsername());
            u.getStatuses().add(status);
            status.setPoster(u);
        }
    }

    private void connectUsersAndPhotos(){
        for (Photo photo: photos.values()) {
            User u = users.get(photo.getUsername());
            u.getPhotos().add(photo);
            photo.setPoster(u);
        }
    }

    private void connectUsersAndMessages() {
        for (Message message: messages){
            User sender = users.get(message.getSender());
            User receiver = users.get(message.getReceiver());
            sender.getMessages().add(message);
            receiver.getMessages().add(message);
            message.setUserSender(sender);
            message.setUserReceiver(receiver);
        }
    }

    private void connectUsersAndFriendRequests() {
        for (FriendRequest friendRequest : friendRequests) {
            User sender = users.get(friendRequest.getSender());
            User receiver = users.get(friendRequest.getReceiver());
            sender.getFriendRequestsSent().add(friendRequest);
            receiver.getFriendRequests().add(friendRequest);
            friendRequest.setUserSender(sender);
            friendRequest.setUserReceiver(receiver);
        }
    }

    private void connectUsersAndComments(){
        for (Comment comment: comments){
            User u = users.get(comment.getUsername());
            comment.setUser(u);
        }
    }

    private void loadUsers(){
        try {
            BufferedReader buffer = new BufferedReader(new FileReader(Path.DataFilePaths.USERS));
            User[] usersArray = new Gson().fromJson(buffer, User[].class);
            for (User user : usersArray) {
                users.put(user.getUsername(), user);
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            System.out.println("File " + Path.DataFilePaths.USERS + " doesn't exist!");
        }
    }

    private void loadStatuses(){
        try {
            BufferedReader buffer = new BufferedReader(new FileReader(Path.DataFilePaths.STATUSES));
            Status[] statusesArray = new Gson().fromJson(buffer, Status[].class);
            for (Status status: statusesArray){
                statuses.put(status.getId(), status);
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            System.out.println("File " + Path.DataFilePaths.STATUSES + " doesn't exist!");
        }
    }

    private void loadPhotos(){
        try {
            BufferedReader buffer = new BufferedReader(new FileReader(Path.DataFilePaths.PHOTOS));
            Photo[] photosArray = new Gson().fromJson(buffer, Photo[].class);
            for (Photo photo : photosArray) {
                photos.put(photo.getId(), photo);
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            System.out.println("File " + Path.DataFilePaths.PHOTOS + " doesn't exist!");
        }
    }

    private void loadMessages(){
        try {
            BufferedReader buffer = new BufferedReader(new FileReader(Path.DataFilePaths.MESSAGES));
            Message[] messagesArray = new Gson().fromJson(buffer, Message[].class);
            messages = new ArrayList<>(Arrays.asList(messagesArray));
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            System.out.println("File " + Path.DataFilePaths.MESSAGES + " doesn't exist!");
        }
    }

    private void loadComments() {
        try {
            BufferedReader buffer = new BufferedReader(new FileReader(Path.DataFilePaths.COMMENTS));
            Comment[] commentsArray = new Gson().fromJson(buffer, Comment[].class);
            comments = new ArrayList<>(Arrays.asList(commentsArray));
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            System.out.println("File " + Path.DataFilePaths.COMMENTS + " doesn't exist!");
        }
    }

    private void loadFriendRequest() {
        try {
            BufferedReader buffer = new BufferedReader(new FileReader(Path.DataFilePaths.FRIEND_REQUESTS));
            FriendRequest[] friendRequestsArray = new Gson().fromJson(buffer, FriendRequest[].class);
            friendRequests = new ArrayList<>(Arrays.asList(friendRequestsArray));
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            System.out.println("File " + Path.DataFilePaths.FRIEND_REQUESTS + " doesn't exist!");
        }
    }
}
