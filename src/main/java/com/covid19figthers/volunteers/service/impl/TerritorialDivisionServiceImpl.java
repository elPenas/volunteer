package com.covid19figthers.volunteers.service.impl;

import com.covid19figthers.volunteers.service.TerritorialDivisionService;
import com.covid19figthers.volunteers.domain.TerritorialDivision;
import com.covid19figthers.volunteers.repository.TerritorialDivisionRepository;
import com.covid19figthers.volunteers.repository.search.TerritorialDivisionSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing TerritorialDivision.
 */
@Service
@Transactional
public class TerritorialDivisionServiceImpl implements TerritorialDivisionService {

    private final Logger log = LoggerFactory.getLogger(TerritorialDivisionServiceImpl.class);

    private final TerritorialDivisionRepository territorialDivisionRepository;

    private final TerritorialDivisionSearchRepository territorialDivisionSearchRepository;

    public TerritorialDivisionServiceImpl(TerritorialDivisionRepository territorialDivisionRepository, TerritorialDivisionSearchRepository territorialDivisionSearchRepository) {
        this.territorialDivisionRepository = territorialDivisionRepository;
        this.territorialDivisionSearchRepository = territorialDivisionSearchRepository;
    }

    /**
     * Save a territorialDivision.
     *
     * @param territorialDivision the entity to save
     * @return the persisted entity
     */
    @Override
    public TerritorialDivision save(TerritorialDivision territorialDivision) {
        log.debug("Request to save TerritorialDivision : {}", territorialDivision);
        TerritorialDivision result = territorialDivisionRepository.save(territorialDivision);
        territorialDivisionSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the territorialDivisions.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TerritorialDivision> findAll() {
        log.debug("Request to get all TerritorialDivisions");
        return territorialDivisionRepository.findAll();
    }

    /**
     * Get one territorialDivision by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public TerritorialDivision findOne(Long id) {
        log.debug("Request to get TerritorialDivision : {}", id);
        return territorialDivisionRepository.findOne(id);
    }

    /**
     * Delete the territorialDivision by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TerritorialDivision : {}", id);
        territorialDivisionRepository.delete(id);
        territorialDivisionSearchRepository.delete(id);
    }

    /**
     * Search for the territorialDivision corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TerritorialDivision> search(String query) {
        log.debug("Request to search TerritorialDivisions for query {}", query);
        return StreamSupport
            .stream(territorialDivisionSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
