package dao;

import model.Status;
import model.User;
import utils.SortStatusByDate;

import java.util.*;

public class UserDao {
    private Map<String, User> users;

    public UserDao() {
        users = new HashMap<>();
    }

    public List<Status> getFriendsStatuses(User user) {
        List<Status> statuses = new ArrayList<>(user.getStatuses());
        for (User friend : user.getFriends()) {
            statuses.addAll(friend.getStatuses());
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
}
