package com.covid19figthers.volunteers.web.rest;

import com.covid19figthers.volunteers.Covid19FightersApp;
import com.covid19figthers.volunteers.domain.TerritorialDivision;
import com.covid19figthers.volunteers.repository.TerritorialDivisionRepository;
import com.covid19figthers.volunteers.repository.search.TerritorialDivisionSearchRepository;
import com.covid19figthers.volunteers.service.TerritorialDivisionService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
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

import com.covid19figthers.volunteers.domain.enumeration.TerritorialDivisionType;
/**
 * Integration tests for the {@link TerritorialDivisionResource} REST controller.
 */
@SpringBootTest(classes = Covid19FightersApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class TerritorialDivisionResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final TerritorialDivisionType DEFAULT_TYPE = TerritorialDivisionType.PROVINCE;
    private static final TerritorialDivisionType UPDATED_TYPE = TerritorialDivisionType.STATE;

    @Autowired
    private TerritorialDivisionRepository territorialDivisionRepository;

    @Autowired
    private TerritorialDivisionService territorialDivisionService;

    /**
     * This repository is mocked in the com.covid19figthers.volunteers.repository.search test package.
     *
     * @see com.covid19figthers.volunteers.repository.search.TerritorialDivisionSearchRepositoryMockConfiguration
     */
    @Autowired
    private TerritorialDivisionSearchRepository mockTerritorialDivisionSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTerritorialDivisionMockMvc;

    private TerritorialDivision territorialDivision;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TerritorialDivision createEntity(EntityManager em) {
        TerritorialDivision territorialDivision = new TerritorialDivision()
            .name(DEFAULT_NAME)
            .type(DEFAULT_TYPE);
        return territorialDivision;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TerritorialDivision createUpdatedEntity(EntityManager em) {
        TerritorialDivision territorialDivision = new TerritorialDivision()
            .name(UPDATED_NAME)
            .type(UPDATED_TYPE);
        return territorialDivision;
    }

    @BeforeEach
    public void initTest() {
        territorialDivision = createEntity(em);
    }

    @Test
    @Transactional
    public void createTerritorialDivision() throws Exception {
        int databaseSizeBeforeCreate = territorialDivisionRepository.findAll().size();

        // Create the TerritorialDivision
        restTerritorialDivisionMockMvc.perform(post("/api/territorial-divisions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(territorialDivision)))
            .andExpect(status().isCreated());

        // Validate the TerritorialDivision in the database
        List<TerritorialDivision> territorialDivisionList = territorialDivisionRepository.findAll();
        assertThat(territorialDivisionList).hasSize(databaseSizeBeforeCreate + 1);
        TerritorialDivision testTerritorialDivision = territorialDivisionList.get(territorialDivisionList.size() - 1);
        assertThat(testTerritorialDivision.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTerritorialDivision.getType()).isEqualTo(DEFAULT_TYPE);

        // Validate the TerritorialDivision in Elasticsearch
        verify(mockTerritorialDivisionSearchRepository, times(1)).save(testTerritorialDivision);
    }

    @Test
    @Transactional
    public void createTerritorialDivisionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = territorialDivisionRepository.findAll().size();

        // Create the TerritorialDivision with an existing ID
        territorialDivision.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTerritorialDivisionMockMvc.perform(post("/api/territorial-divisions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(territorialDivision)))
            .andExpect(status().isBadRequest());

        // Validate the TerritorialDivision in the database
        List<TerritorialDivision> territorialDivisionList = territorialDivisionRepository.findAll();
        assertThat(territorialDivisionList).hasSize(databaseSizeBeforeCreate);

        // Validate the TerritorialDivision in Elasticsearch
        verify(mockTerritorialDivisionSearchRepository, times(0)).save(territorialDivision);
    }


    @Test
    @Transactional
    public void getAllTerritorialDivisions() throws Exception {
        // Initialize the database
        territorialDivisionRepository.saveAndFlush(territorialDivision);

        // Get all the territorialDivisionList
        restTerritorialDivisionMockMvc.perform(get("/api/territorial-divisions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(territorialDivision.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }
    
    @Test
    @Transactional
    public void getTerritorialDivision() throws Exception {
        // Initialize the database
        territorialDivisionRepository.saveAndFlush(territorialDivision);

        // Get the territorialDivision
        restTerritorialDivisionMockMvc.perform(get("/api/territorial-divisions/{id}", territorialDivision.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(territorialDivision.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTerritorialDivision() throws Exception {
        // Get the territorialDivision
        restTerritorialDivisionMockMvc.perform(get("/api/territorial-divisions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTerritorialDivision() throws Exception {
        // Initialize the database
        territorialDivisionService.save(territorialDivision);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockTerritorialDivisionSearchRepository);

        int databaseSizeBeforeUpdate = territorialDivisionRepository.findAll().size();

        // Update the territorialDivision
        TerritorialDivision updatedTerritorialDivision = territorialDivisionRepository.findById(territorialDivision.getId()).get();
        // Disconnect from session so that the updates on updatedTerritorialDivision are not directly saved in db
        em.detach(updatedTerritorialDivision);
        updatedTerritorialDivision
            .name(UPDATED_NAME)
            .type(UPDATED_TYPE);

        restTerritorialDivisionMockMvc.perform(put("/api/territorial-divisions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTerritorialDivision)))
            .andExpect(status().isOk());

        // Validate the TerritorialDivision in the database
        List<TerritorialDivision> territorialDivisionList = territorialDivisionRepository.findAll();
        assertThat(territorialDivisionList).hasSize(databaseSizeBeforeUpdate);
        TerritorialDivision testTerritorialDivision = territorialDivisionList.get(territorialDivisionList.size() - 1);
        assertThat(testTerritorialDivision.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTerritorialDivision.getType()).isEqualTo(UPDATED_TYPE);

        // Validate the TerritorialDivision in Elasticsearch
        verify(mockTerritorialDivisionSearchRepository, times(1)).save(testTerritorialDivision);
    }

    @Test
    @Transactional
    public void updateNonExistingTerritorialDivision() throws Exception {
        int databaseSizeBeforeUpdate = territorialDivisionRepository.findAll().size();

        // Create the TerritorialDivision

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTerritorialDivisionMockMvc.perform(put("/api/territorial-divisions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(territorialDivision)))
            .andExpect(status().isBadRequest());

        // Validate the TerritorialDivision in the database
        List<TerritorialDivision> territorialDivisionList = territorialDivisionRepository.findAll();
        assertThat(territorialDivisionList).hasSize(databaseSizeBeforeUpdate);

        // Validate the TerritorialDivision in Elasticsearch
        verify(mockTerritorialDivisionSearchRepository, times(0)).save(territorialDivision);
    }

    @Test
    @Transactional
    public void deleteTerritorialDivision() throws Exception {
        // Initialize the database
        territorialDivisionService.save(territorialDivision);

        int databaseSizeBeforeDelete = territorialDivisionRepository.findAll().size();

        // Delete the territorialDivision
        restTerritorialDivisionMockMvc.perform(delete("/api/territorial-divisions/{id}", territorialDivision.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TerritorialDivision> territorialDivisionList = territorialDivisionRepository.findAll();
        assertThat(territorialDivisionList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the TerritorialDivision in Elasticsearch
        verify(mockTerritorialDivisionSearchRepository, times(1)).deleteById(territorialDivision.getId());
    }

    @Test
    @Transactional
    public void searchTerritorialDivision() throws Exception {
        // Initialize the database
        territorialDivisionService.save(territorialDivision);
        when(mockTerritorialDivisionSearchRepository.search(queryStringQuery("id:" + territorialDivision.getId())))
            .thenReturn(Collections.singletonList(territorialDivision));
        // Search the territorialDivision
        restTerritorialDivisionMockMvc.perform(get("/api/_search/territorial-divisions?query=id:" + territorialDivision.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(territorialDivision.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }
}
