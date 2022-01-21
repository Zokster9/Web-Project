package model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class User {
    private String username;
    private String password;
    private String email;
    private String name;
    private String surname;
    private LocalDate dateOfBirth;
    private UserType role;
    private Gender gender;
    private boolean isPrivate;
    private boolean isBlocked;
    private boolean isDeleted;
    private List<User> friends;
    private List<Message> messages;
    private List<FriendRequest> friendRequests;
    private List<FriendRequest> friendRequestsSent;
    private List<Post> posts;
    private List<Photo> photos;
    private Photo profilePicture;

    public User() {
        role = UserType.User;
        isPrivate = false;
        isBlocked = false;
        isDeleted = false;
        friends = new ArrayList<>();
        messages = new ArrayList<>();
        friendRequests = new ArrayList<>();
        friendRequestsSent = new ArrayList<>();
        posts = new ArrayList<>();
        photos = new ArrayList<>();
    }

    public User(String username, String password, String email, String name, String surname, Gender gender) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.gender = gender;
        role = UserType.User;
        isPrivate = false;
        isBlocked = false;
        isDeleted = false;
        friends = new ArrayList<>();
        messages = new ArrayList<>();
        friendRequests = new ArrayList<>();
        friendRequestsSent = new ArrayList<>();
        posts = new ArrayList<>();
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

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
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

    public List<User> getFriends() {
        return friends;
    }

    public void setFriends(List<User> friends) {
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

    public List<Post> getPosts() {
        return posts;
    }

    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }

    public List<Photo> getPhotos() {
        return photos;
    }

    public void setPhotos(List<Photo> photos) {
        this.photos = photos;
    }

    public Photo getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(Photo profilePicture) {
        this.profilePicture = profilePicture;
    }
}
