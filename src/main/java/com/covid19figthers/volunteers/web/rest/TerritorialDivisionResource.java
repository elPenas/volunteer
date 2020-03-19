package com.covid19figthers.volunteers.web.rest;

import com.covid19figthers.volunteers.domain.TerritorialDivision;
import com.covid19figthers.volunteers.service.TerritorialDivisionService;
import com.covid19figthers.volunteers.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link com.covid19figthers.volunteers.domain.TerritorialDivision}.
 */
@RestController
@RequestMapping("/api")
public class TerritorialDivisionResource {

    private final Logger log = LoggerFactory.getLogger(TerritorialDivisionResource.class);

    private static final String ENTITY_NAME = "territorialDivision";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TerritorialDivisionService territorialDivisionService;

    public TerritorialDivisionResource(TerritorialDivisionService territorialDivisionService) {
        this.territorialDivisionService = territorialDivisionService;
    }

    /**
     * {@code POST  /territorial-divisions} : Create a new territorialDivision.
     *
     * @param territorialDivision the territorialDivision to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new territorialDivision, or with status {@code 400 (Bad Request)} if the territorialDivision has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/territorial-divisions")
    public ResponseEntity<TerritorialDivision> createTerritorialDivision(@RequestBody TerritorialDivision territorialDivision) throws URISyntaxException {
        log.debug("REST request to save TerritorialDivision : {}", territorialDivision);
        if (territorialDivision.getId() != null) {
            throw new BadRequestAlertException("A new territorialDivision cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TerritorialDivision result = territorialDivisionService.save(territorialDivision);
        return ResponseEntity.created(new URI("/api/territorial-divisions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /territorial-divisions} : Updates an existing territorialDivision.
     *
     * @param territorialDivision the territorialDivision to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated territorialDivision,
     * or with status {@code 400 (Bad Request)} if the territorialDivision is not valid,
     * or with status {@code 500 (Internal Server Error)} if the territorialDivision couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/territorial-divisions")
    public ResponseEntity<TerritorialDivision> updateTerritorialDivision(@RequestBody TerritorialDivision territorialDivision) throws URISyntaxException {
        log.debug("REST request to update TerritorialDivision : {}", territorialDivision);
        if (territorialDivision.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TerritorialDivision result = territorialDivisionService.save(territorialDivision);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, territorialDivision.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /territorial-divisions} : get all the territorialDivisions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of territorialDivisions in body.
     */
    @GetMapping("/territorial-divisions")
    public List<TerritorialDivision> getAllTerritorialDivisions() {
        log.debug("REST request to get all TerritorialDivisions");
        return territorialDivisionService.findAll();
    }

    /**
     * {@code GET  /territorial-divisions/:id} : get the "id" territorialDivision.
     *
     * @param id the id of the territorialDivision to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the territorialDivision, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/territorial-divisions/{id}")
    public ResponseEntity<TerritorialDivision> getTerritorialDivision(@PathVariable Long id) {
        log.debug("REST request to get TerritorialDivision : {}", id);
        Optional<TerritorialDivision> territorialDivision = territorialDivisionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(territorialDivision);
    }

    /**
     * {@code DELETE  /territorial-divisions/:id} : delete the "id" territorialDivision.
     *
     * @param id the id of the territorialDivision to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/territorial-divisions/{id}")
    public ResponseEntity<Void> deleteTerritorialDivision(@PathVariable Long id) {
        log.debug("REST request to delete TerritorialDivision : {}", id);
        territorialDivisionService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/territorial-divisions?query=:query} : search for the territorialDivision corresponding
     * to the query.
     *
     * @param query the query of the territorialDivision search.
     * @return the result of the search.
     */
    @GetMapping("/_search/territorial-divisions")
    public List<TerritorialDivision> searchTerritorialDivisions(@RequestParam String query) {
        log.debug("REST request to search TerritorialDivisions for query {}", query);
        return territorialDivisionService.search(query);
    }
}
