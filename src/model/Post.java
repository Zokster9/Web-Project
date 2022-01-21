package model;

import java.util.ArrayList;
import java.util.List;

public class Post {
    private String picture;
    private String text;
    private boolean isDeleted;
    private User user;
    private List<Comment> comments;

    public Post() {
        isDeleted = false;
        comments = new ArrayList<>();
    }

    public Post(String picture, String text, User user) {
        this.picture = picture;
        this.text = text;
        this.user = user;
        isDeleted = false;
        comments = new ArrayList<>();
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }
}
