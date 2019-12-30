import React, { Fragment, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Button, Item, Label } from "semantic-ui-react";
import _ from "lodash";
import { formatNumber } from "accounting";

// Custom Components.
import { useFetchPlaces } from "../../utils/hooks/useFetchPlaces";
import {
  findPropertyValues,
  arrayContainsAnyElementOfArray,
  filterByString
} from "../../utils/filters/filters";
import { cities } from "../../utils/data/cities";
import { lowerUnder } from "../../utils/format/format";
import Paginator from "../../common/components/Paginator";

// Styled Components.
import { Wrapper } from "./styles";

const defaultFilters = {
  type: "all",
  indoor: [],
  price_attraction: [],
  price_food: [],
  food_types: [],
  star_ratings: []
};

const cityOptions = [
  cities.map(city => ({
    key: lowerUnder(city),
    value: lowerUnder(city),
    text: city
  }))
];

const endpoint = "http://saltproject.lndo.site/api/places";
let placeTypes = [];
let indoorTypes = [];
let attractionPrices = [];
let foodPrices = [];
let foodTypes = [];
let starRatings = [];

const Places = props => {
  const [places, setPlaces] = useState([]);
  const [params, setParams] = useState({ city: "all" });
  const [filters, setFilters] = useState(defaultFilters);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [paginationSettings, setPaginationSettings] = useState({
    activePage: 1,
    perPage: 12
  });

  const { data, loading, error } = useFetchPlaces(endpoint, params);
  let filteredData = data;
  let paginatedData = data;
  let filterSet = null;

  if (data.length) {
    // Get "types".
    placeTypes = findPropertyValues(data, "type");

    // Get indoor "types".
    indoorTypes = findPropertyValues(data, "indoor");

    // Get attraction price values.
    attractionPrices = findPropertyValues(data, "price");

    // Get food price values.
    foodPrices = findPropertyValues(data, "price_food");

    // Get cuisine type values.
    foodTypes = findPropertyValues(data, "cuisine");

    // Get cuisine type values.
    starRatings = findPropertyValues(data, "star_rating");
  }

  const handleParamChange = (e, { name, value }) => {
    setParams({ ...params, [name]: value });
  };

  const handleFilterChange = (e, { name, value }) => {
    if (name === "type") {
      setFilters({
        type: value,
        indoor: [],
        price_attraction: [],
        price_food: [],
        food_types: [],
        star_ratings: []
      });
    } else {
      setFilters({ ...filters, [name]: value });
    }
  };

  const handleSearchChange = e => {
    setSearchPhrase(e.target.value);
  };

  const handlePageChange = (e, pagerInfo) => {
    setPaginationSettings({
      ...paginationSettings,
      activePage: pagerInfo.activePage
    });
  };

  useEffect(() => {
    setPlaces(paginatedData);
  }, [filteredData, paginationSettings, data, filters, searchPhrase]);

  if (loading)
    return (
      <Wrapper>
        <FontAwesomeIcon icon="sync-alt" spin />
        <p>Loading...</p>
      </Wrapper>
    );
  if (error) return <div>{error}</div>;

  if (filters.type === "attraction") {
    filterSet = (
      <Fragment>
        <Form.Select
          label="Indoor/Outdoor"
          placeholder="Indoor/Outdoor"
          onChange={handleFilterChange}
          name="indoor"
          options={indoorTypes}
          value={filters.indoor}
          multiple={true}
        />
        <Form.Select
          label="Price"
          placeholder="Price"
          onChange={handleFilterChange}
          name="price_attraction"
          options={attractionPrices}
          value={filters.price_attraction}
          multiple={true}
        />
      </Fragment>
    );
  }

  if (filters.type === "food") {
    filterSet = (
      <Fragment>
        <Form.Select
          label="Price"
          placeholder="Price"
          onChange={handleFilterChange}
          name="price_food"
          options={foodPrices}
          value={filters.price_food}
          multiple={true}
        />
        <Form.Select
          label="Cuisine"
          placeholder="Cuisine"
          onChange={handleFilterChange}
          name="food_types"
          options={foodTypes}
          value={filters.food_types}
          multiple={true}
        />
      </Fragment>
    );
  }

  if (filters.type === "lodging") {
    filterSet = (
      <Fragment>
        <Form.Select
          label="Star Rating"
          placeholder="Star Rating"
          onChange={handleFilterChange}
          name="star_ratings"
          options={starRatings}
          value={filters.star_ratings}
          multiple={true}
        />
      </Fragment>
    );
  }

  let form = (
    <Form
      onSubmit={() => {
        setParams(...params, { city: "all" });
        setFilters(defaultFilters);
      }}
    >
      <Form.Select
        label="Type"
        placeholder="Type"
        onChange={handleFilterChange}
        name="type"
        options={placeTypes}
        value={filters.type}
      />
      {filterSet}
      <Form.Select
        label="City"
        placeholder="City"
        onChange={handleParamChange}
        name="city"
        options={cityOptions}
        value={params.city}
      />
      <Form.Field
        label="Search"
        control="input"
        type="text"
        placeholder="Search"
        onChange={handleSearchChange}
        name="search"
        value={searchPhrase}
      />
      <Button type="submit" content="Reset" />
    </Form>
  );

  // Default display.
  let content = <div>No Results</div>;

  // Custom field output.
  const indoorText = indoor => {
    if (indoor === "indoor") {
      return "indoor";
    }

    if (indoor === "outdoor") {
      return "outoor";
    }

    if (indoor === "both") {
      return "indoor & outdoor";
    }
  };

  // Data filter funnel starts here: ----------
  if (data.length) {
    if (filters.type !== "all") {
      filteredData = _.filter(data, place => {
        return filters.type === place.type.toLowerCase();
      });
    }

    if (filters.indoor.length) {
      filteredData = _.filter(filteredData, place => {
        return arrayContainsAnyElementOfArray(filters.indoor, place.indoor);
      });
    }

    if (filters.price_attraction.length) {
      filteredData = _.filter(filteredData, place => {
        return arrayContainsAnyElementOfArray(
          filters.price_attraction,
          place.price_attraction
        );
      });
    }

    if (filters.price_food.length) {
      filteredData = _.filter(filteredData, place => {
        return arrayContainsAnyElementOfArray(
          filters.price_food,
          place.price_food
        );
      });
    }

    if (filters.food_types.length) {
      filteredData = _.filter(filteredData, place => {
        return arrayContainsAnyElementOfArray(
          filters.food_types,
          place.cuisine
        );
      });
    }

    // Apply search filter.
    if (searchPhrase !== "") {
      filteredData = filterByString(filteredData, searchPhrase, ["title"]);
    }

    // Slice the data for pager.
    const indexOfLastPlace =
      paginationSettings.activePage * paginationSettings.perPage;
    const indexOfFirstPlace = indexOfLastPlace - paginationSettings.perPage;

    paginatedData = filteredData.slice(indexOfFirstPlace, indexOfLastPlace);
  }
  // End data filter funnel. ----------

  if (places && places.length) {
    const listItems = places.map((place, index) => (
      <Item key={index}>
        <Item.Image src={place.image} />

        <Item.Content>
          <Item.Header as="a" href={place.path}>
            {place.title}
          </Item.Header>
          <Item.Meta>
            <span>
              {place.type} in {place.city}
            </span>
          </Item.Meta>
          <Item.Description>{indoorText(place.indoor)}</Item.Description>
          <Item.Extra>
            <Label>IMAX</Label>
            <Label icon="globe" content="Additional Languages" />
          </Item.Extra>
        </Item.Content>
      </Item>
    ));

    // Update content display if data exists.
    content = (
      <Fragment>
        <Item.Group divided>{listItems}</Item.Group>
        <Paginator
          activePage={paginationSettings.activePage}
          onPageChange={handlePageChange}
          totalPages={filteredData.length / paginationSettings.perPage}
        />
      </Fragment>
    );
  }

  let counter = (
    <div>
      {`
      Results: ${formatNumber(filteredData.length, { precision: 0 })}
    `}
    </div>
  );

  return (
    <Wrapper>
      <FontAwesomeIcon icon="bell" />
      {form}
      {counter}
      {content}
    </Wrapper>
  );
};

export default Places;
