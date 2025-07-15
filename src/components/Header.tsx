import UserIcon from '../assets/images/userIcon.png';

export const Header = () => (
  <div
    style={{
      padding: '1.5rem',
      background: '#62b6cb',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      cursor: 'pointer',
    }}
  >
    <img
      src={UserIcon}
      alt="User Icon"
      style={{ height: '50px', marginRight: '12px' }}
    />
  </div>
);
