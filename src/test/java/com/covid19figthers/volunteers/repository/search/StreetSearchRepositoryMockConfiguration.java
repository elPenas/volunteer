package com.covid19figthers.volunteers.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link StreetSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class StreetSearchRepositoryMockConfiguration {

    @MockBean
    private StreetSearchRepository mockStreetSearchRepository;

}
