package controllers;

import model.Message;
import model.User;
import spark.Request;
import spark.Response;
import spark.Route;

import java.util.ArrayList;
import java.util.HashMap;

import static main.SparkMain.g;
import static main.SparkMain.userDao;

public class ChatController {
    public static Route addMessage = (Request request, Response response) -> {
        response.type("application/json");
        String payload = request.body();
        Message message = g.fromJson(payload, Message.class);
        User sender = userDao.getUser(message.getSender());
        User receiver = userDao.getUser(message.getReceiver());
        message.setUserReceiver(receiver);
        message.setUserSender(sender);
        userDao.addNewMessage(sender, receiver, message);
        return g.toJson(message);
    };

    public static Route getChats = (Request request, Response response) -> {
        response.type("application/json");
        String username = request.params("username");
        ArrayList<User> chats = userDao.getChats(username);
        return g.toJson(chats);
    };

    public static Route getMessages = (Request request, Response response) -> {
        response.type("application/json");
        HashMap<String, String> queryParams = new HashMap<>();
        request.queryMap().toMap().forEach((k, v) -> queryParams.put(k, v[0]));
        ArrayList<Message> messages = userDao.getMessages(queryParams);
        return g.toJson(messages);
    };
}
