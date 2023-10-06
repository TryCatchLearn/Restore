import BasketSummary from '../basket/BasketSummary';
import BasketTable from '../basket/BasketTable';
import { useAppSelector } from '../../app/store/configureStore';
import { Typography, Grid } from '@mui/material';

export default function Review() {
  const { basket } = useAppSelector(state => state.basket);
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      {basket &&
        <BasketTable items={basket.items} isBasket={false} />}
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
        </Grid>
      </Grid>
    </>
  );
}