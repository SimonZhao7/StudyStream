import React from 'react';
import { SearchForm, IconContainer, SearchInput } from './SearchBar.styles';
 

const SearchBar = () => {
    return (
        <SearchForm>
            <IconContainer className="fa-solid fa-magnifying-glass">
                <SearchInput placeholder='Search Study Sets'/>
            </IconContainer>
        </SearchForm>
    )
}

export default SearchBar