import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../Components/ListingItem';


function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    property:'all',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  });

    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
//   const [showMore, setShowMore] = useState(false);
    console.log(listings)

    useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const propertyFromUrl = urlParams.get('property')
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      propertyFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        property: propertyFromUrl || 'allproperty',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      // setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        // setShowMore(true);
      } else {
        // setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

 
 

  const handleChange = (e) => {
      if(
         e.target.id ==="house" ||
         e.target.id ==="apartment" ||
         e.target.id ==="rland" ||
         e.target.id ==="allproperty" 
        ){
          setSidebardata({ ...sidebardata, property: e.target.id });
        }


        if (
          e.target.id === 'all' ||
          e.target.id === 'rent' ||
          e.target.id === 'sell'
        ) {
          setSidebardata({ ...sidebardata, type: e.target.id });
        }
    
        if (e.target.id === 'searchTerm') {
          setSidebardata({ ...sidebardata, searchTerm: e.target.value });
        }
    
        if (
          e.target.id === 'parking' ||
          e.target.id === 'furnished' ||
          e.target.id === 'offer'
        ) {
          setSidebardata({
            ...sidebardata,
            [e.target.id]:
              e.target.checked || e.target.checked === 'true' ? true : false,
          });
        }
    
        if (e.target.id === 'sort_order') {
          const sort = e.target.value.split('_')[0] || 'created_at';
    
          const order = e.target.value.split('_')[1] || 'desc';
    
          setSidebardata({ ...sidebardata, sort, order });
        }
      };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('type', sidebardata.type);
    urlParams.set('property',sidebardata.property)
    urlParams.set('parking', sidebardata.parking);
    urlParams.set('furnished', sidebardata.furnished);
    urlParams.set('offer', sidebardata.offer);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  



  return (


    <>
      <div className="container-fluid">
        <div className="row">
            <div className="col-md-4 ">
            <form onSubmit={handleSubmit} className='d-flex flex-column px-2 py-3'>
                  <div className='d-flex pb-2 align-items-center '>
                    <label className='fw-bold'>
                      Search Term:
                    </label>
                    <input
                        type='text'
                        id='searchTerm'
                        placeholder='Search...'
                        className='form-control w-75'
                        value={sidebardata.searchTerm}
                        onChange={handleChange}
                      />
                    </div>
                    <div className='d-flex pb-2 gap-1 flex-wrap align-items-center'>
                        <label className='fw-bold'>
                            Property:
                        </label>
                        <div className='d-flex gap-2'>
                          <input type="checkbox" 
                          id="house"
                            onChange={handleChange}
                            checked={sidebardata.property==="house"}
                          />
                          <span>House</span>
                        </div>
                        <div className='d-flex gap-1'>
                          <input type="checkbox" 
                            onChange={handleChange}
                            id="apartment"
                            checked={sidebardata.property==="apartment"}
                          />
                          <span>Apartment</span>
                        </div>
                          <div className='d-flex gap-1'>
                          <input type="checkbox" 
                            onChange={handleChange}
                            checked={sidebardata.property==="rland"}
                            id="rland"
                          />
                          <span>Residential Land</span>
                        </div>
                        <div className='d-flex gap-1'>
                          <input type="checkbox" 
                            onChange={handleChange}
                            id="allproperty"
                            checked={sidebardata.property==="allproperty"}
                          />
                          <span>All</span>
                        </div>
                        
                    </div>


                    <div className='d-flex gap-2 pb-2 align-items-center flex-wrap items-center'>
                      <label className='fw-bold'>Type:</label>
                      <div className='d-flex gap-2 flex-wrap'>
                        <input
                          type='checkbox'
                          id='all'
                          onChange={handleChange}
                          checked={sidebardata.type === 'all'}
                        />
                        <span>Rent & Sale</span>
                      </div>
                      <div className='d-flex gap-2 '>
                        <input
                          type='checkbox'
                          id='rent'
                          
                          onChange={handleChange}
                          checked={sidebardata.type === 'rent'}
                        />
                        <span>Rent</span>
                      </div>
                      <div className='d-flex gap-2'>
                        <input
                          type='checkbox'
                          id='sell'
                          
                          onChange={handleChange}
                          checked={sidebardata.type === 'sell'}
                        />
                        <span>Sale</span>
                      </div>
                      <div className='d-flex gap-2'>
                        <input
                          type='checkbox'
                          id='offer'
                          className='w-5'
                          onChange={handleChange}
                          checked={sidebardata.offer}
                        />
                        <span>Offer</span>
                      </div>
                    </div>
                    <div className='d-flex gap-2 pb-2 flex-wrap align-items-center'>
                      <label className='fw-bold'>Amenities:</label>
                      <div className='d-flex gap-2'>
                        <input
                          type='checkbox'
                          id='parking'
                    
                          onChange={handleChange}
                          checked={sidebardata.parking}
                        />
                        <span>Parking</span>
                      </div>
                      <div className='d-flex gap-2'>
                        <input
                          type='checkbox'
                          id='furnished'
                      
                          onChange={handleChange}
                          checked={sidebardata.furnished}
                        />
                        <span>Furnished</span>
                      </div>
                    </div>
                    <div className='d-flex align-items-center gap-2 pb-2'>
                      <label className='fw-bold'>Sort:</label>
                      <select
                        onChange={handleChange}
                        defaultValue={'created_at_desc'}
                        id='sort_order'
                        className='form-control'
                      >
                        <option value='regularPrice_desc'>Price high to low</option>
                        <option value='regularPrice_asc'>Price low to hight</option>
                        <option value='createdAt_desc'>Latest</option>
                        <option value='createdAt_asc'>Oldest</option>
                      </select>
                    </div>
                    <button className='btn btn-success'>
                      Search
                    </button>
                  </form>
            </div>
            <div className="col-md-8  border-start border-4">
               <div>
                <h1 className="display-5">Listings</h1>
                      <div>
                        {!loading && listings.length === 0 && (
                          <p className='fw-bold pt-5 ps-2'>No listing found</p>
                        )}
                        {loading && (
                            <p className='text-center display-5'>Loading...</p>
                        )}
                    
                        <div className="row px-2">
                          
                            
                                {
                                !loading && listings && listings.map((listing) => (
                                  <ListingItem key={listing._id} listing={listing}/>
                                ))
                                }
                          </div>                          
                          
                       

                      
                        


                      </div>
                </div>
            </div>

        </div>
      </div>
    </>
  )
}

export default Search



  







//   const onShowMoreClick = async () => {
//     const numberOfListings = listings.length;
//     const startIndex = numberOfListings;
//     const urlParams = new URLSearchParams(location.search);
//     urlParams.set('startIndex', startIndex);
//     const searchQuery = urlParams.toString();
//     const res = await fetch(`/api/listing/get?${searchQuery}`);
//     const data = await res.json();
//     if (data.length < 9) {
//       setShowMore(false);
//     }
//     setListings([...listings, ...data]);
//   };
//   return (
//     <div className='flex flex-col md:flex-row'>
//       <div className='p-7  border-b-2 md:border-r-2 md:min-h-screen'>
//        
//       </div>
//       <div className='flex-1'>
//         <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
//           Listing results:
//         </h1>
//         <div className='p-7 flex flex-wrap gap-4'>
//           {!loading && listings.length === 0 && (
//             <p className='text-xl text-slate-700'>No listing found!</p>
//           )}
//           {loading && (
//             <p className='text-xl text-slate-700 text-center w-full'>
//               Loading...
//             </p>
//           )}

//           {!loading &&
//             listings &&
//             listings.map((listing) => (
//               <ListingItem key={listing._id} listing={listing} />
//             ))}

//           {showMore && (
//             <button
//               onClick={onShowMoreClick}
//               className='text-green-700 hover:underline p-7 text-center w-full'
//             >
//               Show more
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
