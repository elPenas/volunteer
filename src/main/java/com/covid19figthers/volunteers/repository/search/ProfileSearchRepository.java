package com.covid19figthers.volunteers.repository.search;

import com.covid19figthers.volunteers.domain.Profile;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Profile} entity.
 */
public interface ProfileSearchRepository extends ElasticsearchRepository<Profile, Long> {
}
