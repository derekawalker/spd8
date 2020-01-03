import React, { Fragment, useState, useEffect } from "react";
import {
  Form,
  Button,
  Item,
  Loader,
  Segment,
  Accordion,
  Icon,
  Divider,
  Header,
  Placeholder,
  Label
} from "semantic-ui-react";
import _ from "lodash";
import { formatNumber } from "accounting";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCloudSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
import { Wrapper, DescriptionWrapper, ExtrasWrapper } from "./styles";

library.add(faCloudSun);

const defaultFilters = {
  type: "all",
  indoor: [],
  price_attraction: [],
  price_food: [],
  food_types: [],
  star_ratings: []
};

let cityOptions = _.map(cities, city => {
  return {
    key: lowerUnder(city),
    value: lowerUnder(city),
    text: city
  };
});

cityOptions.unshift({ key: "all", value: "all", text: "All of Utah" });

// const endpoint = "http://saltproject.lndo.site/api/places";
const endpoint = "/api/places";

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
  const [accordion, setAccordion] = useState({
    activeIndex: -1
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
    setParams({
      ...params,
      [name]: value
    });
  };

  const handleAccordion = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = accordion.activeIndex === index ? -1 : index;

    setAccordion({ activeIndex: newIndex });
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
    // Retrieve the city object from storage.
    const retrievedObject = JSON.parse(
      localStorage.getItem("saltProjectPrefs")
    );

    if (retrievedObject && retrievedObject.city) {
      // If city storage, update it.
      if (retrievedObject.city !== params.city) {
        setParams({
          ...params,
          city: retrievedObject.city
        });
      }
    }
  }, []);

  useEffect(() => {
    setPlaces(paginatedData);
  }, [filteredData, paginationSettings, data, filters, searchPhrase]);

  useEffect(() => {
    // Update storage.
    localStorage.setItem("saltProjectPrefs", JSON.stringify(params));
  }, [params]);

  if (loading)
    return (
      <Wrapper>
        <Segment>
          <Loader active inline="centered">
            Loading...
          </Loader>
        </Segment>
        <Placeholder fluid>
          <Placeholder.Header image>
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Header>
          <Placeholder.Header image>
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Header>
          <Placeholder.Header image>
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Header>
        </Placeholder>
      </Wrapper>
    );
  if (error) return <div>{error}</div>;

  if (filters.type === "attraction") {
    filterSet = (
      <Segment secondary>
        <Form.Group widths="equal">
          <Form.Select
            label="Indoor/Outdoor"
            placeholder="Indoor/Outdoor"
            onChange={handleFilterChange}
            name="indoor"
            options={indoorTypes}
            value={filters.indoor}
            multiple
          />
          <Form.Select
            label="Price"
            placeholder="Price"
            onChange={handleFilterChange}
            name="price_attraction"
            options={attractionPrices}
            value={filters.price_attraction}
            multiple
          />
        </Form.Group>
      </Segment>
    );
  }

  if (filters.type === "food") {
    filterSet = (
      <Segment secondary>
        <Form.Group widths="equal">
          <Form.Select
            label="Price"
            placeholder="Price"
            onChange={handleFilterChange}
            name="price_food"
            options={foodPrices}
            value={filters.price_food}
            multiple
          />
          <Form.Select
            search
            label="Cuisine"
            placeholder="Cuisine"
            onChange={handleFilterChange}
            name="food_types"
            options={foodTypes}
            value={filters.food_types}
            multiple
          />
        </Form.Group>
      </Segment>
    );
  }

  if (filters.type === "lodging") {
    filterSet = (
      <Segment secondary>
        <Form.Group widths="equal">
          <Form.Select
            label="Star Rating"
            placeholder="Star Rating"
            onChange={handleFilterChange}
            name="star_ratings"
            options={starRatings}
            value={filters.star_ratings}
            multiple
          />
        </Form.Group>
      </Segment>
    );
  }

  let form = (
    <Accordion fluid styled>
      <Accordion.Title
        active={accordion.activeIndex === 0}
        index={0}
        onClick={handleAccordion}
      >
        <Icon name="dropdown" />
        Filter Results
      </Accordion.Title>
      <Accordion.Content active={accordion.activeIndex === 0}>
        <Form
          onSubmit={() => {
            setParams(...params, { city: "all" });
            setFilters(defaultFilters);
          }}
        >
          <Form.Group widths="equal">
            <Form.Select
              label="Type"
              placeholder="Type"
              onChange={handleFilterChange}
              name="type"
              options={placeTypes}
              value={filters.type}
            />
            <Form.Select
              search
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
          </Form.Group>
          {filterSet}
          <Button type="submit" animated="vertical" fluid>
            <Button.Content hidden>Reset</Button.Content>
            <Button.Content visible>
              <Icon name="sync" />
            </Button.Content>
          </Button>
        </Form>
      </Accordion.Content>
    </Accordion>
  );

  // Default display.
  let content = <div>No Results</div>;

  // Custom field output.
  const indoorText = indoor => {
    if (indoor === "indoor") {
      return (
        <Label basic color="grey">
          <Icon name="cloud" />
          Indoor
        </Label>
      );
    }

    if (indoor === "outdoor") {
      return (
        <Label basic color="grey">
          <Icon name="sun" />
          Outdoor
        </Label>
      );
    }

    if (indoor === "both") {
      return (
        <Label basic color="grey">
          <Icon>
            <FontAwesomeIcon icon={["fas", "cloud-sun"]} />
          </Icon>
          Indoor & Outdoor
        </Label>
      );
    }
  };

  // Custom field output.
  const cuisineText = array => {
    let cuisines;
    if (array.length > 0) {
      cuisines = _.map(array, (cuisine, index) => (
        <Label key={index} basic color="orange">
          <DescriptionWrapper>{cuisine}</DescriptionWrapper>
        </Label>
      ));
    }

    return <div>{cuisines}</div>;
  };

  // Custom field output.
  const priceIcons = price => {
    if (Number(price) > 0) {
      const dollars = [];

      for (let i = 0; i < Number(price); i++) {
        dollars[i] = <Icon fitted name="dollar" color="green" />;
      }

      return <div>{dollars}</div>;
    }
  };

  // Custom field output.
  const starIcons = rating => {
    if (Number(rating) > 0) {
      const stars = [];

      for (let i = 0; i < Number(rating); i++) {
        stars[i] = <Icon fitted name="star" color="yellow" />;
      }

      return <div>{stars}</div>;
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
          place.price
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
            <DescriptionWrapper>
              {place.type} in {place.city}
            </DescriptionWrapper>
          </Item.Meta>

          <ExtrasWrapper>
            {place.price ? <div>{priceIcons(place.price)}</div> : null}

            {place.price_food ? (
              <div>{priceIcons(place.price_food)}</div>
            ) : null}

            {place.indoor ? (
              <DescriptionWrapper>
                {indoorText(place.indoor)}
              </DescriptionWrapper>
            ) : null}

            {place.cuisine.length ? (
              <div>{cuisineText(place.cuisine)}</div>
            ) : null}

            {place.star_rating ? (
              <div>{starIcons(place.star_rating)}</div>
            ) : null}
          </ExtrasWrapper>
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
    <Divider horizontal>
      <Header color="teal" as="h4">{`
      Results: ${formatNumber(filteredData.length, { precision: 0 })}
    `}</Header>
    </Divider>
  );

  return (
    <Wrapper>
      {form}
      {counter}
      {content}
    </Wrapper>
  );
};

export default Places;
