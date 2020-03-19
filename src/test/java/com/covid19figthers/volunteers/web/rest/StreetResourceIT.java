package com.covid19figthers.volunteers.web.rest;

import com.covid19figthers.volunteers.Covid19FightersApp;
import com.covid19figthers.volunteers.domain.Street;
import com.covid19figthers.volunteers.repository.StreetRepository;
import com.covid19figthers.volunteers.repository.search.StreetSearchRepository;
import com.covid19figthers.volunteers.service.StreetService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link StreetResource} REST controller.
 */
@SpringBootTest(classes = Covid19FightersApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class StreetResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private StreetRepository streetRepository;

    @Autowired
    private StreetService streetService;

    /**
     * This repository is mocked in the com.covid19figthers.volunteers.repository.search test package.
     *
     * @see com.covid19figthers.volunteers.repository.search.StreetSearchRepositoryMockConfiguration
     */
    @Autowired
    private StreetSearchRepository mockStreetSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restStreetMockMvc;

    private Street street;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Street createEntity(EntityManager em) {
        Street street = new Street()
            .name(DEFAULT_NAME);
        return street;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Street createUpdatedEntity(EntityManager em) {
        Street street = new Street()
            .name(UPDATED_NAME);
        return street;
    }

    @BeforeEach
    public void initTest() {
        street = createEntity(em);
    }

    @Test
    @Transactional
    public void createStreet() throws Exception {
        int databaseSizeBeforeCreate = streetRepository.findAll().size();

        // Create the Street
        restStreetMockMvc.perform(post("/api/streets")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(street)))
            .andExpect(status().isCreated());

        // Validate the Street in the database
        List<Street> streetList = streetRepository.findAll();
        assertThat(streetList).hasSize(databaseSizeBeforeCreate + 1);
        Street testStreet = streetList.get(streetList.size() - 1);
        assertThat(testStreet.getName()).isEqualTo(DEFAULT_NAME);

        // Validate the Street in Elasticsearch
        verify(mockStreetSearchRepository, times(1)).save(testStreet);
    }

    @Test
    @Transactional
    public void createStreetWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = streetRepository.findAll().size();

        // Create the Street with an existing ID
        street.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStreetMockMvc.perform(post("/api/streets")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(street)))
            .andExpect(status().isBadRequest());

        // Validate the Street in the database
        List<Street> streetList = streetRepository.findAll();
        assertThat(streetList).hasSize(databaseSizeBeforeCreate);

        // Validate the Street in Elasticsearch
        verify(mockStreetSearchRepository, times(0)).save(street);
    }


    @Test
    @Transactional
    public void getAllStreets() throws Exception {
        // Initialize the database
        streetRepository.saveAndFlush(street);

        // Get all the streetList
        restStreetMockMvc.perform(get("/api/streets?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(street.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    @Transactional
    public void getStreet() throws Exception {
        // Initialize the database
        streetRepository.saveAndFlush(street);

        // Get the street
        restStreetMockMvc.perform(get("/api/streets/{id}", street.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(street.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    @Transactional
    public void getNonExistingStreet() throws Exception {
        // Get the street
        restStreetMockMvc.perform(get("/api/streets/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStreet() throws Exception {
        // Initialize the database
        streetService.save(street);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockStreetSearchRepository);

        int databaseSizeBeforeUpdate = streetRepository.findAll().size();

        // Update the street
        Street updatedStreet = streetRepository.findById(street.getId()).get();
        // Disconnect from session so that the updates on updatedStreet are not directly saved in db
        em.detach(updatedStreet);
        updatedStreet
            .name(UPDATED_NAME);

        restStreetMockMvc.perform(put("/api/streets")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedStreet)))
            .andExpect(status().isOk());

        // Validate the Street in the database
        List<Street> streetList = streetRepository.findAll();
        assertThat(streetList).hasSize(databaseSizeBeforeUpdate);
        Street testStreet = streetList.get(streetList.size() - 1);
        assertThat(testStreet.getName()).isEqualTo(UPDATED_NAME);

        // Validate the Street in Elasticsearch
        verify(mockStreetSearchRepository, times(1)).save(testStreet);
    }

    @Test
    @Transactional
    public void updateNonExistingStreet() throws Exception {
        int databaseSizeBeforeUpdate = streetRepository.findAll().size();

        // Create the Street

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStreetMockMvc.perform(put("/api/streets")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(street)))
            .andExpect(status().isBadRequest());

        // Validate the Street in the database
        List<Street> streetList = streetRepository.findAll();
        assertThat(streetList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Street in Elasticsearch
        verify(mockStreetSearchRepository, times(0)).save(street);
    }

    @Test
    @Transactional
    public void deleteStreet() throws Exception {
        // Initialize the database
        streetService.save(street);

        int databaseSizeBeforeDelete = streetRepository.findAll().size();

        // Delete the street
        restStreetMockMvc.perform(delete("/api/streets/{id}", street.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Street> streetList = streetRepository.findAll();
        assertThat(streetList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Street in Elasticsearch
        verify(mockStreetSearchRepository, times(1)).deleteById(street.getId());
    }

    @Test
    @Transactional
    public void searchStreet() throws Exception {
        // Initialize the database
        streetService.save(street);
        when(mockStreetSearchRepository.search(queryStringQuery("id:" + street.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(street), PageRequest.of(0, 1), 1));
        // Search the street
        restStreetMockMvc.perform(get("/api/_search/streets?query=id:" + street.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(street.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
}
