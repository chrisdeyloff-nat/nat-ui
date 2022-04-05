import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NumberInput from 'components/input/NumberInput';
import clsx from 'clsx';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import SilverDollarImage from 'images/silverdollar.jpeg';
import HalfDollarImage from 'images/halfdollar.jpeg';
import QuarterImage from 'images/quarter.jpeg';
import DimeImage from 'images/dime.jpeg';
import NickelImage from 'images/nickel.jpeg';
import PennyImage from 'images/penny.jpeg';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  maxWidth: {
    maxWidth: '500px',
    width: '500px',
  },
  columnContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  toolSpace: {
    marginBottom: theme.spacing(4),
  },
  coinRow: {
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1)
  },
  displayCell: {
    marginRight: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
  },
  imageCell: {
    flexGrow: 1
  },
  valueCell: {
    display: 'flex',
    alignItems: 'end',
  }
}));

const CoinRow = (props) => {
  const classes = useStyles();
  const { coinType, amount } = props;
  const coinTypeImages = {
    silver: { image: SilverDollarImage, display: "S" },
    half: { image: HalfDollarImage, display: "H" },
    quarter: { image: QuarterImage, display: "Q" },
    dime: { image: DimeImage, display: "D" },
    nickel: { image: NickelImage, display: "N" },
    penny: { image: PennyImage, display: "P" },
  };

  const coinTypeImage = coinTypeImages[coinType];

  return (
    <Paper className={clsx(classes.rowContainer, classes.coinRow)}>
      <div className={classes.displayCell}>{coinTypeImage.display}</div>
      <div className={classes.imageCell} ><img src={coinTypeImage.image} alt={coinType} width="32" height="32" /></div>
      <div className={classes.valueCell}>{amount.toString()}</div>
    </Paper>
  );
};

CoinRow.propTypes = {
  coinType: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};

const Item = (props) => {
  const classes = useStyles();
  const [amount, setAmount] = useState('');

  return (
    <>
      <div className={clsx(classes.columnContainer, classes.maxWidth)}>
        <div className={clsx(classes.rowContainer, classes.spaceBetween, classes.toolSpace)}>
          <div>
            <NumberInput
              value={amount}
              setValue={setAmount}
              prefix="$"
              label="Amount"
            />
          </div>
          <div>
            <Button color="primary">Save</Button>
          </div>
        </div>
        <div className={classes.columnContainer}>
          <CoinRow coinType="silver" amount={10} />
          <CoinRow coinType="half" amount={10} />
          <CoinRow coinType="quarter" amount={10} />
          <CoinRow coinType="dime" amount={10} />
          <CoinRow coinType="nickel" amount={10} />
          <CoinRow coinType="penny" amount={10} />
        </div>
      </div>
    </>
  );
};

export default Item;