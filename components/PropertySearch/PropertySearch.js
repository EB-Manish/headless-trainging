// "use client"
// import { useEffect , useState} from "react";
// import { Results } from "./Results/Results";
// import { Pagination } from "./Results/Pagination/Pagination";
// import { useRouter } from "next/router";
// import queryString from "query-string";
// import { Filters } from "./Filters/Filters";

// export const PropertySearch= () =>{
//     const [properties, setProperties] = useState([]);
//     const [totalResults, setTotalResults] = useState(0);
//     const pageSize =3;
//     const router =useRouter();
//     const search = async () => {
//         const {page, minPrice,maxPrice,hasParking,petFriendly} = queryString.parse(window.location.search);
//         const filters = {};
//         if(minPrice){
//             filters.minPrice = parseInt(minPrice);
//         }
//         if(maxPrice){
//             filters.minPrice = parseInt(maxPrice);
//         }
//         if(hasParking==="true"){
//             filters.hasParking = true;
//         }
//         if(petFriendly==="true"){
//             filters.petFriendly = true;
//         }
//         const response = await fetch(`/api/search`,{
//             method:"POST",
//             body: JSON.stringify({
//                 page: parseInt(page || "1"),
//                 ...filters,
//             }),
//         });
//         const data = await response.json();
//         console.log("Search Data:", data);
//         setProperties(data.properties);
//         setTotalResults(data.total);
//     };
//     const handlePageClick = async (pageNumber) =>{
//         const {
//             petFriendly,
//             hasParking,
//             minPrice,
//             maxPrice,
//         } = queryString.parse(window.location.search);
//         await router.push(
//             `${router.query.slug.join("/")}?page=${pageNumber}&petFriendly=${petFriendly==="true"}&hasParking=${hasParking==="true"}&minPrice=${minPrice}&maxPrice=${maxPrice}`
//         ,null,{
//             shallow: true,
//         });
//         search();
//     }
//     useEffect(() => {
        
//         search();
//     },[]);
//     const handleSearch =async ({
//         petFriendly, 
//         hasParking, 
//         minPrice,
//         maxPrice}) =>{
//         console.log("Filters: ",petFriendly, hasParking, minPrice,maxPrice);
//         await router.push(
//             `${router.query.slug.join("/")}?page=1&petFriendly=${!!petFriendly}&hasParking=${!!hasParking}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
//             null,{
//             shallow: true,
//         });
//         search();
//     }
//     return(
//         <div>
//             <Filters onSearch={handleSearch} />
//             <Results properties={properties}/>
//             <Pagination onPageClick={handlePageClick}totalPages ={Math.ceil(totalResults / pageSize)}/>
//         </div>
//     );
// }
import React, { useState, useEffect } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { Results } from './Results/Results';
import { Pagination } from './Results/Pagination/Pagination';
import { Filters } from './Filters/Filters';
import { useRouter } from 'next/router';
import queryString from 'query-string';

export const PropertySearch = () => {
  const [properties, setProperties] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Initialize isLoading as false
  const pageSize = 3;
  const router = useRouter();

  const search = async () => {
    setIsLoading(true); // Set isLoading to true when starting a new data fetch

    const { page, minPrice, maxPrice, hasParking, petFriendly } = queryString.parse(
      window.location.search
    );
    const filters = {};
    if (minPrice) {
      filters.minPrice = parseInt(minPrice);
    }
    if (maxPrice) {
      filters.minPrice = parseInt(maxPrice);
    }
    if (hasParking === 'true') {
      filters.hasParking = true;
    }
    if (petFriendly === 'true') {
      filters.petFriendly = true;
    }
    const response = await fetch(`/api/search`, {
      method: 'POST',
      body: JSON.stringify({
        page: parseInt(page || '1'),
        ...filters,
      }),
    });
    const data = await response.json();
    console.log('Search Data:', data);

    // Set isLoading to false when data fetching is complete.
    setIsLoading(false);

    setProperties(data.properties);
    setTotalResults(data.total);
  };

  const handlePageClick = async (pageNumber) => {
    const { petFriendly, hasParking, minPrice, maxPrice } = queryString.parse(
      window.location.search
    );
    setIsLoading(true); // Set isLoading to true before page change
    await router.push(
      `${router.query.slug.join('/')}?page=${pageNumber}&petFriendly=${petFriendly === 'true'}&hasParking=${
        hasParking === 'true'
      }&minPrice=${minPrice}&maxPrice=${maxPrice}`,
      null,
      {
        shallow: true,
      }
    );
    search();
  };

  const handleSearch = async ({ petFriendly, hasParking, minPrice, maxPrice }) => {
    console.log('Filters: ', petFriendly, hasParking, minPrice, maxPrice);
    setIsLoading(true); // Set isLoading to true before new search
    await router.push(
      `${router.query.slug.join('/')}?page=1&petFriendly=${!!petFriendly}&hasParking=${!!hasParking}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
      null,
      {
        shallow: true,
      }
    );
    search();
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="text-center my-10">
          <TailSpin color="#00BFFF" height={50} width={50} />
        </div>
      ) : (
        <>
          <Filters onSearch={handleSearch} />
          <Results properties={properties} />
          <Pagination
            onPageClick={handlePageClick}
            totalPages={Math.ceil(totalResults / pageSize)}
          />
        </>
      )}
    </div>
  );
};
