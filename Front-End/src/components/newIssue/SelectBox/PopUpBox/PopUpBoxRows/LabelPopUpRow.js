import React from 'react';
import styled from 'styled-components';
import { CheckSvg } from 'Style';

const LabelRow = styled.div`
  padding: 5px 0;
  padding-left: 5px;
  border-bottom: 1px solid #dddddd;
  display: flex;
  &:hover {
    background-color: #e7e7e7;
  }
`;
const LabelRowContent = styled.div``;
const LabelRowHead = styled.div`
  height: 20px;
  display: flex;
  justify-content: left;
  vertical-align: center;
`;
const LabelName = styled.div`
  padding-left: 10px;
  overflow: hidden;
`;
const LabelColor = styled.div`
  width: 15px;
  height: 15px;
  background-color: ${(props) => props.labelColor};
  border-radius: 3px;
`;
const LabelDescription = styled.div`
  font-size: 11px;
`;
const LabelCheckbox = styled.div`
  width: 20px;
  height: 20px;
  position: relative;
  padding-top: 10px;
  padding-left: 10px;
`;
const LabelPopUpRow = ({ row, Event }) => {
  const changeFilterTextEventHandler = (e) => {
    e.preventDefault();
    Event({ id: row.id, title: row.title });
  };
  return (
    <LabelRow
      onClick={Event ? (e) => changeFilterTextEventHandler(e) : undefined}
    >
      <LabelCheckbox>
        <CheckSvg checked={row.checked}></CheckSvg>
      </LabelCheckbox>
      <LabelRowContent>
        <LabelRowHead>
          <LabelColor labelColor={row.color} />
          <LabelName>{row.title}</LabelName>
        </LabelRowHead>
        <LabelDescription>{row.contents}</LabelDescription>
      </LabelRowContent>
    </LabelRow>
  );
};

export default LabelPopUpRow;
