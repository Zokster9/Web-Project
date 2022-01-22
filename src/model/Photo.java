package model;

public class Photo extends AbstractPost {
    public Photo() {
        super();
    }

    public Photo(Long id, String picture, String username) {
        super(id, picture, username);
    }
}
