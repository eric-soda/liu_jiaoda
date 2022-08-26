import { useSelector, useDispatch, useLocation } from 'umi';
import { Input, Button } from 'antd';

const Index = () => {
  const title = useSelector((state: any) => state.index.title);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleChange = (e: any) => {
    dispatch({ type: 'index/changeTitle2', title: e.target.value });
  };

  const changeMenu = () => {
    dispatch({ type: 'index/changeMenu', pathname: location.pathname });
  };

  return (
    <div>
      <div>{title}</div>
      <Input type="text" value={title} onChange={handleChange} />
      <Button onClick={changeMenu}>change</Button>
    </div>
  );
};

export default Index;
