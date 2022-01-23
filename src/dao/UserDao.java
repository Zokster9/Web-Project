package dao;

import model.User;

import java.util.HashMap;
import java.util.Map;

public class UserDao {
    private Map<String, User> users;

    public UserDao() {
        users = new HashMap<>();
    }

    public void addUser(User user) {
        users.put(user.getUsername(), user);
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
