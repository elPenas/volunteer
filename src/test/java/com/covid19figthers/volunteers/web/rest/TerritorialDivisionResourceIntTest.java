package com.covid19figthers.volunteers.web.rest;

import com.covid19figthers.volunteers.Covid19FightersApp;

import com.covid19figthers.volunteers.domain.TerritorialDivision;
import com.covid19figthers.volunteers.repository.TerritorialDivisionRepository;
import com.covid19figthers.volunteers.service.TerritorialDivisionService;
import com.covid19figthers.volunteers.repository.search.TerritorialDivisionSearchRepository;
import com.covid19figthers.volunteers.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.covid19figthers.volunteers.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.covid19figthers.volunteers.domain.enumeration.TerritorialDivisionType;
/**
 * Test class for the TerritorialDivisionResource REST controller.
 *
 * @see TerritorialDivisionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Covid19FightersApp.class)
public class TerritorialDivisionResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final TerritorialDivisionType DEFAULT_TYPE = TerritorialDivisionType.PROVINCE;
    private static final TerritorialDivisionType UPDATED_TYPE = TerritorialDivisionType.STATE;

    @Autowired
    private TerritorialDivisionRepository territorialDivisionRepository;

    @Autowired
    private TerritorialDivisionService territorialDivisionService;

    @Autowired
    private TerritorialDivisionSearchRepository territorialDivisionSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTerritorialDivisionMockMvc;

    private TerritorialDivision territorialDivision;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TerritorialDivisionResource territorialDivisionResource = new TerritorialDivisionResource(territorialDivisionService);
        this.restTerritorialDivisionMockMvc = MockMvcBuilders.standaloneSetup(territorialDivisionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

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

    @Before
    public void initTest() {
        territorialDivisionSearchRepository.deleteAll();
        territorialDivision = createEntity(em);
    }

    @Test
    @Transactional
    public void createTerritorialDivision() throws Exception {
        int databaseSizeBeforeCreate = territorialDivisionRepository.findAll().size();

        // Create the TerritorialDivision
        restTerritorialDivisionMockMvc.perform(post("/api/territorial-divisions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(territorialDivision)))
            .andExpect(status().isCreated());

        // Validate the TerritorialDivision in the database
        List<TerritorialDivision> territorialDivisionList = territorialDivisionRepository.findAll();
        assertThat(territorialDivisionList).hasSize(databaseSizeBeforeCreate + 1);
        TerritorialDivision testTerritorialDivision = territorialDivisionList.get(territorialDivisionList.size() - 1);
        assertThat(testTerritorialDivision.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTerritorialDivision.getType()).isEqualTo(DEFAULT_TYPE);

        // Validate the TerritorialDivision in Elasticsearch
        TerritorialDivision territorialDivisionEs = territorialDivisionSearchRepository.findOne(testTerritorialDivision.getId());
        assertThat(territorialDivisionEs).isEqualToIgnoringGivenFields(testTerritorialDivision);
    }

    @Test
    @Transactional
    public void createTerritorialDivisionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = territorialDivisionRepository.findAll().size();

        // Create the TerritorialDivision with an existing ID
        territorialDivision.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTerritorialDivisionMockMvc.perform(post("/api/territorial-divisions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(territorialDivision)))
            .andExpect(status().isBadRequest());

        // Validate the TerritorialDivision in the database
        List<TerritorialDivision> territorialDivisionList = territorialDivisionRepository.findAll();
        assertThat(territorialDivisionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTerritorialDivisions() throws Exception {
        // Initialize the database
        territorialDivisionRepository.saveAndFlush(territorialDivision);

        // Get all the territorialDivisionList
        restTerritorialDivisionMockMvc.perform(get("/api/territorial-divisions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(territorialDivision.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
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
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(territorialDivision.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
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

        int databaseSizeBeforeUpdate = territorialDivisionRepository.findAll().size();

        // Update the territorialDivision
        TerritorialDivision updatedTerritorialDivision = territorialDivisionRepository.findOne(territorialDivision.getId());
        // Disconnect from session so that the updates on updatedTerritorialDivision are not directly saved in db
        em.detach(updatedTerritorialDivision);
        updatedTerritorialDivision
            .name(UPDATED_NAME)
            .type(UPDATED_TYPE);

        restTerritorialDivisionMockMvc.perform(put("/api/territorial-divisions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTerritorialDivision)))
            .andExpect(status().isOk());

        // Validate the TerritorialDivision in the database
        List<TerritorialDivision> territorialDivisionList = territorialDivisionRepository.findAll();
        assertThat(territorialDivisionList).hasSize(databaseSizeBeforeUpdate);
        TerritorialDivision testTerritorialDivision = territorialDivisionList.get(territorialDivisionList.size() - 1);
        assertThat(testTerritorialDivision.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTerritorialDivision.getType()).isEqualTo(UPDATED_TYPE);

        // Validate the TerritorialDivision in Elasticsearch
        TerritorialDivision territorialDivisionEs = territorialDivisionSearchRepository.findOne(testTerritorialDivision.getId());
        assertThat(territorialDivisionEs).isEqualToIgnoringGivenFields(testTerritorialDivision);
    }

    @Test
    @Transactional
    public void updateNonExistingTerritorialDivision() throws Exception {
        int databaseSizeBeforeUpdate = territorialDivisionRepository.findAll().size();

        // Create the TerritorialDivision

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTerritorialDivisionMockMvc.perform(put("/api/territorial-divisions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(territorialDivision)))
            .andExpect(status().isCreated());

        // Validate the TerritorialDivision in the database
        List<TerritorialDivision> territorialDivisionList = territorialDivisionRepository.findAll();
        assertThat(territorialDivisionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTerritorialDivision() throws Exception {
        // Initialize the database
        territorialDivisionService.save(territorialDivision);

        int databaseSizeBeforeDelete = territorialDivisionRepository.findAll().size();

        // Get the territorialDivision
        restTerritorialDivisionMockMvc.perform(delete("/api/territorial-divisions/{id}", territorialDivision.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean territorialDivisionExistsInEs = territorialDivisionSearchRepository.exists(territorialDivision.getId());
        assertThat(territorialDivisionExistsInEs).isFalse();

        // Validate the database is empty
        List<TerritorialDivision> territorialDivisionList = territorialDivisionRepository.findAll();
        assertThat(territorialDivisionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchTerritorialDivision() throws Exception {
        // Initialize the database
        territorialDivisionService.save(territorialDivision);

        // Search the territorialDivision
        restTerritorialDivisionMockMvc.perform(get("/api/_search/territorial-divisions?query=id:" + territorialDivision.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(territorialDivision.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TerritorialDivision.class);
        TerritorialDivision territorialDivision1 = new TerritorialDivision();
        territorialDivision1.setId(1L);
        TerritorialDivision territorialDivision2 = new TerritorialDivision();
        territorialDivision2.setId(territorialDivision1.getId());
        assertThat(territorialDivision1).isEqualTo(territorialDivision2);
        territorialDivision2.setId(2L);
        assertThat(territorialDivision1).isNotEqualTo(territorialDivision2);
        territorialDivision1.setId(null);
        assertThat(territorialDivision1).isNotEqualTo(territorialDivision2);
    }
}
