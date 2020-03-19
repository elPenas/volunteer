package com.covid19figthers.volunteers.web.rest;

import com.covid19figthers.volunteers.Covid19FightersApp;
import com.covid19figthers.volunteers.domain.Profile;
import com.covid19figthers.volunteers.domain.Address;
import com.covid19figthers.volunteers.domain.User;
import com.covid19figthers.volunteers.repository.ProfileRepository;
import com.covid19figthers.volunteers.repository.search.ProfileSearchRepository;
import com.covid19figthers.volunteers.service.ProfileService;
import com.covid19figthers.volunteers.service.dto.ProfileCriteria;
import com.covid19figthers.volunteers.service.ProfileQueryService;

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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.covid19figthers.volunteers.domain.enumeration.Genre;
/**
 * Integration tests for the {@link ProfileResource} REST controller.
 */
@SpringBootTest(classes = Covid19FightersApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class ProfileResourceIT {

    private static final LocalDate DEFAULT_BIRTHDAY = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_BIRTHDAY = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_BIRTHDAY = LocalDate.ofEpochDay(-1L);

    private static final Genre DEFAULT_GENRE = Genre.FEMALE;
    private static final Genre UPDATED_GENRE = Genre.MALE;

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private ProfileService profileService;

    /**
     * This repository is mocked in the com.covid19figthers.volunteers.repository.search test package.
     *
     * @see com.covid19figthers.volunteers.repository.search.ProfileSearchRepositoryMockConfiguration
     */
    @Autowired
    private ProfileSearchRepository mockProfileSearchRepository;

    @Autowired
    private ProfileQueryService profileQueryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProfileMockMvc;

    private Profile profile;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Profile createEntity(EntityManager em) {
        Profile profile = new Profile()
            .birthday(DEFAULT_BIRTHDAY)
            .genre(DEFAULT_GENRE);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        profile.setUser(user);
        return profile;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Profile createUpdatedEntity(EntityManager em) {
        Profile profile = new Profile()
            .birthday(UPDATED_BIRTHDAY)
            .genre(UPDATED_GENRE);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        profile.setUser(user);
        return profile;
    }

    @BeforeEach
    public void initTest() {
        profile = createEntity(em);
    }

    @Test
    @Transactional
    public void createProfile() throws Exception {
        int databaseSizeBeforeCreate = profileRepository.findAll().size();

        // Create the Profile
        restProfileMockMvc.perform(post("/api/profiles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profile)))
            .andExpect(status().isCreated());

        // Validate the Profile in the database
        List<Profile> profileList = profileRepository.findAll();
        assertThat(profileList).hasSize(databaseSizeBeforeCreate + 1);
        Profile testProfile = profileList.get(profileList.size() - 1);
        assertThat(testProfile.getBirthday()).isEqualTo(DEFAULT_BIRTHDAY);
        assertThat(testProfile.getGenre()).isEqualTo(DEFAULT_GENRE);

        // Validate the Profile in Elasticsearch
        verify(mockProfileSearchRepository, times(1)).save(testProfile);
    }

    @Test
    @Transactional
    public void createProfileWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = profileRepository.findAll().size();

        // Create the Profile with an existing ID
        profile.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProfileMockMvc.perform(post("/api/profiles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profile)))
            .andExpect(status().isBadRequest());

        // Validate the Profile in the database
        List<Profile> profileList = profileRepository.findAll();
        assertThat(profileList).hasSize(databaseSizeBeforeCreate);

        // Validate the Profile in Elasticsearch
        verify(mockProfileSearchRepository, times(0)).save(profile);
    }


    @Test
    @Transactional
    public void checkBirthdayIsRequired() throws Exception {
        int databaseSizeBeforeTest = profileRepository.findAll().size();
        // set the field null
        profile.setBirthday(null);

        // Create the Profile, which fails.

        restProfileMockMvc.perform(post("/api/profiles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profile)))
            .andExpect(status().isBadRequest());

        List<Profile> profileList = profileRepository.findAll();
        assertThat(profileList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkGenreIsRequired() throws Exception {
        int databaseSizeBeforeTest = profileRepository.findAll().size();
        // set the field null
        profile.setGenre(null);

        // Create the Profile, which fails.

        restProfileMockMvc.perform(post("/api/profiles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profile)))
            .andExpect(status().isBadRequest());

        List<Profile> profileList = profileRepository.findAll();
        assertThat(profileList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProfiles() throws Exception {
        // Initialize the database
        profileRepository.saveAndFlush(profile);

        // Get all the profileList
        restProfileMockMvc.perform(get("/api/profiles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(profile.getId().intValue())))
            .andExpect(jsonPath("$.[*].birthday").value(hasItem(DEFAULT_BIRTHDAY.toString())))
            .andExpect(jsonPath("$.[*].genre").value(hasItem(DEFAULT_GENRE.toString())));
    }
    
    @Test
    @Transactional
    public void getProfile() throws Exception {
        // Initialize the database
        profileRepository.saveAndFlush(profile);

        // Get the profile
        restProfileMockMvc.perform(get("/api/profiles/{id}", profile.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(profile.getId().intValue()))
            .andExpect(jsonPath("$.birthday").value(DEFAULT_BIRTHDAY.toString()))
            .andExpect(jsonPath("$.genre").value(DEFAULT_GENRE.toString()));
    }


    @Test
    @Transactional
    public void getProfilesByIdFiltering() throws Exception {
        // Initialize the database
        profileRepository.saveAndFlush(profile);

        Long id = profile.getId();

        defaultProfileShouldBeFound("id.equals=" + id);
        defaultProfileShouldNotBeFound("id.notEquals=" + id);

        defaultProfileShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultProfileShouldNotBeFound("id.greaterThan=" + id);

        defaultProfileShouldBeFound("id.lessThanOrEqual=" + id);
        defaultProfileShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllProfilesByBirthdayIsEqualToSomething() throws Exception {
        // Initialize the database
        profileRepository.saveAndFlush(profile);

        // Get all the profileList where birthday equals to DEFAULT_BIRTHDAY
        defaultProfileShouldBeFound("birthday.equals=" + DEFAULT_BIRTHDAY);

        // Get all the profileList where birthday equals to UPDATED_BIRTHDAY
        defaultProfileShouldNotBeFound("birthday.equals=" + UPDATED_BIRTHDAY);
    }

    @Test
    @Transactional
    public void getAllProfilesByBirthdayIsNotEqualToSomething() throws Exception {
        // Initialize the database
        profileRepository.saveAndFlush(profile);

        // Get all the profileList where birthday not equals to DEFAULT_BIRTHDAY
        defaultProfileShouldNotBeFound("birthday.notEquals=" + DEFAULT_BIRTHDAY);

        // Get all the profileList where birthday not equals to UPDATED_BIRTHDAY
        defaultProfileShouldBeFound("birthday.notEquals=" + UPDATED_BIRTHDAY);
    }

    @Test
    @Transactional
    public void getAllProfilesByBirthdayIsInShouldWork() throws Exception {
        // Initialize the database
        profileRepository.saveAndFlush(profile);

        // Get all the profileList where birthday in DEFAULT_BIRTHDAY or UPDATED_BIRTHDAY
        defaultProfileShouldBeFound("birthday.in=" + DEFAULT_BIRTHDAY + "," + UPDATED_BIRTHDAY);

        // Get all the profileList where birthday equals to UPDATED_BIRTHDAY
        defaultProfileShouldNotBeFound("birthday.in=" + UPDATED_BIRTHDAY);
    }

    @Test
    @Transactional
    public void getAllProfilesByBirthdayIsNullOrNotNull() throws Exception {
        // Initialize the database
        profileRepository.saveAndFlush(profile);

        // Get all the profileList where birthday is not null
        defaultProfileShouldBeFound("birthday.specified=true");

        // Get all the profileList where birthday is null
        defaultProfileShouldNotBeFound("birthday.specified=false");
    }

    @Test
    @Transactional
    public void getAllProfilesByBirthdayIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        profileRepository.saveAndFlush(profile);

        // Get all the profileList where birthday is greater than or equal to DEFAULT_BIRTHDAY
        defaultProfileShouldBeFound("birthday.greaterThanOrEqual=" + DEFAULT_BIRTHDAY);

        // Get all the profileList where birthday is greater than or equal to UPDATED_BIRTHDAY
        defaultProfileShouldNotBeFound("birthday.greaterThanOrEqual=" + UPDATED_BIRTHDAY);
    }

    @Test
    @Transactional
    public void getAllProfilesByBirthdayIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        profileRepository.saveAndFlush(profile);

        // Get all the profileList where birthday is less than or equal to DEFAULT_BIRTHDAY
        defaultProfileShouldBeFound("birthday.lessThanOrEqual=" + DEFAULT_BIRTHDAY);

        // Get all the profileList where birthday is less than or equal to SMALLER_BIRTHDAY
        defaultProfileShouldNotBeFound("birthday.lessThanOrEqual=" + SMALLER_BIRTHDAY);
    }

    @Test
    @Transactional
    public void getAllProfilesByBirthdayIsLessThanSomething() throws Exception {
        // Initialize the database
        profileRepository.saveAndFlush(profile);

        // Get all the profileList where birthday is less than DEFAULT_BIRTHDAY
        defaultProfileShouldNotBeFound("birthday.lessThan=" + DEFAULT_BIRTHDAY);

        // Get all the profileList where birthday is less than UPDATED_BIRTHDAY
        defaultProfileShouldBeFound("birthday.lessThan=" + UPDATED_BIRTHDAY);
    }

    @Test
    @Transactional
    public void getAllProfilesByBirthdayIsGreaterThanSomething() throws Exception {
        // Initialize the database
        profileRepository.saveAndFlush(profile);

        // Get all the profileList where birthday is greater than DEFAULT_BIRTHDAY
        defaultProfileShouldNotBeFound("birthday.greaterThan=" + DEFAULT_BIRTHDAY);

        // Get all the profileList where birthday is greater than SMALLER_BIRTHDAY
        defaultProfileShouldBeFound("birthday.greaterThan=" + SMALLER_BIRTHDAY);
    }


    @Test
    @Transactional
    public void getAllProfilesByGenreIsEqualToSomething() throws Exception {
        // Initialize the database
        profileRepository.saveAndFlush(profile);

        // Get all the profileList where genre equals to DEFAULT_GENRE
        defaultProfileShouldBeFound("genre.equals=" + DEFAULT_GENRE);

        // Get all the profileList where genre equals to UPDATED_GENRE
        defaultProfileShouldNotBeFound("genre.equals=" + UPDATED_GENRE);
    }

    @Test
    @Transactional
    public void getAllProfilesByGenreIsNotEqualToSomething() throws Exception {
        // Initialize the database
        profileRepository.saveAndFlush(profile);

        // Get all the profileList where genre not equals to DEFAULT_GENRE
        defaultProfileShouldNotBeFound("genre.notEquals=" + DEFAULT_GENRE);

        // Get all the profileList where genre not equals to UPDATED_GENRE
        defaultProfileShouldBeFound("genre.notEquals=" + UPDATED_GENRE);
    }

    @Test
    @Transactional
    public void getAllProfilesByGenreIsInShouldWork() throws Exception {
        // Initialize the database
        profileRepository.saveAndFlush(profile);

        // Get all the profileList where genre in DEFAULT_GENRE or UPDATED_GENRE
        defaultProfileShouldBeFound("genre.in=" + DEFAULT_GENRE + "," + UPDATED_GENRE);

        // Get all the profileList where genre equals to UPDATED_GENRE
        defaultProfileShouldNotBeFound("genre.in=" + UPDATED_GENRE);
    }

    @Test
    @Transactional
    public void getAllProfilesByGenreIsNullOrNotNull() throws Exception {
        // Initialize the database
        profileRepository.saveAndFlush(profile);

        // Get all the profileList where genre is not null
        defaultProfileShouldBeFound("genre.specified=true");

        // Get all the profileList where genre is null
        defaultProfileShouldNotBeFound("genre.specified=false");
    }

    @Test
    @Transactional
    public void getAllProfilesByAddressIsEqualToSomething() throws Exception {
        // Initialize the database
        profileRepository.saveAndFlush(profile);
        Address address = AddressResourceIT.createEntity(em);
        em.persist(address);
        em.flush();
        profile.setAddress(address);
        profileRepository.saveAndFlush(profile);
        Long addressId = address.getId();

        // Get all the profileList where address equals to addressId
        defaultProfileShouldBeFound("addressId.equals=" + addressId);

        // Get all the profileList where address equals to addressId + 1
        defaultProfileShouldNotBeFound("addressId.equals=" + (addressId + 1));
    }


    @Test
    @Transactional
    public void getAllProfilesByUserIsEqualToSomething() throws Exception {
        // Get already existing entity
        User user = profile.getUser();
        profileRepository.saveAndFlush(profile);
        Long userId = user.getId();

        // Get all the profileList where user equals to userId
        defaultProfileShouldBeFound("userId.equals=" + userId);

        // Get all the profileList where user equals to userId + 1
        defaultProfileShouldNotBeFound("userId.equals=" + (userId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultProfileShouldBeFound(String filter) throws Exception {
        restProfileMockMvc.perform(get("/api/profiles?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(profile.getId().intValue())))
            .andExpect(jsonPath("$.[*].birthday").value(hasItem(DEFAULT_BIRTHDAY.toString())))
            .andExpect(jsonPath("$.[*].genre").value(hasItem(DEFAULT_GENRE.toString())));

        // Check, that the count call also returns 1
        restProfileMockMvc.perform(get("/api/profiles/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultProfileShouldNotBeFound(String filter) throws Exception {
        restProfileMockMvc.perform(get("/api/profiles?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restProfileMockMvc.perform(get("/api/profiles/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingProfile() throws Exception {
        // Get the profile
        restProfileMockMvc.perform(get("/api/profiles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProfile() throws Exception {
        // Initialize the database
        profileService.save(profile);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockProfileSearchRepository);

        int databaseSizeBeforeUpdate = profileRepository.findAll().size();

        // Update the profile
        Profile updatedProfile = profileRepository.findById(profile.getId()).get();
        // Disconnect from session so that the updates on updatedProfile are not directly saved in db
        em.detach(updatedProfile);
        updatedProfile
            .birthday(UPDATED_BIRTHDAY)
            .genre(UPDATED_GENRE);

        restProfileMockMvc.perform(put("/api/profiles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProfile)))
            .andExpect(status().isOk());

        // Validate the Profile in the database
        List<Profile> profileList = profileRepository.findAll();
        assertThat(profileList).hasSize(databaseSizeBeforeUpdate);
        Profile testProfile = profileList.get(profileList.size() - 1);
        assertThat(testProfile.getBirthday()).isEqualTo(UPDATED_BIRTHDAY);
        assertThat(testProfile.getGenre()).isEqualTo(UPDATED_GENRE);

        // Validate the Profile in Elasticsearch
        verify(mockProfileSearchRepository, times(1)).save(testProfile);
    }

    @Test
    @Transactional
    public void updateNonExistingProfile() throws Exception {
        int databaseSizeBeforeUpdate = profileRepository.findAll().size();

        // Create the Profile

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProfileMockMvc.perform(put("/api/profiles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profile)))
            .andExpect(status().isBadRequest());

        // Validate the Profile in the database
        List<Profile> profileList = profileRepository.findAll();
        assertThat(profileList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Profile in Elasticsearch
        verify(mockProfileSearchRepository, times(0)).save(profile);
    }

    @Test
    @Transactional
    public void deleteProfile() throws Exception {
        // Initialize the database
        profileService.save(profile);

        int databaseSizeBeforeDelete = profileRepository.findAll().size();

        // Delete the profile
        restProfileMockMvc.perform(delete("/api/profiles/{id}", profile.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Profile> profileList = profileRepository.findAll();
        assertThat(profileList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Profile in Elasticsearch
        verify(mockProfileSearchRepository, times(1)).deleteById(profile.getId());
    }

    @Test
    @Transactional
    public void searchProfile() throws Exception {
        // Initialize the database
        profileService.save(profile);
        when(mockProfileSearchRepository.search(queryStringQuery("id:" + profile.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(profile), PageRequest.of(0, 1), 1));
        // Search the profile
        restProfileMockMvc.perform(get("/api/_search/profiles?query=id:" + profile.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(profile.getId().intValue())))
            .andExpect(jsonPath("$.[*].birthday").value(hasItem(DEFAULT_BIRTHDAY.toString())))
            .andExpect(jsonPath("$.[*].genre").value(hasItem(DEFAULT_GENRE.toString())));
    }
}
