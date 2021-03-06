package com.covid19figthers.volunteers.security;

/**
 * Constants for Spring Security authorities.
 */
public final class AuthoritiesConstants {

    public static final String ADMIN = "ROLE_ADMIN";

    public static final String USER = "ROLE_USER";

    public static final String VOLUNTEER = "ROLE_VOLUNTEER";

    public static final String ANONYMOUS = "ROLE_ANONYMOUS";

    public static final String BENEFICIARY = "ROLE_BENEFICIARY";


    private AuthoritiesConstants() {
    }
}
