import React from 'react';
import { useSelector } from 'react-redux';

// mui core
import CircularProgress from "@mui/material/CircularProgress";

// apis
import { getTodos } from 'apis/app.api';

function Dashboard() {
  const [todos, setTodos] = React.useState([]);
  const user = useSelector(state => state.app.user);
  // refs
  const progressRef = React.useRef(null);
  const pageRef = React.useRef(1);

  async function fetchTodos(_page) {
    const res = await getTodos(_page);
    const data = res?.data || [];
    setTodos(prevState => {
      return [...prevState, ...data]
    });
  };

  // inifinite scroll
  const handleLoadMore = React.useCallback(entries => {
    const entry = entries[0];
    if(!entry.isIntersecting) return;
    fetchTodos(pageRef.current);
    pageRef.current += 1;
  }, [])

  React.useEffect(() => {
    if(!progressRef.current) return;
    let observerRefValue = null;
    const options = {
      root: null,
      rootMargin: "400px",
      threshold: 1
    }
    const observer = new IntersectionObserver(handleLoadMore, options);
    observer.observe(progressRef.current);
    observerRefValue = progressRef.current;
    return () => {
      if(observerRefValue) {
        observer.unobserve(observerRefValue)
      }
    }
  }, [handleLoadMore])

  return (
    <div>
      <br />
      Email: {user?.email}
      <br />
      {todos.map(item => (
        <React.Fragment key={item.id}>
          <div className="card">
            <div className="card-header d-flex align-items-center">
              {item.id} <span className="badge badge-secondary status" style={{ display: 'inline-block', marginLeft: 5 }}>pending</span>
            </div>
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
            </div>
          </div>
          <br />
        </React.Fragment>
      ))}

      <CircularProgress ref={progressRef} />
    </div>
  )
}

export default Dashboard