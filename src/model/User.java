package model;

import java.util.Date;
import java.util.ArrayList;
import java.util.List;

public class User {
    private String username;
    private String password;
    private String email;
    private String name;
    private String surname;
    private Long dateOfBirth;
    private UserType role;
    private String profilePicture;
    private Gender gender;
    private boolean isPrivate;
    private boolean isBlocked;
    private boolean isDeleted;
    private List<String> friends;
    private String JWTToken;

    private transient List<Message> messages;
    private transient List<FriendRequest> friendRequests;
    private transient List<FriendRequest> friendRequestsSent;
    private transient List<Status> statuses;
    private transient List<Photo> photos;

    public User() {
        dateOfBirth = new Date().getTime();
        role = UserType.User;
        isPrivate = false;
        isBlocked = false;
        isDeleted = false;
        friends = new ArrayList<>();
        messages = new ArrayList<>();
        friendRequests = new ArrayList<>();
        friendRequestsSent = new ArrayList<>();
        statuses = new ArrayList<>();
        photos = new ArrayList<>();
        profilePicture = "no-profile-page.png";
    }

    public User(String username, String password, String email, String name, String surname, Gender gender) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.gender = gender;
        dateOfBirth = new Date().getTime();
        role = UserType.User;
        isPrivate = false;
        isBlocked = false;
        isDeleted = false;
        profilePicture = "no-profile-page.png";
        friends = new ArrayList<>();
        messages = new ArrayList<>();
        friendRequests = new ArrayList<>();
        friendRequestsSent = new ArrayList<>();
        statuses = new ArrayList<>();
        photos = new ArrayList<>();
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public Long getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Long dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public UserType getRole() {
        return role;
    }

    public void setRole(UserType role) {
        this.role = role;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public boolean isPrivate() {
        return isPrivate;
    }

    public void setPrivate(boolean aPrivate) {
        isPrivate = aPrivate;
    }



    public boolean isBlocked() {
        return isBlocked;
    }

    public void setBlocked(boolean blocked) {
        isBlocked = blocked;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }

    public List<String> getFriends() {
        return friends;
    }

    public void setFriends(List<String> friends) {
        this.friends = friends;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    public List<FriendRequest> getFriendRequests() {
        return friendRequests;
    }

    public void setFriendRequests(List<FriendRequest> friendRequests) {
        this.friendRequests = friendRequests;
    }

    public List<FriendRequest> getFriendRequestsSent() {
        return friendRequestsSent;
    }

    public void setFriendRequestsSent(List<FriendRequest> friendRequestsSent) {
        this.friendRequestsSent = friendRequestsSent;
    }

    public List<Status> getStatuses() {
        return statuses;
    }

    public void setStatuses(List<Status> statuses) {
        this.statuses = statuses;
    }

    public List<Photo> getPhotos() {
        return photos;
    }

    public void setPhotos(List<Photo> photos) {
        this.photos = photos;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public String getJWTToken() {
        return JWTToken;
    }

    public void setJWTToken(String JWTToken) {
        this.JWTToken = JWTToken;
    }
}
