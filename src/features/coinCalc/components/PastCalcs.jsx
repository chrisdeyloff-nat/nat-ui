import React from 'react';
import NatTable from '../../../components/table/NatTable';
import { useHistory } from 'react-router-dom';
import useCoinCalc from '../hooks/useCoinCalc';

const PastCalcs = (props) => {
  const history = useHistory();

  const [
    ,
    ,
    items,
    setCurrent,
    ,
  ] = useCoinCalc();

  const columns = [
    { id: 'amount', label: 'Dollar Amount', renderer: (row) => row.amount.toString() },
    { id: 'updated', label: 'Date', renderer: (row) => row.updated.toString() },
    { id: 'breakdown', label: 'Breakdown', renderer: (row) => row.breakdown.toString() },
  ];

  const valueBreakdown = (amount) => {
    let values = [];
    if (amount.silverDollarValue > 0) { values.push(`S:${amount.silverDollarValue}`); }
    if (amount.halfDollarValue > 0) { values.push(`H:${amount.halfDollarValue}`); }
    if (amount.quarterValue > 0) { values.push(`Q:${amount.quarterValue}`); }
    if (amount.dimeValue > 0) { values.push(`D:${amount.dimeValue}`); }
    if (amount.nickelValue > 0) { values.push(`N:${amount.nickelValue}`); }
    if (amount.pennyValue > 0) { values.push(`P:${amount.pennyValue}`); }
    const result = values.join(', ');
    return result;
  };


  // const createData = (id, amount, updated, breakdown) => {
  //   return { id, amount, updated, breakdown };
  // };

  // const rows = [
  //   createData(1, '$12.22', new Date("3/1/2022"), "S:12,D:1"),
  //   createData(2, '$12.22', new Date("3/2/2022"), "S:12,D:1"),
  //   createData(3, '$12.22', new Date("3/3/2022"), "S:12,D:1"),
  // ];

  const addAction = () => {
    setCurrent(undefined);
    history.push('/new');
  };

  const editAction = (row) => {
    setCurrent(undefined);
    history.push(`/edit/${row.id}`);
  };

  return (
    <>
      <NatTable
        columns={columns}
        rows={(!!items) ?
          items.map(i => {
          return {
            id: i.id,
            amount: i.value,
            updated: i.updated,
            breakdown: valueBreakdown(i)
          };
        }) :
        undefined}
        addAction={addAction}
        editAction={editAction}
        orderDir="desc"
        orderByProp="updated"
        title="Amount"
      />
    </>
  );
};

export default PastCalcs;