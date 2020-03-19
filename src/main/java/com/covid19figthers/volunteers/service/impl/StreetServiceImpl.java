package com.covid19figthers.volunteers.service.impl;

import com.covid19figthers.volunteers.service.StreetService;
import com.covid19figthers.volunteers.domain.Street;
import com.covid19figthers.volunteers.repository.StreetRepository;
import com.covid19figthers.volunteers.repository.search.StreetSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link Street}.
 */
@Service
@Transactional
public class StreetServiceImpl implements StreetService {

    private final Logger log = LoggerFactory.getLogger(StreetServiceImpl.class);

    private final StreetRepository streetRepository;

    private final StreetSearchRepository streetSearchRepository;

    public StreetServiceImpl(StreetRepository streetRepository, StreetSearchRepository streetSearchRepository) {
        this.streetRepository = streetRepository;
        this.streetSearchRepository = streetSearchRepository;
    }

    /**
     * Save a street.
     *
     * @param street the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Street save(Street street) {
        log.debug("Request to save Street : {}", street);
        Street result = streetRepository.save(street);
        streetSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the streets.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Street> findAll(Pageable pageable) {
        log.debug("Request to get all Streets");
        return streetRepository.findAll(pageable);
    }

    /**
     * Get one street by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Street> findOne(Long id) {
        log.debug("Request to get Street : {}", id);
        return streetRepository.findById(id);
    }

    /**
     * Delete the street by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Street : {}", id);
        streetRepository.deleteById(id);
        streetSearchRepository.deleteById(id);
    }

    /**
     * Search for the street corresponding to the query.
     *
     * @param query the query of the search.
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Street> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Streets for query {}", query);
        return streetSearchRepository.search(queryStringQuery(query), pageable);    }
}
