package model;

public class Status extends AbstractPost {
    private String text;

    public Status() {
        super();
    }

    public Status(Long id, String picture, String username, String text) {
        super(id, picture, username);
        this.text = text;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
