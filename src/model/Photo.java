package model;

import java.util.ArrayList;
import java.util.List;

public class Photo {
    private String picture;
    private boolean isDeleted;
    private User user;
    private List<Comment> comments;

    public Photo() {
        isDeleted = false;
        comments = new ArrayList<>();
    }

    public Photo(String picture, User user) {
        this.picture = picture;
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
