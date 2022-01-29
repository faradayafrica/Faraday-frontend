import { useEffect, useState } from 'react';
import { apiUrl } from '../../config.json';
import { getCurrentUser } from '../../services/authService';
import http from '../../services/httpService';

// class Bookmarks extends Component {
//   render() {
//     return (
//       <div
//         className='col row justify-content-center '
//         style={{ height: '100vh', width: '100%' }}
//       >
//         <h1 className='my-auto'>Bookmarks</h1>
//       </div>
//     );
//   }
// }

const Bookmarks = () => {
  const currentUser = getCurrentUser();
  const userEndpoint = apiUrl + `/user/${currentUser.username}/ques`;
  const [question, setQuestion] = useState([]);

  useEffect(() => {
    async function getBookmarked() {
      const result = await http.get(userEndpoint);
      setQuestion(result.data);
      console.log(question);
    }

    getBookmarked();
  });
};

export default Bookmarks;
