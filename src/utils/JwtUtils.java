package utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import spark.Request;
import static main.SparkMain.key;

public class JwtUtils {

    public static String getUsernameFromToken(Request request) {
        String auth = request.headers("Authorization");
        System.out.println("Authorization: " + auth);
        if ((auth != null) && (auth.contains("Bearer "))) {
            String jwt = auth.substring(auth.indexOf("Bearer ") + 7);
            try {
                Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt);
                return claims.getBody().getSubject();
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        }
        return null;
    }
}
