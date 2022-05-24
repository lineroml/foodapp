import React from 'react';
import Layout from './layout';

const Search = () => {
  const { searchQuery } = useParams();
  const [profiles, setProfiles] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const fetchSearch = async () => {
    const response = await fetch(`https://foodappdiseno.herokuapp.com/search?q=${searchQuery}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json());
    setProfiles(response.data.users);
    setRecipes(response.data.recipes);
  };

  useEffect(() => {
    fetchSearch();
  }, []);

  return (
    <Layout>
      <div className='w-full h-full bg-hero-pattern overflow-x-hidden bg-cover bg-no-repeat'></div>
    </Layout>
  );
};
