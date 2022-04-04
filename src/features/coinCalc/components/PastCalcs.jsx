import React from 'react';
import NatTable from '../../../components/table/NatTable';
import { useHistory } from "react-router-dom";

const PastCalcs = (props) => {
  const history = useHistory();

  const columns = [
    { id: 'amount', label: 'Dollar Amount', renderer: (row) => row.amount.toString() },
    { id: 'updated', label: 'Date', renderer: (row) => row.updated.toString() },
    { id: 'breakdown', label: 'Breakdown', renderer: (row) => row.breakdown.toString() },
  ];

  const createData = (id, amount, updated, breakdown) => {
    return { id, amount, updated, breakdown };
  };

  const rows = [
    createData(1, '$12.22', new Date("3/1/2022"), "S:12,D:1"),
    createData(2, '$12.22', new Date("3/2/2022"), "S:12,D:1"),
    createData(3, '$12.22', new Date("3/3/2022"), "S:12,D:1"),
  ];

  const addAction = () => {
    history.push('/new');
  };

  const editAction = (row) => {
    history.push(`/edit/${row.id}`);
  };

  return (
    <>
      <NatTable
        columns={columns}
        rows={rows}
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