import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Typography, Container, Grid, Box } from '@mui/material';
import axios from 'axios';

export default function Detail() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(response => setPokemon(response.data))
      .catch(error => console.error(error));
  }, [name]);

  if (!pokemon) {
    return <Typography variant="h5" align="center" sx={{ mt: 10 }}>Loading Data...</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 5 }}>
      
      <Card variant="outlined" sx={{ p: { xs: 2, md: 5 }, borderRadius: 4, boxShadow: 2 }}>
        
        <Typography variant="h3" align="center" gutterBottom sx={{ textTransform: 'capitalize', fontWeight: 'bold', mb: 4 }}>
          {pokemon.name}
        </Typography>

        <Grid container spacing={4}>

          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              
              <Card variant="outlined" sx={{ p: 2, textAlign: 'center', borderRadius: 3 }}>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  Official Artwork
                </Typography>
                <img 
                  src={pokemon.sprites.other['official-artwork'].front_default} 
                  alt="Official Artwork" 
                  style={{ width: '100%', maxWidth: '200px', height: 'auto' }} 
                />
              </Card>

              <Card variant="outlined" sx={{ p: 2, textAlign: 'center', borderRadius: 3 }}>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  Sprite
                </Typography>
                <img 
                  src={pokemon.sprites.front_default} 
                  alt="Sprite" 
                  style={{ width: '120px', height: 'auto' }} 
                />
              </Card>

            </Box>
          </Grid>

          <Grid item xs={12} md={7}>
            <Card variant="outlined" sx={{ p: 4, height: '100%', borderRadius: 3, display: 'flex', flexDirection: 'column' }}>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>Pokedex ID: {pokemon.id}</Typography>
                <Typography variant="h6" sx={{ mb: 1 }}>Height: {pokemon.height}</Typography>
                <Typography variant="h6" sx={{ mb: 1 }}>Weight: {pokemon.weight}</Typography>
              </Box>
              
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Move:
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>

                  {pokemon.moves.slice(0, 3).map((moveObj, index) => (
                    <Card key={index} variant="outlined" sx={{ p: 1.5, borderRadius: 2, borderColor: '#ccc' }}>
                      <Typography variant="body1" align="center" sx={{ textTransform: 'capitalize' }}>
                        {moveObj.move.name}
                      </Typography>
                    </Card>
                  ))}
                </Box>
              </Box>

            </Card>
          </Grid>

        </Grid>
      </Card>
    </Container>
  );
}