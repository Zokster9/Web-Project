package utils;

import model.Status;

import java.util.Comparator;

public class SortStatusByDate implements Comparator<Status> {
    @Override
    public int compare(Status o1, Status o2) {
        return (int) (o2.getId() - o1.getId());
    }
}
