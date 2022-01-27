package model;

import java.time.LocalDate;

public class Comment {
    private Long postID;
    private LocalDate date;
    private LocalDate editDate;
    private boolean isDeleted;
    private String username;

    private transient User user;

    public Comment() {
        isDeleted = false;
    }

    public Comment(Long postID, LocalDate date, LocalDate editDate, String username) {
        this.postID = postID;
        this.date = date;
        this.editDate = editDate;
        this.username = username;
        isDeleted = false;
    }

    public Long getPostID() {
        return postID;
    }

    public void setPostID(Long postID) {
        this.postID = postID;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalDate getEditDate() {
        return editDate;
    }

    public void setEditDate(LocalDate editDate) {
        this.editDate = editDate;
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

    public User getUser() { return user; }

    public void setUser(User user) { this.user = user; }
}
