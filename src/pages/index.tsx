import type { NextPage } from "next";
import styled from "styled-components";
import teamData from "../data/team.json";
import { useState } from "react";
import { TeamMember } from "../types/team";
const Container = styled.div`
  background: #f0f0f0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Header = styled.header`
  background: #000033;
  color: white;
  padding: 1.5rem 1rem;
  text-align: center;
  border-bottom: 3px solid #ffd700;

  h1 {
    font-size: clamp(1.5rem, 5vw, 2.5rem);
    margin: 0;
    font-family: "Times New Roman", serif;
    letter-spacing: 2px;
  }

  p {
    color: #ffd700;
    font-style: italic;
    margin: 0.5rem 0 0;
    font-size: clamp(0.875rem, 3vw, 1rem);
  }
`;

const GridSection = styled.section<{ isPanelOpen: boolean }>`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;

  @media (max-width: 768px) {
    display: ${(props) => (props.isPanelOpen ? "none" : "block")};
    padding: 1rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const WantedPoster = styled.div<{ isSelected: boolean }>`
  background: #fff;
  border: 2px solid ${(props) => (props.isSelected ? "#ff0000" : "#000")};
  padding: 1rem;
  position: relative;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }

  &::before {
    content: "ΚΑΤΑΖΗΤΕΙΤΑΙ";
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    background: #ff0000;
    color: white;
    padding: 0.25rem 1rem;
    font-weight: bold;ma
    font-family: "Times New Roman", serif;
  }
`;

const MemberImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border: 1px solid #000;
  margin-bottom: 1rem;
`;

const SidePanel = styled.aside<{ isOpen: boolean }>`
  width: ${(props) => (props.isOpen ? "400px" : "0")};
  background: white;
  border-left: 3px solid #000033;
  overflow-y: auto;
  transition: all 0.3s ease;
  padding: ${(props) => (props.isOpen ? "2rem" : "0")};

  @media (max-width: 768px) {
    width: 100%;
    height: ${(props) => (props.isOpen ? "100%" : "0")};
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    border-left: none;
    padding: ${(props) => (props.isOpen ? "1rem" : "0")};
  }
`;

const DetailSection = styled.div`
  margin-bottom: 1.5rem;
`;

const Status = styled.span<{ status: string }>`
  background: #ff0000;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  display: inline-block;
  margin: 0.5rem 0;
`;

const Reward = styled.div`
  font-size: 1.5rem;
  color: #006400;
  font-weight: bold;
  margin: 0.5rem 0;
  text-align: center;
  border: 1px dashed #006400;
  padding: 0.5rem;
`;

const Details = styled.ul`
  list-style-type: none;
  padding-left: 0;

  li {
    margin-bottom: 0.5rem;
    padding-left: 20px;
    position: relative;

    &::before {
      content: "•";
      position: absolute;
      left: 0;
    }
  }
`;

const Warning = styled.div`
  background: #fff3cd;
  border: 1px solid #ffeeba;
  color: #856404;
  padding: 0.5rem;
  margin-top: 1rem;
  font-style: italic;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #000033;
  z-index: 1001;

  &:hover {
    color: #ff0000;
  }

  @media (max-width: 768px) {
    top: 0.5rem;
    right: 0.5rem;
  }
`;

const BackButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 1rem;
    left: 1rem;
    background: #000033;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    z-index: 1001;

    &:hover {
      background: #000066;
    }
  }
`;

const MobileDetailImage = styled(MemberImage)`
  @media (max-width: 768px) {
    height: 250px;
  }
`;

const Home: NextPage = () => {
  const [selectedCriminal, setSelectedCriminal] = useState<TeamMember | null>(
    null
  );

  return (
    <Container>
      <Header>
        <h1>{teamData.pageTitle}</h1>
        <p>{teamData.description}</p>
      </Header>

      <MainContent>
        <GridSection isPanelOpen={!!selectedCriminal}>
          <Grid>
            {teamData.team
              .slice(0, 8)
              .sort((a, b) =>
                a.name.split(" ")[1].localeCompare(b.name.split(" ")[1])
              )
              .map((criminal) => (
                <WantedPoster
                  key={criminal.id}
                  isSelected={selectedCriminal?.id === criminal.id}
                  onClick={() =>
                    setSelectedCriminal(
                      selectedCriminal?.id === criminal.id ? null : criminal
                    )
                  }
                >
                  <MemberImage src={criminal.imageUrl} alt={criminal.name} />
                  <h2>{criminal.name}</h2>
                  <p>
                    <em>γνωστός ως "{criminal.alias}"</em>
                  </p>
                  <Status status={criminal.status}>{criminal.status}</Status>
                  <p>
                    <strong>Καταζητείται για:</strong>{" "}
                    {criminal.crime.map((crime) => crime).join(", ")}
                  </p>
                </WantedPoster>
              ))}
          </Grid>
        </GridSection>

        <SidePanel isOpen={!!selectedCriminal}>
          {selectedCriminal && (
            <>
              <BackButton onClick={() => setSelectedCriminal(null)}>
                ← Πίσω στη λίστα
              </BackButton>
              {/* <CloseButton onClick={() => setSelectedCriminal(null)}>
                ×
              </CloseButton> */}
              <DetailSection>
                <MobileDetailImage
                  style={{
                    height: "300px",
                  }}
                  src={selectedCriminal.imageUrl}
                  alt={selectedCriminal.name}
                />
                <h2>{selectedCriminal.name}</h2>
                <p>
                  <em>γνωστός ως "{selectedCriminal.alias}"</em>
                </p>
              </DetailSection>

              <DetailSection>
                <Status status={selectedCriminal.status}>
                  {selectedCriminal.status}
                </Status>
                <Reward>Αμοιβή: {selectedCriminal.reward}</Reward>
              </DetailSection>

              <DetailSection>
                <h3>Καταζητείται για:</h3>
                <ul>
                  {selectedCriminal.crime.map((crime, index) => (
                    <li key={index}>
                      <strong>{crime}</strong>
                    </li>
                  ))}
                </ul>
              </DetailSection>

              <DetailSection>
                <h3>Στοιχεία Εγκληματία:</h3>
                <Details>
                  {selectedCriminal.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </Details>
              </DetailSection>

              <DetailSection>
                <p>
                  <strong>Τελευταία Εμφάνιση:</strong>{" "}
                  {selectedCriminal.lastSeen}
                </p>
              </DetailSection>

              <Warning>⚠️ ΠΡΟΕΙΔΟΠΟΙΗΣΗ: {selectedCriminal.warning}</Warning>
            </>
          )}
        </SidePanel>
      </MainContent>
    </Container>
  );
};

export default Home;
