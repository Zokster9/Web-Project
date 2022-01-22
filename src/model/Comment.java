package model;

import java.time.LocalDate;

public class Comment {
    private Long post;
    private LocalDate date;
    private LocalDate editDate;
    private boolean isDeleted;
    private String username;

    public Comment() {
        isDeleted = false;
    }

    public Comment(Long post, LocalDate date, LocalDate editDate, String username) {
        this.post = post;
        this.date = date;
        this.editDate = editDate;
        this.username = username;
        isDeleted = false;
    }

    public Long getPost() {
        return post;
    }

    public void setPost(Long post) {
        this.post = post;
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
}
