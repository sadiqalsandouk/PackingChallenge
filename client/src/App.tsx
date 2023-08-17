import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  font-size: 40px;
`;

const GymsharkTitle = styled.h1`
font-size: 40px;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  width: 100%;
  max-width: 300px;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 10px;
`;

const PackResults = styled.p`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: white;
  font-size: 50px;
  border: #ccc 1px solid;
  box-shadow: 0 0 0 2px #eee, 0 0 0 3px #ccc;
  border-radius: 10px;

`;

const PackText = styled.h2`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: white;
  font-size: 25px;
`;

function App() {
  const [items, setItems] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const calculatePacks = async () => {
    try {
      const itemsNumber = parseInt(items);

      if (isNaN(itemsNumber) || itemsNumber <= 0) {
        setResult('Invalid input! Must a number greater than 0');
        return;
      }

      const response = await axios.get(`https://packingchallenge-production.up.railway.app/calculatePacks/${itemsNumber}`);
      setResult(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container>
      <GymsharkTitle>Gymshark🦈</GymsharkTitle>
      <Title>Pack Calculator</Title>
      <Input
        value={items}
        onChange={(e) => setItems(e.target.value)}
        placeholder="Enter the number of items"
      />
      <Button onClick={calculatePacks}>Calculate</Button>
      <div>
        <PackText>Correct number of packs :</PackText>
        <PackResults>{result}</PackResults>
      </div>
    </Container>
  );
}

export default App;
