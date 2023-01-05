/* eslint-disable  */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React components
import { useState, useEffect } from "react";
import axios from "axios";
import { sortBy } from "lodash";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
// import team3 from "assets/images/team-3.jpg";
// import team4 from "assets/images/team-4.jpg";

export default function FetchProductData() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("aveeno");
  const [isLoading, setDataLoading] = useState(false);

  useEffect(() => {
    setDataLoading(true);
    const brandData = async () => {
      const result = await axios.get(
        `https://sls-ausse-dev-igloo-ipricematchdevapi.azurewebsites.net/api/pricematch/products/${query}?code=QTahLrKfjuROx68MKJlQ3CrtvAf9x4oQq62iSEzAfO54AzFuXOaEGw==`
      );
      console.log("dataafter fetch");
      setData(result.data.data);
      setDataLoading(false);
    };

    brandData();
  }, [query]);

  // const Author = ({
  //   image = "/static/media/team-2.13ae2ce3e12f4cfed420.jpg",
  //   name,
  //   email = "xyz@gmail.com",
  // }) => (
  //   <MDBox display="flex" alignItems="center" lineHeight={1}>
  //     <MDAvatar src={image} name={name} size="sm" />
  //     <MDBox ml={2} lineHeight={1}>
  //       <MDTypography display="block" variant="button" fontWeight="medium">
  //         {name}
  //       </MDTypography>
  //       <MDTypography variant="caption">{email}</MDTypography>
  //     </MDBox>
  //   </MDBox>
  // );

  // const Job = ({ title, description }) => (
  //   <MDBox lineHeight={1} textAlign="left">
  //     <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
  //       {title}
  //     </MDTypography>
  //     <MDTypography variant="caption">{description}</MDTypography>
  //   </MDBox>
  // );

  const Description = ({ description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  const Brand = ({ productbrand }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography variant="caption">{productbrand}</MDTypography>
    </MDBox>
  );

  const Tags = ({ producttags }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography variant="caption">{producttags}</MDTypography>
    </MDBox>
  );

  const Productname = ({ image = "/static/media/team-2.13ae2ce3e12f4cfed420.jpg", name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const Id = ({ value }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {value}
      </MDTypography>
    </MDBox>
  );

  const Quantity = ({ value }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {value}
      </MDTypography>
    </MDBox>
  );

  const SKU = ({ value }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {value}
      </MDTypography>
    </MDBox>
  );

  const Price = ({ value }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {value}
      </MDTypography>
    </MDBox>
  );

  const Action = () => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        <Icon>delete</Icon>
      </MDTypography>
    </MDBox>
  );

  const ProductData = _.sortBy(data, ["name"]).map((eachelement) => ({
    name: <Productname image={team2} name={eachelement.name} email={eachelement.email} />,
    id: <Id value={eachelement.id} />,
    description: <Description description={eachelement.description} />,
    quantity: <Quantity value={eachelement.quantity} />,
    tags: <Tags producttags={eachelement.tags} />,
    price: <Price value={eachelement.price} />,
    brand: <Brand productbrand={eachelement.brand} />,
    sku: <SKU value={eachelement.sku} />,

    status: (
      <MDBox ml={-1}>
        <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
      </MDBox>
    ),
    employed: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        23/04/18
      </MDTypography>
    ),
    action: (
      <MDTypography
        component="a"
        href="#"
        variant="caption"
        color="text"
        fontWeight="medium"
      ></MDTypography>
    ),
  }));

  console.log("product data");

  return {
    columns: [
      { Header: "name", accessor: "name", align: "left" },
      { Header: "id", accessor: "id", width: "45%", align: "left" },
      { Header: "description", accessor: "description", align: "center" },
      { Header: "quantity", accessor: "quantity", align: "center" },
      { Header: "tags", accessor: "tags", align: "center" },
      { Header: "price", accessor: "price", align: "center" },
      { Header: "brand", accessor: "brand", align: "center" },
      { Header: "sku", accessor: "sku", align: "center" },
    ],
    rows: ProductData,
    isLoading,
    setQuery,
    query,
  };
}