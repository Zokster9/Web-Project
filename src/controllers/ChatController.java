package controllers;

import model.Message;
import model.User;
import spark.Request;
import spark.Response;
import spark.Route;
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
}
