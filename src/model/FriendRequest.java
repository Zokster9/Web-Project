package model;

import java.time.LocalDate;

public class FriendRequest {
    private FriendRequestStatus status;
    private LocalDate date;
    private User sender;
    private User receiver;

    public FriendRequest() {
    }

    public FriendRequest(FriendRequestStatus status, LocalDate date, User sender, User receiver) {
        this.status = status;
        this.date = date;
        this.sender = sender;
        this.receiver = receiver;
    }

    public FriendRequestStatus getStatus() {
        return status;
    }

    public void setStatus(FriendRequestStatus status) {
        this.status = status;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
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
