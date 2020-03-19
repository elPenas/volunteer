package com.covid19figthers.volunteers.service.dto;

import java.io.Serializable;
import java.util.Objects;
import io.github.jhipster.service.Criteria;
import com.covid19figthers.volunteers.domain.enumeration.Genre;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;
import io.github.jhipster.service.filter.LocalDateFilter;

/**
 * Criteria class for the {@link com.covid19figthers.volunteers.domain.Profile} entity. This class is used
 * in {@link com.covid19figthers.volunteers.web.rest.ProfileResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /profiles?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class ProfileCriteria implements Serializable, Criteria {
    /**
     * Class for filtering Genre
     */
    public static class GenreFilter extends Filter<Genre> {

        public GenreFilter() {
        }

        public GenreFilter(GenreFilter filter) {
            super(filter);
        }

        @Override
        public GenreFilter copy() {
            return new GenreFilter(this);
        }

    }

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private LocalDateFilter birthday;

    private GenreFilter genre;

    private LongFilter addressId;

    private LongFilter userId;

    public ProfileCriteria() {
    }

    public ProfileCriteria(ProfileCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.birthday = other.birthday == null ? null : other.birthday.copy();
        this.genre = other.genre == null ? null : other.genre.copy();
        this.addressId = other.addressId == null ? null : other.addressId.copy();
        this.userId = other.userId == null ? null : other.userId.copy();
    }

    @Override
    public ProfileCriteria copy() {
        return new ProfileCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public LocalDateFilter getBirthday() {
        return birthday;
    }

    public void setBirthday(LocalDateFilter birthday) {
        this.birthday = birthday;
    }

    public GenreFilter getGenre() {
        return genre;
    }

    public void setGenre(GenreFilter genre) {
        this.genre = genre;
    }

    public LongFilter getAddressId() {
        return addressId;
    }

    public void setAddressId(LongFilter addressId) {
        this.addressId = addressId;
    }

    public LongFilter getUserId() {
        return userId;
    }

    public void setUserId(LongFilter userId) {
        this.userId = userId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final ProfileCriteria that = (ProfileCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(birthday, that.birthday) &&
            Objects.equals(genre, that.genre) &&
            Objects.equals(addressId, that.addressId) &&
            Objects.equals(userId, that.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        birthday,
        genre,
        addressId,
        userId
        );
    }

    @Override
    public String toString() {
        return "ProfileCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (birthday != null ? "birthday=" + birthday + ", " : "") +
                (genre != null ? "genre=" + genre + ", " : "") +
                (addressId != null ? "addressId=" + addressId + ", " : "") +
                (userId != null ? "userId=" + userId + ", " : "") +
            "}";
    }

}
