package model;

import java.time.LocalDate;

public class Message {
    private String content;
    private LocalDate date;
    private boolean isDeleted;
    private User sender;
    private User receiver;

    public Message() {
        isDeleted = false;
    }

    public Message(String content, LocalDate date, User sender, User receiver) {
        this.content = content;
        this.date = date;
        this.sender = sender;
        this.receiver = receiver;
        this.isDeleted = false;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public User getReceiver() {
        return receiver;
    }

    public void setReceiver(User receiver) {
        this.receiver = receiver;
    }
}
