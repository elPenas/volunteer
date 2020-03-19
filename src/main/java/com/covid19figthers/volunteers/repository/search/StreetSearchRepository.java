package com.covid19figthers.volunteers.repository.search;

import com.covid19figthers.volunteers.domain.Street;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Street entity.
 */
public interface StreetSearchRepository extends ElasticsearchRepository<Street, Long> {
}
