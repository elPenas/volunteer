package com.covid19figthers.volunteers.service;

import com.covid19figthers.volunteers.domain.Street;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Street.
 */
public interface StreetService {

    /**
     * Save a street.
     *
     * @param street the entity to save
     * @return the persisted entity
     */
    Street save(Street street);

    /**
     * Get all the streets.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Street> findAll(Pageable pageable);

    /**
     * Get the "id" street.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Street findOne(Long id);

    /**
     * Delete the "id" street.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the street corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Street> search(String query, Pageable pageable);
}
