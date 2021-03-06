/* eslint-disable react/jsx-key */
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { getissueList } from '../../api/issueTransaction';
import { FilterContext } from './index';

const FilterBar = styled.div`
  //border: 1px solid rgb(225 228 232);
  height: 40px;
  display: flex;
  border-radius: 2px;
`;
const FilterSelector = styled.select`
  border: 1px solid rgb(225 228 232);
  width: 100px;
  background-color: #f4f4f4;
`;

const InputForm = styled.input`
  padding: 5px 12px;
  margin: 2px;
  font-size: 14px;
  line-height: 20px;
  width: 450px;
  vertical-align: middle;
  background-repeat: no-repeat;
  background-position: right 8px center;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  outline: none;
  box-shadow: inset 0 1px 0 rgba(225, 228, 232, 0.2);
`;

export const FilterBarComponent = (props) => {
  const { filterText, setFilterText, filterDispatch, setStatus, status, dispatch } = useContext(FilterContext);
  const [zero, setZero] = useState(0);

  const onChangeFilterEventHandler = (e) => {
    switch (Number(e.target.value)) {
      case 1:
        setStatus(0);
        filterDispatch({ type: 'deleteAll' });
        break;
      case 2:
        setStatus(0);
        filterDispatch({ type: 'oneFilter', data: 1, filter: 'author' });
        break;
      case 3:
        setStatus(0);
        filterDispatch({ type: 'oneFilter', data: 1, filter: 'asignee' });
        break;
      case 4:
      case 5:
        setStatus(1);
        filterDispatch({ type: 'deleteAll' });
        break;
    }
    setZero(0);
  };

  const enterEventHandler = async (e) => {
    if (e.key !== 'Enter') return;
    const str = e.target.value;
    let query = '';
    query += !status ? 'status=0' : 'status=1';
    ['author', 'labels', 'milestone', 'asignee'].forEach((filter) => {
      let start = str.indexOf(filter, 7);
      let middle = str.indexOf(':', start);
      let end = str.indexOf(' ', middle);
      end = start !== -1 && end === -1 ? str.length : end;
      query +=
        start === -1 ? '' : '&' + filter + '=' + str.slice(middle + 1, end);
    });
    query = '?' + query + '&version=1';
    const res = await getissueList(query);
    dispatch({ type: 'pushIssues', data: res });
    filterDispatch({ type: 'deleteAll' });
  };

  return (
    <FilterBar>
      <FilterSelector
        value={zero}
        onChange={(e) => onChangeFilterEventHandler(e)}
      >
        <option value={0}>Filters</option>
        <option value={1}>open issue</option>
        <option value={2}>your issue</option>
        <option value={3}>Everything assgined to you</option>
        <option value={4}>Everything mentioning you</option>
        <option value={5}>closed issues</option>
      </FilterSelector>
      <InputForm
        placeholder={'Search all issues'}
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        onKeyPress={async (e) => await enterEventHandler(e)}
      />
    </FilterBar>
  );
};
