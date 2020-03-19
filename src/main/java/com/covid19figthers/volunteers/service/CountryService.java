package com.covid19figthers.volunteers.service;

import com.covid19figthers.volunteers.domain.Country;
import java.util.List;

/**
 * Service Interface for managing Country.
 */
public interface CountryService {

    /**
     * Save a country.
     *
     * @param country the entity to save
     * @return the persisted entity
     */
    Country save(Country country);

    /**
     * Get all the countries.
     *
     * @return the list of entities
     */
    List<Country> findAll();

    /**
     * Get the "id" country.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Country findOne(Long id);

    /**
     * Delete the "id" country.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the country corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<Country> search(String query);
}
