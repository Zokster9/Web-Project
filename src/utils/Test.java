package utils;

import dao.UserDao;
import model.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class Test {
    public static void generateData() {
        //Users
        List<User> users = new ArrayList<User>();
        User u1 = new User("admin", "admin", "admin@pico.com", "Admir", "Admirevic", Gender.Male);
        u1.setRole(UserType.Administrator);
        User u2 = new User("zokster", "admin", "admin@pico.com", "Zoran", "Bukorac", Gender.Male);
        u2.setRole(UserType.Administrator);
        User u3 = new User("mirko", "password", "mirko@gmail.com", "Mirko", "Slavujić", Gender.Male);
        User u4 = new User("ines", "password", "ines@outlook.com", "Ines", "Svegić", Gender.Female);
        User u5 = new User("test", "password", "test@test.com", "Test", "Test", Gender.Female);
        u3.getFriends().add("ines");u3.getFriends().add("test");u4.getFriends().add("mirko");u5.getFriends().add("mirko");
        users.add(u1); users.add(u2); users.add(u3);users.add(u4);users.add(u5);

        String l = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet nisi scelerisque risus mattis posuere. Aliquam nec nisl libero. Mauris ante tortor, pretium at nisi at, congue blandit sapien. Integer sed scelerisque enim, non luctus sem. In eu orci nunc. Praesent dui eros, auctor vel eleifend id, viverra sed sem. Donec sit amet eleifend arcu. Phasellus varius luctus nisi non convallis. Aliquam orci mauris, ullamcorper sit amet tortor nec, rhoncus porttitor dui. Etiam tincidunt eu augue in tincidunt. Duis tempus vehicula ex, nec rhoncus nibh sollicitudin sed. Vestibulum et sagittis ex. Vivamus eget augue sed turpis hendrerit consectetur. Nullam placerat arcu vel turpis dapibus, eget semper ipsum tempor.";
        //Statuses
        List<Status> st = new ArrayList<>();
        Status s1 = new Status(0L, l, "", "mirko");
        Status s2 = new Status(1L, l, "", "mirko");
        Status s3 = new Status(2L, l, "", "ines");
        Status s4 = new Status(3L, l, "", "ines");
        Status s5 = new Status(4L, l, "", "ines");
        Status s6 = new Status(5L, l, "", "test");
        Status s7 = new Status(6L, "Test", "", "test");
        Status s8 = new Status(7L, l, "", "test");
        st.add(s1); st.add(s2); st.add(s3);st.add(s4); st.add(s5); st.add(s6);st.add(s7); st.add(s8);

        List<Photo> ph = new ArrayList<>();
        Photo p1 = new Photo(8L,"imgs/download.jpg", l, "mirko");
        Photo p4 = new Photo(11L,"imgs/download.jpg", "", "mirko");
        Photo p3 = new Photo(10L,"imgs/download.jpg", l, "ines");
        Photo p2 = new Photo(9L,"imgs/download.jpg", "", "ines");
        Photo p5 = new Photo(12L,"imgs/download.jpg", l, "test");
        Photo p6 = new Photo(13L,"imgs/download.jpg", "", "test");
        ph.add(p1);ph.add(p2);ph.add(p3);ph.add(p4);ph.add(p5);ph.add(p6);

        List<Message> m = new ArrayList<>();
        Message m1 = new Message(0L, "Gdes brate", LocalDate.now(), "mirko", "test");
        Message m2 = new Message(1L, "Evo sta ima", LocalDate.now(), "test", "mirko");
        Message m3 = new Message(2L, "Eo nista kod tebe?", LocalDate.now(), "mirko", "test");
        Message m4 = new Message(3L, "Caoos", LocalDate.now(), "ines", "mirko");
        Message m5 = new Message(4L, "Eo, kod tb", LocalDate.now(), "mirko", "ines");
        Message m6 = new Message(5L, "Nis, kod tb?", LocalDate.now(), "ines", "mirko");
        Message m7 = new Message(6L, "Admin ovde test", LocalDate.now(), "admin", "test");
        Message m8 = new Message(7L, "Drugi admin ovde, ali ti ne bi trebao videti razliku", LocalDate.now(), "zokster", "test");
        m.add(m1);m.add(m2);m.add(m3);m.add(m4);m.add(m5);m.add(m6);m.add(m7);m.add(m8);

        List<Comment> c =new ArrayList<>();
        Comment c1 = new Comment(0L, l, LocalDate.now(), "mirko");
        Comment c2 = new Comment(0L, "dubokoumno", LocalDate.now(), "test");
        Comment c3 = new Comment(4L, "pucas", LocalDate.now(), "test");
        Comment c4 = new Comment(5L, "najjaci sam", LocalDate.now(), "ines");
        Comment c5 = new Comment(8L, "dobra fotka", LocalDate.now(), "ines");
        Comment c6 = new Comment(11L, "volim krek", LocalDate.now(), "mirko");
        Comment c7 = new Comment(13L, "smradina sam najveca. Gradjanski rat u azerbejdzanu idegaaas", LocalDate.now(), "test");
        c.add(c1);c.add(c2);c.add(c3);c.add(c4);c.add(c5);c.add(c6);c.add(c7);

        List<FriendRequest> f = new ArrayList<>();
        FriendRequest f1 = new FriendRequest(LocalDate.now(), "mirko", "ines");
        f1.setStatus(FriendRequestStatus.Accepted);
        FriendRequest f2 = new FriendRequest(LocalDate.now(), "test", "mirko");
        f2.setStatus(FriendRequestStatus.Accepted);
        FriendRequest f3 = new FriendRequest(LocalDate.now(), "test", "ines");
        f3.setStatus(FriendRequestStatus.Rejected);
        FriendRequest f4 = new FriendRequest(LocalDate.now(), "test", "ines");
        f4.setStatus(FriendRequestStatus.Pending);
        f.add(f1);f.add(f2);f.add(f3);f.add(f4);

        UserDao ud = new UserDao();
        ud.saveUsers(users);
        ud.saveStatuses(st);
        ud.savePhotos(ph);
        ud.saveMessages(m);
        ud.saveComments(c);
        ud.saveFriendRequests(f);
    }
}
