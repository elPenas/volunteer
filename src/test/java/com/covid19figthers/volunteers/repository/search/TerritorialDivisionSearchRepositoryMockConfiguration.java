package com.covid19figthers.volunteers.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link TerritorialDivisionSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class TerritorialDivisionSearchRepositoryMockConfiguration {

    @MockBean
    private TerritorialDivisionSearchRepository mockTerritorialDivisionSearchRepository;

}
