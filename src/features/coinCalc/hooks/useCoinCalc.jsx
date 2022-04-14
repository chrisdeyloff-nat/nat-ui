import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { itemsSelector, currentItemSelector, coinCalcApiThunks, actions } from '../coin-calc.slice'
import useCrudRequestHandler from "core/useCrudRequestHandler";

const useCoinCalc = () => {
  const dispatch = useDispatch();

  const items = useSelector(itemsSelector);
  const currentItem = useSelector(currentItemSelector);

  const editHelper = useCrudRequestHandler({
      thunkMethod: coinCalcApiThunks.edit,
      onSuccessMessage: "Amount edited successfully.",
      onValidationFailed: "Amount failed validation.",
    });

  const createHelper = useCrudRequestHandler({
    thunkMethod: coinCalcApiThunks.create,
    onSuccessMessage: "Amount created successfully.",
    onValidationFailed: "Amount failed validation.",
  });

  const getByIdHelper = useCrudRequestHandler({
    thunkMethod: coinCalcApiThunks.getById,
  });

  const getListHelper = useCrudRequestHandler({
    thunkMethod: coinCalcApiThunks.getList,
  });
  
  // const waitingResponse = useSelector(waitingResponseSelector);
  
  const getItem = (id) => {
    if (!!id) {
      getByIdHelper(id);
    }
  };

  const saveHandler = (item) => {
    if (!!item){
      if (!!item.id) {
        editHelper({id: item.id, amount: item.value});
      } else {
        createHelper(item.value);
      }
    }
  };

  useEffect(() => {
    if (!!!items) {
      getListHelper();
    }
  }, [items, getListHelper]);


  const setCurrent = async (item) => {
    await dispatch(actions.setCurrent(item));
  };

  return [
    getItem,
    currentItem,
    items,
    setCurrent,
    saveHandler,
    // waitingResponse
  ];
};

export default useCoinCalc;