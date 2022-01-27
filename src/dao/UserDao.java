package dao;

import model.FriendRequest;
import model.Photo;
import model.Status;
import model.User;
import utils.SortStatusByDate;

import java.time.LocalDate;
import java.util.*;

public class UserDao {
    private Map<String, User> users;

    public UserDao() {
        users = new HashMap<>();
    }

    public void addFriendRequest(User sender, User receiver) {
        FriendRequest friendRequest = new FriendRequest(LocalDate.now(), sender.getUsername(), receiver.getUsername());
        sender.getFriendRequestsSent().add(friendRequest);
        receiver.getFriendRequests().add(friendRequest);
    }

    public List<User> getCommonFriends(User user1, User user2) {
        List<String> commonFriendsUsernames = new ArrayList<>(user1.getFriends());
        commonFriendsUsernames.retainAll(user2.getFriends());
        List<User> commonFriends = new ArrayList<>();
        for (String username : commonFriendsUsernames) {
            commonFriends.add(users.get(username));
        }
        return commonFriends;
    }

    public List<Status> getFriendsStatuses(User user) {
        List<Status> statuses = new ArrayList<>(user.getStatuses());
        for (String friend : user.getFriends()) {
            statuses.addAll(users.get(friend).getStatuses());
        }
        statuses.sort(new SortStatusByDate());
        return statuses;
    }

    public void addUser(User user) {
        users.put(user.getUsername(), user);
    }

    public User getUser(String username) {
        if (users.containsKey(username)) {
            return users.get(username);
        }
        return null;
    }

    public User getUser(User user) {
        if (users.containsKey(user.getUsername())) {
            if (users.get(user.getUsername()).getPassword().equals(user.getPassword())) {
                return users.get(user.getUsername());
            }
            return null;
        }
        return null;
    }

    public List<Status> getUserStatuses(User profileUser) {
        return profileUser.getStatuses();
    }

    public List<Photo> getUserGallery(User profileUser) {
        return profileUser.getPhotos();
    }

    public void removeFriend(User user, User exFriend) {
        user.getFriends().remove(exFriend.getUsername());
        exFriend.getFriends().remove(user.getUsername());
    }
}
