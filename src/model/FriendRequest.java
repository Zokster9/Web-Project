package model;

public class FriendRequest {
    private FriendRequestStatus status;
    private Long date;
    private String sender;
    private String receiver;

    private transient User userSender;
    private transient User userReceiver;

    public FriendRequest() {
    }

    public FriendRequest(Long date, String sender, String receiver) {
        this.status = FriendRequestStatus.Pending;
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

    public Long getDate() {
        return date;
    }

    public void setDate(Long date) {
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

    public User getUserSender() { return userSender; }

    public void setUserSender(User userSender) { this.userSender = userSender; }

    public User getUserReceiver() { return userReceiver; }

    public void setUserReceiver(User userReceiver) { this.userReceiver = userReceiver; }
}
