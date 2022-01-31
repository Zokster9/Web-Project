package model;

import java.time.LocalDate;

public class Message {
    private Long id;
    private String content;
    private LocalDate date;
    private boolean isDeleted;
    private String sender;
    private String receiver;

    private transient User userSender;
    private transient User userReceiver;

    public Message() {
        isDeleted = false;
    }

    public Message(Long id, String content, LocalDate date, String sender, String receiver) {
        this.id = id;
        this.content = content;
        this.date = date;
        this.sender = sender;
        this.receiver = receiver;
        this.isDeleted = false;
    }

    public Long getId() { return id; }

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

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    public User getUserSender() { return userSender; }

    public void setUserSender(User userSender) { this.userSender = userSender; }

    public User getUserReceiver() { return userReceiver; }

    public void setUserReceiver(User userReceiver) { this.userReceiver = userReceiver; }

    public void setId(Long id) {
        this.id = id;
    }
}
