package model;

import java.time.LocalDate;

public class FriendRequest {
    private FriendRequestStatus status;
    private LocalDate date;
    private String sender;
    private String receiver;

    public FriendRequest() {
    }

    public FriendRequest(FriendRequestStatus status, LocalDate date, String sender, String receiver) {
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
}
