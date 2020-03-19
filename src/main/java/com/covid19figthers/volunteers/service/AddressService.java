package com.covid19figthers.volunteers.service;

import com.covid19figthers.volunteers.domain.Address;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Address}.
 */
public interface AddressService {

    /**
     * Save a address.
     *
     * @param address the entity to save.
     * @return the persisted entity.
     */
    Address save(Address address);

    /**
     * Get all the addresses.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Address> findAll(Pageable pageable);

    /**
     * Get the "id" address.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Address> findOne(Long id);

    /**
     * Delete the "id" address.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the address corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Address> search(String query, Pageable pageable);
}
