import client from "client";
import { gql } from "@apollo/client";
const handler = async(req, res)=>{
    try{
      const filters =JSON.parse(req.body);
      let hasParkingFilter =``;
      let petFriendlyFilter =``;
      let minPriceFilter =``;
      let maxPriceFilter =``;
      if(filters.hasParking){
        hasParkingFilter=`
        {
          key:"has_parking"
          compare: EQUAL_TO
          value:"1"
        },
        `;
      }
      if(filters.petFriendly){
        petFriendlyFilter=`
        {
          key:"pet_friendly"
          compare: EQUAL_TO
          value:"1"
        },
        `;
      }
      if(filters.minPrice){
        minPriceFilter =`
        {
          key:"price"
          compare: GREATER_THAN_OR_EQUAL_TO
          value:"${filters.minPrice}"
          type: NUMERIC
        },
        `;
      }
      if(filters.maxPrice){
        maxPriceFilter =`
        {
          key:"price"
          compare: LESS_THAN_OR_EQUAL_TO
          value:"${filters.minPrice}"
          type: NUMERIC
        },
        `;
      }


        const {data} = await client.query({
            query: gql`
            query AllPropertiesQuery {
                properties(where: { offsetPagination: { offset: ${((filters.page || 1) -1) *3} , size: 3}
                metaQuery:{
                  relation: AND
                  metaArray:[
                   ${petFriendlyFilter}
                   ${hasParkingFilter}
                   ${minPriceFilter}
                   ${maxPriceFilter}
                  ]
                  }
                }) {
                  pageInfo {
                    offsetPagination {
                      total
                    }
                  }
                  nodes {
                    title
                    id
                    uri
                    featuredImage {
                      node {
                        uri
                        sourceUrl
                      }
                    }
                    propertyFeatures {
                      bathroom
                      bedrooms
                      hasParking
                      petFriendly
                      price
                    }
                  }
                }
              }
            `
        });
        return res.status(200).json({
            total: data.properties.pageInfo.offsetPagination.total,
            properties: data.properties.nodes,
        })
    } catch (e){
        console.log("ERROR:",e);
    }
};
export default handler;