package com.covid19figthers.volunteers.repository;

import com.covid19figthers.volunteers.domain.Street;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Street entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StreetRepository extends JpaRepository<Street, Long> {
}
