package com.covid19figthers.volunteers.service;

import java.util.List;

import javax.persistence.criteria.JoinType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.service.QueryService;

import com.covid19figthers.volunteers.domain.Profile;
import com.covid19figthers.volunteers.domain.*; // for static metamodels
import com.covid19figthers.volunteers.repository.ProfileRepository;
import com.covid19figthers.volunteers.repository.search.ProfileSearchRepository;
import com.covid19figthers.volunteers.service.dto.ProfileCriteria;

/**
 * Service for executing complex queries for {@link Profile} entities in the database.
 * The main input is a {@link ProfileCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Profile} or a {@link Page} of {@link Profile} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class ProfileQueryService extends QueryService<Profile> {

    private final Logger log = LoggerFactory.getLogger(ProfileQueryService.class);

    private final ProfileRepository profileRepository;

    private final ProfileSearchRepository profileSearchRepository;

    public ProfileQueryService(ProfileRepository profileRepository, ProfileSearchRepository profileSearchRepository) {
        this.profileRepository = profileRepository;
        this.profileSearchRepository = profileSearchRepository;
    }

    /**
     * Return a {@link List} of {@link Profile} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Profile> findByCriteria(ProfileCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Profile> specification = createSpecification(criteria);
        return profileRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Profile} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Profile> findByCriteria(ProfileCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Profile> specification = createSpecification(criteria);
        return profileRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(ProfileCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Profile> specification = createSpecification(criteria);
        return profileRepository.count(specification);
    }

    /**
     * Function to convert {@link ProfileCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Profile> createSpecification(ProfileCriteria criteria) {
        Specification<Profile> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), Profile_.id));
            }
            if (criteria.getBirthday() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getBirthday(), Profile_.birthday));
            }
            if (criteria.getGenre() != null) {
                specification = specification.and(buildSpecification(criteria.getGenre(), Profile_.genre));
            }
            if (criteria.getAddressId() != null) {
                specification = specification.and(buildSpecification(criteria.getAddressId(),
                    root -> root.join(Profile_.address, JoinType.LEFT).get(Address_.id)));
            }
            if (criteria.getUserId() != null) {
                specification = specification.and(buildSpecification(criteria.getUserId(),
                    root -> root.join(Profile_.user, JoinType.LEFT).get(User_.id)));
            }
        }
        return specification;
    }
}
