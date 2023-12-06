import { useEffect, useState } from 'react';
import { categoryClickApi, viewPostApi } from '../../../Apis/postApi';
import { postState } from '../../../recoils/Recoil';
import { useRecoilState } from 'recoil';
import styled from '@emotion/styled';
function CategoryBtn() {
  const [clicked, setClicked] = useState('');
  const category = ['전체', 'Project', 'Study'];
  const [posts, setPosts] = useRecoilState(postState);
  useEffect(() => {
    setClicked('전체');
  }, []);
  useEffect(() => {
    console.log(posts);
  }, [posts]);
  const handleCategory = (e) => {
    setClicked(e.target.id);
    {
      e.target.id == '전체'
        ? viewPostApi(1)
            .then((res) => {
              console.log(res.data.posts);
              setPosts(res.data.posts);
            })
            .catch((error) => {
              console.log(error);
            })
        : categoryClickApi(e.target.id, 1)
            .then((res) => {
              console.log(res.data.posts);
              setPosts(res.data.posts);
            })
            .catch((err) => console.log(err));
    }
  };
  return (
    <div>
      <div style={{ display: 'flex', marginTop: '20px' }}>
        {category.map((e) => {
          console.log(e, 'zz');
          return (
            <div>
              <Category
                id={e}
                onClick={handleCategory}
                style={e === clicked ? { color: 'black' } : { color: 'gray' }}
              >
                {e == 'Project' ? '프로젝트' : e == 'Study' ? '스터디' : '전체'}
              </Category>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default CategoryBtn;

const Category = styled.div`
  @font-face {
    font-family: 'Cafe24Dangdanghae';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.2/Cafe24Dangdanghae.woff')
      format('woff');
    font-weight: normal;
    font-style: normal;
  }
  font-family: 'Cafe24Dangdanghae';
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
  font-size: 30px;
  font-weight: 700;
  width: 120px;
  height: 50px;
`;
