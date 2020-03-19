package com.covid19figthers.volunteers.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.covid19figthers.volunteers.web.rest.TestUtil;

public class TerritorialDivisionTest {

    @Test
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
