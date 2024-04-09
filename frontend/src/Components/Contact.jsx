import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);
  return (
    <>
      
      {landlord && (
        <div className='d-flex flex-column gap-2'>
          <p>
            Contact <span className='fw-bold'>{landlord.username}</span>{' '}
            for{' '}
            <span className='fw-bold'>{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name='message'
            id='message'
            rows='4'
            value={message}
            onChange={onChange}
            placeholder='Enter your message here...'
            className='form-control  p-3 '
          ></textarea>

          <Link
          className='border-success text-success text-center rounded'
          to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
          
          >
            Send Message          
          </Link>
        </div>
      )}
       

    </>
  );
}
