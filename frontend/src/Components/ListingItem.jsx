import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

export default function ListingItem({ listing }) {
  return (
    

    <div className="col-md-4 mb-2">
        <Card className='h-100'>
        <Link to={`/listing/${listing._id}`} >
      <Card.Img variant="top"  src={
            listing.imageUrls[0] ||
            'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
          }
          alt='listing cover' />
      <Card.Body>
        <Card.Title className='text-success'>{listing.name}</Card.Title>
        <Card.Text className='text-success'>
        <i class="fa-solid fa-location-dot"></i>{listing.address}
        </Card.Text>
       <Card.Text className='text-success'>
       <i class="fa-solid fa-indian-rupee-sign"></i> { listing.regularPrice.toLocaleString('en-IN')}
            {listing.type === 'rent' && ' / month'}
       </Card.Text>
       
      </Card.Body> 
      </Link>
    </Card>

    </div>
      
   
     
    
  
  );
}
