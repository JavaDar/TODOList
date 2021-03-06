package ua.dp.daragan.repos;

import org.springframework.data.repository.CrudRepository;
import ua.dp.daragan.entities.Task;

import java.util.List;

/**
 * Created by Bogdan Daragan on 05.12.16.
 */
public interface Tasks extends CrudRepository<Task,Long> {
    List<Task> findAll();
}