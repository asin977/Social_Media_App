import UserIcon from '../assets/images/usersIcon.png';
import AddNewUser from '../assets/images/add-user.png';

export const Header: React.FC = () => {

  const UserScrollButton = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div
      style={{
        padding: '1rem',
        background: '#023e8a',
        cursor: 'pointer',
      }}
    >
      <button style={{ display: 'flex', marginLeft: '25px',background:'transparent',border:'none'}}onClick={UserScrollButton}>
        <img style={{ width: '40px' }} src={AddNewUser} alt="addnewUser" />
      </button>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '-49px',
          gap:'18px'
        }}
      >
        <h2
          style={{
            color: '#f8f9fa',
            fontSize: '25px',
            margin: '0px',
            fontFamily: 'bold',
          }}
        >
          SOCIAL
        </h2>
        <img
          src={UserIcon}
          alt="User Icon"
          style={{ height: '50px', marginRight: '12px' }}
        />
        <button
          style={{
            border: 'none',
            padding: '8px 20px',
            background: '#0077b6',
            color: 'white',
            fontFamily: 'bold',
            borderRadius: '5px',
            fontSize: '18px',
            cursor: 'pointer',
          }}
        >
          Posts ➡️
        </button>
      </div>
    </div>
  );
};
