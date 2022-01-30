package dao;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import javaxt.utils.Array;
import model.*;
import utils.Path;
import utils.SortStatusByDate;

import java.io.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.ZoneId;
import java.util.*;

import java.time.LocalDate;

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

        gson = new GsonBuilder()
                .setPrettyPrinting()
                .serializeNulls()
                .create();

        loadData();
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

    public void addFriendRequest(User sender, User receiver) {
        FriendRequest friendRequest = new FriendRequest(LocalDate.now(), sender.getUsername(), receiver.getUsername());
        sender.getFriendRequestsSent().add(friendRequest);
        receiver.getFriendRequests().add(friendRequest);
    }

    public List<User> getCommonFriends(User user1, User user2) {
        List<String> commonFriendsUsernames = new ArrayList<>(user1.getFriends());
        commonFriendsUsernames.retainAll(user2.getFriends());
        List<User> commonFriends = new ArrayList<>();
        for (String username : commonFriendsUsernames) {
            commonFriends.add(users.get(username));
        }
        return commonFriends;
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
    }

    public User getUser(String username) {
        return users.getOrDefault(username, null);
    }

    public boolean isUserValid(User user) {
        if (users.containsKey(user.getUsername())) {
            return users.get(user.getUsername()).getPassword().equals(user.getPassword());
        }
        return false;
    }

    public List<Status> getUserStatuses(User profileUser) {
        return profileUser.getStatuses();
    }

    public List<Photo> getUserGallery(User profileUser) {
        return profileUser.getPhotos();
    }

    public void removeFriend(User user, User exFriend) {
        user.getFriends().remove(exFriend.getUsername());
        exFriend.getFriends().remove(user.getUsername());
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
            messages = Arrays.asList(messagesArray);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            System.out.println("File " + Path.DataFilePaths.MESSAGES + " doesn't exist!");
        }
    }

    private void loadComments() {
        try {
            BufferedReader buffer = new BufferedReader(new FileReader(Path.DataFilePaths.COMMENTS));
            Comment[] commentsArray = new Gson().fromJson(buffer, Comment[].class);
            comments = Arrays.asList(commentsArray);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            System.out.println("File " + Path.DataFilePaths.COMMENTS + " doesn't exist!");
        }
    }

    private void loadFriendRequest() {
        try {
            BufferedReader buffer = new BufferedReader(new FileReader(Path.DataFilePaths.FRIEND_REQUESTS));
            FriendRequest[] friendRequestsArray = new Gson().fromJson(buffer, FriendRequest[].class);
            friendRequests = Arrays.asList(friendRequestsArray);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            System.out.println("File " + Path.DataFilePaths.FRIEND_REQUESTS + " doesn't exist!");
        }
    }

    public void addPhoto(Photo p) {
        p.setId(getPostIDCounter());
        User u = p.getPoster();
        u.getPhotos().add(p);
        photos.put(p.getId(), p);
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
    }

    public void addStatus(Status s){
        s.setId(getPostIDCounter());
        User u = s.getPoster();
        u.getStatuses().add(s);
        statuses.put(s.getId(), s);
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
    }

    //TODO Check what is returned in queryparams
    public ArrayList<User> searchUsers(Map<String, String[]> queryParams) throws ParseException {
        HashMap<String, User> cloned = (HashMap<String, User>) users.clone();
        ArrayList<User> clonedUsers = (ArrayList<User>) cloned.values();
        String[] name = queryParams.getOrDefault("name", null);
        if (name != null){
            clonedUsers.removeIf(x -> (!(x.getName().toLowerCase().contains(name[0].toLowerCase()))));
        }
        String[] lastName = queryParams.getOrDefault("lastName", null);
        if (lastName != null){
            clonedUsers.removeIf(x -> (!(x.getSurname().toLowerCase().contains(lastName[0].toLowerCase()))));
        }
        String[] email = queryParams.getOrDefault("email", null);
        if (email != null){
            clonedUsers.removeIf(x -> (!(x.getEmail().toLowerCase().contains(email[0].toLowerCase()))));
        }
        String[] dateOfBirth = queryParams.getOrDefault("dateOfBirth", null);
        if (dateOfBirth != null) {
            //TODO Check how we will store dates in string, to make sure this is valid
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
            Date dateMin = formatter.parse(dateOfBirth[0]);
            LocalDate localDateMin = dateMin.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            Date dateMax = formatter.parse(dateOfBirth[1]);
            LocalDate localDateMax = dateMax.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            clonedUsers.removeIf(x -> (!(x.getDateOfBirth() != null
                                    && x.getDateOfBirth().isAfter(localDateMin.minusDays(1))
                                    && x.getDateOfBirth().isBefore(localDateMax.plusDays(1)))));
        }
        return clonedUsers;
    }

}
