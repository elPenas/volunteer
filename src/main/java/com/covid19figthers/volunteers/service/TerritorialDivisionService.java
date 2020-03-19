package com.covid19figthers.volunteers.service;

import com.covid19figthers.volunteers.domain.TerritorialDivision;
import java.util.List;

/**
 * Service Interface for managing TerritorialDivision.
 */
public interface TerritorialDivisionService {

    /**
     * Save a territorialDivision.
     *
     * @param territorialDivision the entity to save
     * @return the persisted entity
     */
    TerritorialDivision save(TerritorialDivision territorialDivision);

    /**
     * Get all the territorialDivisions.
     *
     * @return the list of entities
     */
    List<TerritorialDivision> findAll();

    /**
     * Get the "id" territorialDivision.
     *
     * @param id the id of the entity
     * @return the entity
     */
    TerritorialDivision findOne(Long id);

    /**
     * Delete the "id" territorialDivision.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the territorialDivision corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<TerritorialDivision> search(String query);
}
