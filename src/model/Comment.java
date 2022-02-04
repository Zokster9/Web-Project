package model;

import java.util.Date;

public class Comment {
    private Long postID;
    private String content;
    private Long date;
    private Date editDate;
    private boolean isDeleted;
    private String username;

    private transient User user;

    public Comment() {
        isDeleted = false;
    }

    public Comment(Long postID, String content, Long date, String username) {
        this.postID = postID;
        this.content = content;
        this.date = date;
        this.username = username;
        isDeleted = false;
    }

    public Long getPostID() {
        return postID;
    }

    public void setPostID(Long postID) {
        this.postID = postID;
    }

    public String getContent() { return content; }

    public void setContent(String content) { this.content = content; }

    public Long getDate() {
        return date;
    }

    public void setDate(Long date) {
        this.date = date;
    }

    public Date getEditDate() {
        return editDate;
    }

    public void setEditDate(Date editDate) {
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
