# Requirements Document

## Introduction

The Slot Game Builder is a comprehensive self-service platform that enables casino owners to create, preview, and publish HTML5 slot games without writing code. The platform provides a complete end-to-end solution including user authentication, subscription management, a visual game builder interface, asset management, game preview capabilities, production runtime APIs, and analytics reporting. The system serves three primary personas: casino owners who need fresh content quickly, casino players who want smooth gameplay across devices, and platform administrators who maintain service quality and prevent abuse.

## Requirements

### Requirement 1

**User Story:** As a casino owner, I want to register and authenticate with the platform, so that I can securely access the game builder tools.

#### Acceptance Criteria

1. WHEN a casino owner provides email and password THEN the system SHALL create a new user account and return a JWT token
2. WHEN a registered user provides valid credentials THEN the system SHALL authenticate them and return a JWT token
3. WHEN a user attempts to access builder features without an active subscription THEN the system SHALL block access
4. WHEN a JWT token expires after 1 hour THEN the system SHALL require re-authentication

### Requirement 2

**User Story:** As a casino owner, I want to subscribe to the platform, so that I can access the game building features.

#### Acceptance Criteria

1. WHEN a user initiates subscription THEN the system SHALL create a Stripe checkout session
2. WHEN subscription status is not "active" THEN the system SHALL block access to builder features
3. WHEN subscription renewal is due THEN the system SHALL process payment through Stripe
4. WHEN subscription fails THEN the system SHALL notify the user and restrict access

### Requirement 3

**User Story:** As a casino owner, I want to create slot games using a visual builder interface, so that I can produce games without coding knowledge.

#### Acceptance Criteria

1. WHEN creating a new game THEN the system SHALL provide form fields for title, description, cover image, rows (≤5), and columns (≤5)
2. WHEN configuring game sounds THEN the system SHALL accept files for spin, click, win, lose, and background music
3. WHEN enabling mascot feature THEN the system SHALL accept mascot files for start, spin, lose, win, and idle states
4. WHEN defining slot items THEN the system SHALL accept up to 10 items with name, image, probability (0-1), revenue, minimum count, and diagonal prize settings
5. WHEN configuring regions THEN the system SHALL accept country, currency, minimum bet, maximum bet, and step values
6. WHEN setting up languages THEN the system SHALL accept locale and translation key-value pairs
7. WHEN blocking regions THEN the system SHALL accept country codes for restricted access

### Requirement 4

**User Story:** As a casino owner, I want to upload and manage game assets, so that I can customize the visual and audio elements of my games.

#### Acceptance Criteria

1. WHEN uploading an asset THEN the system SHALL provide a presigned S3 upload URL
2. WHEN an asset is uploaded THEN the system SHALL store it in S3 with public-read access via CloudFront
3. WHEN file size exceeds limits THEN the system SHALL reject the upload
4. WHEN uploading files THEN the system SHALL perform virus scanning for security

### Requirement 5

**User Story:** As a casino owner, I want to preview my games before publishing, so that I can test functionality and appearance.

#### Acceptance Criteria

1. WHEN requesting game preview THEN the system SHALL return a temporary session ID with 2-hour expiration
2. WHEN opening preview THEN the system SHALL display the game in a modal with mobile and desktop view toggles
3. WHEN preview session expires THEN the system SHALL deny further access to the preview

### Requirement 6

**User Story:** As a casino owner, I want to save and manage my created games, so that I can publish them on my casino site.

#### Acceptance Criteria

1. WHEN saving a game THEN the system SHALL store game data, assets, and return a unique game ID
2. WHEN listing games THEN the system SHALL provide API access to retrieve all user's games
3. WHEN game configuration changes THEN the system SHALL update cached data with 1-hour TTL

### Requirement 7

**User Story:** As a casino owner, I want to integrate games into my casino site, so that players can access and play the games.

#### Acceptance Criteria

1. WHEN creating a production session THEN the system SHALL accept token, game ID, and user details and return session ID and iframe URL
2. WHEN embedding iframe THEN the casino site SHALL be able to display the game seamlessly
3. WHEN session is requested THEN the system SHALL return cached game configuration from Redis

### Requirement 8

**User Story:** As a casino player, I want to play slot games smoothly on desktop and mobile, so that I have an enjoyable gaming experience.

#### Acceptance Criteria

1. WHEN spinning the reels THEN the system SHALL process the bet, check balance via webhook, and return results within 200ms
2. WHEN balance check fails THEN the system SHALL reject the spin request
3. WHEN RNG determines outcome THEN the system SHALL calculate winnings based on item probabilities and return view matrix, bet amount, win status, win amount, and winning lines
4. WHEN spin completes THEN the system SHALL store spin data in PostgreSQL and push summary to Redis Stream

### Requirement 9

**User Story:** As a casino owner, I want to view detailed analytics and reports, so that I can track game performance and revenue.

#### Acceptance Criteria

1. WHEN accessing dashboard THEN the system SHALL provide filters for date range, country, and currency
2. WHEN viewing metrics THEN the system SHALL display total bets, total wins, net revenue, RTP, and spin counts
3. WHEN hourly aggregation runs THEN the system SHALL process data and save daily snapshots to PostgreSQL
4. WHEN requesting metrics API THEN the system SHALL return filtered analytics data for specified date ranges

### Requirement 10

**User Story:** As a platform administrator, I want to monitor system performance and prevent abuse, so that I can maintain service quality and security.

#### Acceptance Criteria

1. WHEN API requests are made THEN the system SHALL enforce rate limits to prevent abuse
2. WHEN monitoring performance THEN 95th percentile API response time SHALL be under 150ms for cached requests
3. WHEN system handles concurrent load THEN it SHALL support 10,000 concurrent players
4. WHEN security threats are detected THEN the system SHALL enforce HTTPS-only access and JWT validation

### Requirement 11

**User Story:** As a data subject, I want my personal data to be handled according to GDPR requirements, so that my privacy rights are protected.

#### Acceptance Criteria

1. WHEN a data deletion request is made THEN the system SHALL delete personal data within 30 days
2. WHEN processing personal data THEN the system SHALL comply with GDPR requirements
3. WHEN storing user data THEN the system SHALL implement appropriate data protection measures