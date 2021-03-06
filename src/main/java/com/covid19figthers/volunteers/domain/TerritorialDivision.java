package com.covid19figthers.volunteers.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

import com.covid19figthers.volunteers.domain.enumeration.TerritorialDivisionType;

/**
 * A TerritorialDivision.
 */
@Entity
@Table(name = "territorial_division")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "territorialdivision")
public class TerritorialDivision implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private TerritorialDivisionType type;

    @OneToMany(mappedBy = "territorialDivision")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<City> cities = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("territorialDivisions")
    private Country country;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public TerritorialDivision name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public TerritorialDivisionType getType() {
        return type;
    }

    public TerritorialDivision type(TerritorialDivisionType type) {
        this.type = type;
        return this;
    }

    public void setType(TerritorialDivisionType type) {
        this.type = type;
    }

    public Set<City> getCities() {
        return cities;
    }

    public TerritorialDivision cities(Set<City> cities) {
        this.cities = cities;
        return this;
    }

    public TerritorialDivision addCity(City city) {
        this.cities.add(city);
        city.setTerritorialDivision(this);
        return this;
    }

    public TerritorialDivision removeCity(City city) {
        this.cities.remove(city);
        city.setTerritorialDivision(null);
        return this;
    }

    public void setCities(Set<City> cities) {
        this.cities = cities;
    }

    public Country getCountry() {
        return country;
    }

    public TerritorialDivision country(Country country) {
        this.country = country;
        return this;
    }

    public void setCountry(Country country) {
        this.country = country;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TerritorialDivision)) {
            return false;
        }
        return id != null && id.equals(((TerritorialDivision) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TerritorialDivision{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
