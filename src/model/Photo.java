package model;

import com.google.gson.annotations.Expose;

import java.util.ArrayList;
import java.util.List;

public class Photo {
    private Long id;
    private String picture;
    private boolean isDeleted;
    private String username;

    private transient User poster;
    private transient List<Comment> comments;

    public Photo() {
        isDeleted = false;
        comments = new ArrayList<>();
    }

    public Photo(Long id, String picture, String username) {
        this.id = id;
        this.picture = picture;
        this.username = username;
        isDeleted = false;
        comments = new ArrayList<>();
    }

    public Long getId() {
        return id;
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public User getPoster() { return poster; }

    public void setPoster(User poster) { this.poster = poster; }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }
}
