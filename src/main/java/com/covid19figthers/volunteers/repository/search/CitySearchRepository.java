package com.covid19figthers.volunteers.repository.search;

import com.covid19figthers.volunteers.domain.City;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link City} entity.
 */
public interface CitySearchRepository extends ElasticsearchRepository<City, Long> {
}
