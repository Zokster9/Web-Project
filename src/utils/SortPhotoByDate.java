package utils;

import model.Photo;

import java.util.Comparator;

public class SortPhotoByDate implements Comparator<Photo> {

    @Override
    public int compare(Photo o1, Photo o2) {
        return (int) (o2.getId() - o1.getId());
    }
}
