# for testing purposes
drop table if exists FEATURE, CATEGORY, LICENSE, PLATFORM, TAG, WEBSITE;

#region create basic tables

# create feature table
create table if not exists  FEATURE (
    FEATURE_ID SMALLINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    NAME VARCHAR(100) NOT NULL
);

# create platform table
create table if not exists  PLATFORM (
    PLATFORM_ID SMALLINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    NAME VARCHAR(100) NOT NULL
);

# create category table
create table if not exists  CATEGORY (
    CATEGORY_ID SMALLINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    NAME VARCHAR(100) NOT NULL
);

# create tag table
create table if not exists  TAG (
    TAG_ID SMALLINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    NAME VARCHAR(100) NOT NULL
);

# create license table
create table if not exists  LICENSE (
    LICENSE_ID SMALLINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    NAME VARCHAR(100) NOT NULL
);

# create website table
create table if not exists WEBSITE (
    WEBSITE_ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    NAME VARCHAR(100) NOT NULL,
    DESCRIPTION TEXT NULL,
    NO_OF_REVIEWS SMALLINT NULL,
    NO_OF_ALTERNATIVES INT NULL,
    NO_OF_COMMENTS INT NULL,
    LIKES SMALLINT NULL,
    OVERVIEW TEXT NULL,
    LICENSE_ID SMALLINT NULL,
    PLATFORM_ID SMALLINT NULL,
    OFFICIAL_WEBSITE VARCHAR(100) NULL,
    FEATURE_ID SMALLINT NULL,
    CATEGORY_ID SMALLINT NULL,
    TAG_ID SMALLINT NULL,
    RATING TINYINT NULL
);

#endregion

#region  create tables for many to many relationships

# website-category
create table if not exists WEBSITE_CATEGORY (
    WEBSITE_ID INT NOT NULL,
    CATEGORY_ID SMALLINT NOT NULL,
    PRIMARY KEY(WEBSITE_ID, CATEGORY_ID)
);

alter table WEBSITE_CATEGORY
add constraint FK_WEBSITE_CATEGORY_WEB foreign key (WEBSITE_ID) references WEBSITE(WEBSITE_ID),
add constraint FK_WEBSITE_CATEGORY_CAT foreign key (CATEGORY_ID) references CATEGORY(CATEGORY_ID);

# website-feature
create table if not exists WEBSITE_FEATURE (
    WEBSITE_ID INT NOT NULL,
    FEATURE_ID SMALLINT NOT NULL,
    PRIMARY KEY(WEBSITE_ID, FEATURE_ID)
);

alter table WEBSITE_FEATURE
add constraint FK_WEBSITE_FEATURE_WEB foreign key (WEBSITE_ID) references WEBSITE(WEBSITE_ID),
add constraint FK_WEBSITE_FEATURE_FEA foreign key (FEATURE_ID) references FEATURE(FEATURE_ID);

# website-license
create table if not exists WEBSITE_LICENSE (
    WEBSITE_ID INT NOT NULL,
    LICENSE_ID SMALLINT NOT NULL,
    PRIMARY KEY(WEBSITE_ID, LICENSE_ID)
);

alter table WEBSITE_LICENSE
add constraint FK_WEBSITE_LICENSE_WEB foreign key (WEBSITE_ID) references WEBSITE(WEBSITE_ID),
add constraint FK_WEBSITE_LICENSE_LIC foreign key (LICENSE_ID) references LICENSE(LICENSE_ID);

# website-platform
create table if not exists WEBSITE_PLATFORM (
    WEBSITE_ID INT NOT NULL,
    PLATFORM_ID SMALLINT NOT NULL,
    PRIMARY KEY(WEBSITE_ID, PLATFORM_ID)
);

alter table WEBSITE_PLATFORM
add constraint FK_WEBSITE_PLATFORM_WEB foreign key (WEBSITE_ID) references WEBSITE(WEBSITE_ID),
add constraint FK_WEBSITE_PLATFORM_PLA foreign key (PLATFORM_ID) references PLATFORM(PLATFORM_ID);

# website-tag
create table if not exists WEBSITE_TAG (
    WEBSITE_ID INT NOT NULL,
    TAG_ID SMALLINT NOT NULL,
    PRIMARY KEY(WEBSITE_ID, TAG_ID)
);

alter table WEBSITE_TAG
add constraint FK_WEBSITE_TAG_WEB foreign key (WEBSITE_ID) references WEBSITE(WEBSITE_ID),
add constraint FK_WEBSITE_TAG_TAG foreign key (TAG_ID) references TAG(TAG_ID);

#endregion