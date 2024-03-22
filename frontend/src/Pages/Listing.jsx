import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


import { useSelector } from 'react-redux';



// import Contact from '../components/Contact';

// https://sabe.io/blog/javascript-format-numbers-commas#:~:text=The%20best%20way%20to%20format,format%20the%20number%20with%20commas.

export default function Listing() {
  // SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);
  console.log(listing)

  return (

    <div className="container ">
      {loading && <p className='text-center'>Loading...</p>}
       {error && (
        <p className='text-center '>Something went wrong!</p>
      )}
      {listing && !loading && !error && (

          <main>
              <div className="row px-2 my-3 bg-light rounded">
              <div className="col p-2 bg-light d-flex justify-content-between">
                    <div className="">
                          <p className=" h4"><i className="fa-solid fa-landmark"></i> {listing.name}</p>
                          <p className='h4'><i className="fa-solid fa-location-dot"></i> {listing.address}</p>
                    </div>
                    <div>
                    <p className='h5'>
    {listing.offer ? (
      <>
        {listing.type === 'rent' ? (
          <>
            <i className="fa-solid fa-indian-rupee-sign"> {listing.discountPrice.toLocaleString('en-IN')} per month</i>
            <p className='text-danger'> for Rent</p>
          </>
        ) : (
          <>
            <i className="fa-solid fa-indian-rupee-sign"> {listing.discountPricePrice.toLocaleString('en-IN')} </i>
            <p className='text-danger'> for Sale</p>
          </>
        )}
      </>
    ) : (
      <>
        {listing.type === 'rent' ? (
          <>
            <i className="fa-solid fa-indian-rupee-sign"> {listing.regularPrice.toLocaleString('en-IN')} per month</i>
            <p className='text-danger'> for Rent</p>
          </>
        ) : (
          <>
            <i className="fa-solid fa-indian-rupee-sign"> {listing.regularPrice.toLocaleString('en-IN')} </i>
            <p className='text-danger'> for Sale</p>
          </>
        )}
      </>
    )}
  </p>
  <button className="btn btn-success btn-lg">Contact Seller</button>
</div>

              </div>
              </div>
              <div className="row ">
                <div className="col-md-8 ">
                <MDBCarousel showControls className=''>
                        {listing.imageUrls.map((url, index) => (
                            <MDBCarouselItem key={index} itemId={index + 1}>
                                <img src={url} style={{height:'350px', width: '100%', objectFit: 'contain' }} alt='Property images' />
                            </MDBCarouselItem>
                        ))}
              </MDBCarousel>

                </div>
                <div className="col-md-4">
                    <div className='card shadow p-2' >
                      <p className='text-center'>Property Overview</p>
                      <div className='d-flex justify-content-center gap-3'> 
                                    <div className='rounded ' style={{background:'#F4F4F4'}}>
                                      <p><i className="fa-solid fa-location-dot text-success"></i> {listing.name}</p>
                                      <p><i className="fa-solid fa-map-location-dot text-success"></i> {listing.address}</p>
                                      {listing.offer === true ? (
  <>
    {listing.type === 'rent' ? (
      <>
        <p><i className="fa-solid fa-wallet text-success"></i> Discount available</p>
        <p><i className="fa-solid fa-money-bill text-success"></i> Regular price: {listing.regularPrice} per month</p>
        <p><i className="fa-solid fa-money-bill text-success"></i> Price after discount: {listing.discountPrice} per month</p>
      </>
    ) : (
      <>
        <p><i className="fa-solid fa-wallet text-success"></i> Discount unavailable</p>
        <p><i className="fa-solid fa-money-bill text-success"></i> Regular Price: {listing.regularPrice}</p>
      </>
    )}
  </>
) : (
  <>
    {listing.type === 'rent' ? (
      <>
        <p><i className="fa-solid fa-wallet text-success"></i> Discount unavailable</p>
        <p><i className="fa-solid fa-money-bill text-success"></i> Regular Price: {listing.regularPrice} per month</p>
      </>
    ) : (
      <>
        <p><i className="fa-solid fa-wallet text-success"></i> Discount unavailable</p>
        <p><i className="fa-solid fa-money-bill text-success"></i> Regular Price: {listing.regularPrice}</p>
      </>
    )}
  </>
)}
                                    </div>
                  <div className='rounded' style={{background:'#F4F4F4'}}>
                        {listing.property === 'rland' ? (
                          <>
                            <p><i className="fa-solid fa-chart-area text-success"></i> PlotArea: {listing.plotArea}sqft</p>
                            <p><i class="fa-solid fa-ruler-vertical text-success"></i> Length: {listing.length}ft</p>
                            <p > <i class="fa-solid fa-ruler-horizontal text-success"></i> Width: {listing.width}ft</p>
                            <p><i class="fa-solid fa-road text-success"></i> Road Width: {listing.roadWidth}ft </p>
                          </>
                        ) : (
                          <>
                            <p> <i className="fa-solid fa-bed text-success"></i> {listing.bedrooms} bed </p>
                            <p> <i className="fa-solid fa-bath text-success"></i> {listing.bathrooms} bath</p>
                            {listing.furnished === true ? (
                                <p><i className="fa-solid fa-chair text-success"></i> Furnished</p>
                              ) :  <p><i className="fa-solid fa-chair text-success"></i> Not Furnished</p>}

                              {listing.parking === true ? (
                                <p><i className="fa-solid fa-square-parking text-success"></i> Parking available</p>
                              ) :  <p><i className="fa-solid fa-square-parking text-success"></i> Parking Unvailable</p>}

                          </>
                        )} 
                    </div>

                  </div> 
                     
                    
                      
                    

                </div>
                </div>
                <div className="col">
                  <div className="p-2 my-3 card ">
                    <h5 className='border-bottom'>Description</h5>
                    <p>{listing.description}</p>
                  </div>
                  
                </div>
              </div>








          </main>




      )}

    </div>
    // <main>
    //   
    //       <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
    //         <FaShare
    //           className='text-slate-500'
    //           onClick={() => {
    //             navigator.clipboard.writeText(window.location.href);
    //             setCopied(true);
    //             setTimeout(() => {
    //               setCopied(false);
    //             }, 2000);
    //           }}
    //         />
    //       </div>
    //       {copied && (
    //         <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
    //           Link copied!
    //         </p>
    //       )}
    //       <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
    //        
    //         
    //         <div className='flex gap-4'>
    //           <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
    //             {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
    //           </p>
    //           {listing.offer && (
    //             <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
    //               ${+listing.regularPrice - +listing.discountPrice} OFF
    //             </p>
    //           )}
    //         </div>
    //         
    //         <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
    //           <li className='flex items-center gap-1 whitespace-nowrap '>
    //             <FaBed className='text-lg' />
    //             {listing.bedrooms > 1
    //               ? `${listing.bedrooms} beds `
    //               : `${listing.bedrooms} bed `}
    //           </li>
    //           <li className='flex items-center gap-1 whitespace-nowrap '>
    //             <FaBath className='text-lg' />
    //             {listing.bathrooms > 1
    //               ? `${listing.bathrooms} baths `
    //               : `${listing.bathrooms} bath `}
    //           </li>
    //           <li className='flex items-center gap-1 whitespace-nowrap '>
    //             <FaParking className='text-lg' />
    //             {listing.parking ? 'Parking spot' : 'No Parking'}
    //           </li>
    //           <li className='flex items-center gap-1 whitespace-nowrap '>
    //             <FaChair className='text-lg' />
    //             {listing.furnished ? 'Furnished' : 'Unfurnished'}
    //           </li>
    //         </ul>
    //         {currentUser && listing.userRef !== currentUser._id && !contact && (
    //           <button
    //             onClick={() => setContact(true)}
    //             className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'
    //           >
    //             Contact landlord
    //           </button>
    //         )}
    //         {contact && <Contact listing={listing} />}
    //       </div>
    //     </div>
    //   )}
    // </main>
  );
}
