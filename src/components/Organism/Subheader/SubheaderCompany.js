import React from "react";
import SearchBar from "../../Molecul/SearchBar";
import { Colors, Radius } from "../../../themes";
import { Heading4 } from "../../Atom/Typography";
import SearchBarCompany from "../../Molecul/SearchBar/SearchBarCompany";

export default function SubheaderCompany(props) {
  const { title, company } = props;

  return (
    <>
      <style jsx>
        {`
          .container {
            background: ${Colors.primary.mid_blue};
            height: 96px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}
      </style>

      <div className="container">
        <Heading4
          style={{
            marginRight: 40,
            fontSize: "18px",
            fontWeight: 500,
            color: "white",
          }}
        >
          {title}
        </Heading4>
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
            }}
          />
          <SearchBarCompany
            size="medium"
            options={[
              { label: "Project Manager", id: 1 },
              { label: "UI/UX Designer", id: 2 },
            ]}
            options2={[
              { label: "Jakarta Selatan", id: 1 },
              { label: "Jakarta Barat", id: 2 },
            ]}
            customStyle={{
              backgroundColor: Colors.secondary.clear_blue,
              width: 164,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              margin: 0,
            }}
            company={company}
          />
        </div>
      </div>
    </>
  );
}
