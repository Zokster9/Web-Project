package model;

import java.time.LocalDate;

public class Comment {
    private LocalDate date;
    private LocalDate editDate;
    private boolean isDeleted;
    private User user;

    public Comment() {
        isDeleted = false;
    }

    public Comment(LocalDate date, LocalDate editDate, User user) {
        this.date = date;
        this.editDate = editDate;
        this.user = user;
        isDeleted = false;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
