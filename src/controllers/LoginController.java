package controllers;
import io.jsonwebtoken.Jwts;
import model.User;
import spark.Request;
import spark.Response;
import spark.Route;
import java.util.Date;
import static main.SparkMain.userDao;
import static main.SparkMain.g;
import static main.SparkMain.key;

public class LoginController {

    public static Route loginUser = (Request request, Response response) -> {
        response.type("application/json");
        String payload = request.body();
        User potentialUser = g.fromJson(payload, User.class);
        if (userDao.isUserValid(potentialUser)) {
            User user = userDao.getUser(potentialUser.getUsername());
            String jws = Jwts.builder().setSubject(user.getUsername())
                    .setExpiration(new Date(new Date().getTime() + 30 * 6000 * 10L)).setIssuedAt(new Date()).signWith(key).compact();
            user.setJWTToken(jws);
            return g.toJson(user);
        }
        response.status(401);
        return response;
    };

    public static Route signUpUser = (Request request, Response response) -> {
        response.type("application/json");
        String payload = request.body();
        User user = g.fromJson(payload, User.class);
        if (userDao.isUsernameValid(user.getUsername())) {
            userDao.addUser(user);
            return g.toJson(user);
        }
        response.status(401);
        return response;
    };
}
