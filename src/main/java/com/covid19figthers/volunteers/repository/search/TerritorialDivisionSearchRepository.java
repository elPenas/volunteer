package com.covid19figthers.volunteers.repository.search;

import com.covid19figthers.volunteers.domain.TerritorialDivision;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TerritorialDivision entity.
 */
public interface TerritorialDivisionSearchRepository extends ElasticsearchRepository<TerritorialDivision, Long> {
}
