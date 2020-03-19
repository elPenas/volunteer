package com.covid19figthers.volunteers.repository;

import com.covid19figthers.volunteers.domain.TerritorialDivision;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the TerritorialDivision entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TerritorialDivisionRepository extends JpaRepository<TerritorialDivision, Long> {
}
