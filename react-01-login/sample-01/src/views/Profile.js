import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";

import Highlight from "../components/Highlight";
import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { getConfig } from "../config";

export const ProfileComponent = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  
  // console.log(getAccessTokenSilently())
  // console.log(isAuthenticated)


  const config = getConfig();

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "dev-2kbtu8ze7ue4wfl4.us.auth0.com";
  
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            redirect_uri: window.location.origin,
            ...(config.audience ? { audience: config.audience } : null),
          },
        });

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
  
        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log(accessToken)
  
        const { user_metadata } = await metadataResponse.json();
  
        setUserMetadata(user_metadata);
      } catch (e) {
        console.log(e.message);
      }
    };
  
    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);



  return (
    <Container className="mb-5">
      <Row className="align-items-center profile-header mb-5 text-center text-md-left">
        <Col md={2}>
          <img
            src={user.picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </Col>
        <Col md>
          <h2>{user.name}</h2>
          <p className="lead text-muted">{user.email}</p>
        </Col>
      </Row>
      <Row>
        <Highlight>{JSON.stringify(user, null, 2)}</Highlight>
      </Row>
      {userMetadata ? (
          <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
        ) : (
          "No user metadata defined"
        )}
    </Container>
  );
};

export default withAuthenticationRequired(ProfileComponent, {
  onRedirecting: () => <Loading />,
});
